import { useEffect, useState } from 'react';
import {
  vercelService,
  envVarsToText,
  type VercelProject,
  type VercelTarget,
} from '../../services/vercelService';

interface VercelImportModalProps {
  onClose: () => void;
  onImport: (data: { name: string; envVariables: string }) => void;
}

const TARGETS: { value: VercelTarget; label: string }[] = [
  { value: 'production', label: 'Production' },
  { value: 'preview', label: 'Preview' },
  { value: 'development', label: 'Development' },
];

export const VercelImportModal = ({ onClose, onImport }: VercelImportModalProps) => {
  const [projects, setProjects] = useState<VercelProject[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [importingId, setImportingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [target, setTarget] = useState<VercelTarget>('production');

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoadingProjects(true);
        setError('');
        const list = await vercelService.listProjects();
        setProjects(list);
      } catch (err: any) {
        setError(err?.message || 'Impossible de récupérer les projets Vercel');
      } finally {
        setLoadingProjects(false);
      }
    };
    loadProjects();
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleImport = async (project: VercelProject) => {
    try {
      setImportingId(project.id);
      setError('');
      const vars = await vercelService.getEnv(project.id, target);

      if (vars.length === 0) {
        setError(
          `Aucune variable trouvée pour "${project.name}" sur l'environnement ${target}.`
        );
        return;
      }

      onImport({
        name: project.name,
        envVariables: envVarsToText(vars),
      });
    } catch (err: any) {
      setError(err?.message || 'Erreur lors de la récupération des variables');
    } finally {
      setImportingId(null);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl dark:shadow-gray-900/50 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-black dark:text-white" viewBox="0 0 76 65" fill="currentColor">
              <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
            </svg>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Importer depuis Vercel
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Sélecteur d'environnement */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Environnement à récupérer
          </label>
          <div className="flex gap-2">
            {TARGETS.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setTarget(t.value)}
                className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                  target === t.value
                    ? 'bg-black dark:bg-gray-900 text-white border-transparent'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Contenu */}
        <div className="flex-1 overflow-y-auto p-6">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-4">
              <p className="text-sm text-red-600 dark:text-red-400 break-words">{error}</p>
            </div>
          )}

          {loadingProjects ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-14 rounded-lg bg-gray-100 dark:bg-gray-700 animate-pulse"
                />
              ))}
            </div>
          ) : projects.length === 0 && !error ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              Aucun projet Vercel trouvé.
            </p>
          ) : (
            <ul className="space-y-2">
              {projects.map((project) => (
                <li
                  key={project.id}
                  className="flex items-center justify-between px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                      {project.name}
                    </p>
                    {project.framework && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {project.framework}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleImport(project)}
                    disabled={importingId !== null}
                    className="ml-4 flex-shrink-0 px-4 py-2 text-sm font-medium text-white bg-black dark:bg-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {importingId === project.id ? 'Import...' : 'Importer'}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

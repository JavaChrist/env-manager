import { useState } from 'react';
import type { Project } from '../../types/Project';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
}

export const ProjectCard = ({ project, onEdit, onDelete }: ProjectCardProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Erreur lors de la copie:', error);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  // Générer une couleur basée sur le nom du projet
  const getProjectColor = (name: string) => {
    const colors = [
      {
        gradient: 'from-blue-500 to-cyan-400',
        bg: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
        text: 'text-blue-700 dark:text-blue-300',
        icon: 'text-blue-600 dark:text-blue-400',
        iconBg: 'bg-blue-100 dark:bg-blue-800/50',
        button: 'hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-800/50 dark:hover:text-blue-300',
      },
      {
        gradient: 'from-purple-500 to-pink-400',
        bg: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
        text: 'text-purple-700 dark:text-purple-300',
        icon: 'text-purple-600 dark:text-purple-400',
        iconBg: 'bg-purple-100 dark:bg-purple-800/50',
        button: 'hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-800/50 dark:hover:text-purple-300',
      },
      {
        gradient: 'from-green-500 to-emerald-400',
        bg: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
        text: 'text-green-700 dark:text-green-300',
        icon: 'text-green-600 dark:text-green-400',
        iconBg: 'bg-green-100 dark:bg-green-800/50',
        button: 'hover:bg-green-50 hover:text-green-700 dark:hover:bg-green-800/50 dark:hover:text-green-300',
      },
      {
        gradient: 'from-orange-500 to-yellow-400',
        bg: 'from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20',
        text: 'text-orange-700 dark:text-orange-300',
        icon: 'text-orange-600 dark:text-orange-400',
        iconBg: 'bg-orange-100 dark:bg-orange-800/50',
        button: 'hover:bg-orange-50 hover:text-orange-700 dark:hover:bg-orange-800/50 dark:hover:text-orange-300',
      },
      {
        gradient: 'from-red-500 to-rose-400',
        bg: 'from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20',
        text: 'text-red-700 dark:text-red-300',
        icon: 'text-red-600 dark:text-red-400',
        iconBg: 'bg-red-100 dark:bg-red-800/50',
        button: 'hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-800/50 dark:hover:text-red-300',
      },
      {
        gradient: 'from-indigo-500 to-purple-400',
        bg: 'from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20',
        text: 'text-indigo-700 dark:text-indigo-300',
        icon: 'text-indigo-600 dark:text-indigo-400',
        iconBg: 'bg-indigo-100 dark:bg-indigo-800/50',
        button: 'hover:bg-indigo-50 hover:text-indigo-700 dark:hover:bg-indigo-800/50 dark:hover:text-indigo-300',
      },
      {
        gradient: 'from-teal-500 to-blue-400',
        bg: 'from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20',
        text: 'text-teal-700 dark:text-teal-300',
        icon: 'text-teal-600 dark:text-teal-400',
        iconBg: 'bg-teal-100 dark:bg-teal-800/50',
        button: 'hover:bg-teal-50 hover:text-teal-700 dark:hover:bg-teal-800/50 dark:hover:text-teal-300',
      },
      {
        gradient: 'from-pink-500 to-red-400',
        bg: 'from-pink-50 to-red-50 dark:from-pink-900/20 dark:to-red-900/20',
        text: 'text-pink-700 dark:text-pink-300',
        icon: 'text-pink-600 dark:text-pink-400',
        iconBg: 'bg-pink-100 dark:bg-pink-800/50',
        button: 'hover:bg-pink-50 hover:text-pink-700 dark:hover:bg-pink-800/50 dark:hover:text-pink-300',
      },
    ];

    const hash = name.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);

    return colors[Math.abs(hash) % colors.length];
  };

  const projectColors = getProjectColor(project.name);

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl dark:hover:shadow-gray-900/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden transform perspective-1000">
      {/* Header coloré avec gradient */}
      <div className={`h-3 bg-gradient-to-r ${projectColors.gradient}`}></div>

      {/* Background coloré subtil */}
      <div className={`absolute inset-0 bg-gradient-to-br ${projectColors.bg} opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>

      {/* Header de la carte */}
      <div className="relative p-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center mb-3">
              <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${projectColors.gradient} mr-3 group-hover:animate-pulse shadow-lg`}></div>
              <h3 className={`text-lg font-bold ${projectColors.text} group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors`}>
                {project.name}
              </h3>
            </div>

            {project.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                {project.description}
              </p>
            )}

            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <div className={`w-5 h-5 ${projectColors.iconBg} rounded-lg flex items-center justify-center mr-2`}>
                <svg className={`w-3 h-3 ${projectColors.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              Modifié le {formatDate(project.updatedAt)}
            </div>
          </div>

          <div className="flex items-center space-x-2 ml-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <button
              onClick={() => onEdit(project)}
              className={`p-2.5 text-gray-400 dark:text-gray-500 ${projectColors.button} rounded-xl transition-all duration-200 transform hover:scale-110 shadow-md hover:shadow-lg dark:shadow-gray-800`}
              title="Modifier"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(project.id)}
              className="p-2.5 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-xl transition-all duration-200 transform hover:scale-110 shadow-md hover:shadow-lg dark:shadow-gray-800"
              title="Supprimer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Variables d'environnement */}
      {project.envVariables && (
        <div className="relative p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
              <div className={`w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mr-3 shadow-lg`}>
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              Variables d'environnement
            </h4>
            <button
              onClick={() => copyToClipboard(project.envVariables || '')}
              className={`flex items-center text-xs transition-all duration-200 px-3 py-2 rounded-lg font-medium ${copied
                ? 'text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/50 shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/50 shadow-md hover:shadow-lg'
                }`}
              title="Copier les variables"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copié !
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copier
                </>
              )}
            </button>
          </div>
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 rounded-xl p-4 overflow-hidden shadow-xl border border-gray-700 dark:border-gray-600">
            <pre className="text-sm text-green-400 dark:text-green-300 whitespace-pre-wrap break-all line-clamp-4 font-mono leading-relaxed">
              {project.envVariables}
            </pre>
          </div>
        </div>
      )}

      {/* README */}
      {project.readme && (
        <div className="relative p-6 border-b border-gray-100 dark:border-gray-700">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center">
            <div className={`w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center mr-3 shadow-lg`}>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            Documentation
          </h4>
          <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/30 dark:via-indigo-900/30 dark:to-purple-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700/50 shadow-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap line-clamp-4 leading-relaxed">
              {project.readme}
            </p>
          </div>
        </div>
      )}

      {/* Tags */}
      {project.tags && project.tags.length > 0 && (
        <div className="relative px-6 pb-6">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, index) => {
              const tagColors = [
                'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg',
                'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg',
                'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg',
                'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg',
                'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg',
                'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg',
                'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg',
                'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg',
              ];
              const colorClass = tagColors[index % tagColors.length];

              return (
                <span
                  key={index}
                  className={`inline-flex items-center px-3 py-2 rounded-full text-xs font-bold transition-all duration-200 hover:scale-110 transform ${colorClass} dark:shadow-gray-800`}
                >
                  {tag}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Effet de brillance au survol */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${projectColors.gradient} transition-opacity duration-500 pointer-events-none`}></div>

      {/* Effet de border glow */}
      <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 bg-gradient-to-r ${projectColors.gradient} blur-xl transition-opacity duration-500 pointer-events-none -z-10`}></div>
    </div>
  );
}; 
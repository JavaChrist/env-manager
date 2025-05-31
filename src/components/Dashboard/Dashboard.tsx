import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { projectService } from '../../services/projectService';
import type { Project } from '../../types/Project';
import { ProjectCard } from './ProjectCard';
import { ProjectCardSkeleton } from './ProjectCardSkeleton';
import { ProjectForm } from './ProjectForm';
import { ConfirmModal } from '../Common/ConfirmModal';

export const Dashboard = () => {
  const { currentUser } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [error, setError] = useState('');

  // État pour la modale de confirmation
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  useEffect(() => {
    if (currentUser) {
      loadProjects();
    }
  }, [currentUser]);

  const loadProjects = async () => {
    if (!currentUser) return;

    try {
      setLoading(true);
      const userProjects = await projectService.getUserProjects(currentUser.uid);
      setProjects(userProjects);
    } catch (error) {
      setError('Erreur lors du chargement des projets');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setProjectToDelete(project);
      setShowDeleteModal(true);
    }
  };

  const confirmDeleteProject = async () => {
    if (!projectToDelete) return;

    try {
      await projectService.deleteProject(projectToDelete.id);
      await loadProjects(); // Recharger la liste
      setShowDeleteModal(false);
      setProjectToDelete(null);
    } catch (error) {
      setError('Erreur lors de la suppression du projet');
      console.error(error);
    }
  };

  const cancelDeleteProject = () => {
    setShowDeleteModal(false);
    setProjectToDelete(null);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  const handleProjectSaved = () => {
    handleCloseForm();
    loadProjects(); // Recharger la liste
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header avec actions */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Mes Projets</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Gérez vos variables d'environnement en toute sécurité
              </p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black dark:bg-gray-900 hover:bg-gray-800 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-gray-500 dark:focus:ring-offset-gray-800 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nouveau Projet
            </button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-md p-4 mb-6">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {loading ? (
          // État de chargement avec skeletons
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProjectCardSkeleton key={index} />
            ))}
          </div>
        ) : projects.length === 0 ? (
          // État vide
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              Aucun projet encore
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Créez votre premier projet pour commencer à gérer vos variables d'environnement de manière sécurisée et organisée.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:focus:ring-offset-gray-900 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl dark:shadow-gray-800"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Créer mon premier projet
            </button>
          </div>
        ) : (
          // Liste des projets
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={handleEditProject}
                onDelete={handleDeleteProject}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal du formulaire */}
      {showForm && (
        <ProjectForm
          project={editingProject}
          onClose={handleCloseForm}
          onSaved={handleProjectSaved}
        />
      )}

      {/* Modale de confirmation de suppression */}
      <ConfirmModal
        isOpen={showDeleteModal}
        title="Supprimer le projet"
        message={
          projectToDelete
            ? `Êtes-vous sûr de vouloir supprimer le projet "${projectToDelete.name}" ? Cette action est irréversible.`
            : 'Êtes-vous sûr de vouloir supprimer ce projet ?'
        }
        confirmText="Supprimer"
        cancelText="Annuler"
        type="danger"
        onConfirm={confirmDeleteProject}
        onCancel={cancelDeleteProject}
      />
    </div>
  );
}; 
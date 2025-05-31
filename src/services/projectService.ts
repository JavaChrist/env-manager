import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import type { Project, CreateProjectData, UpdateProjectData } from '../types/Project';

const PROJECTS_COLLECTION = 'projects';

// Fonction utilitaire pour supprimer les champs undefined
const removeUndefinedFields = (obj: any): any => {
  const cleaned: any = {};
  Object.keys(obj).forEach(key => {
    if (obj[key] !== undefined) {
      cleaned[key] = obj[key];
    }
  });
  return cleaned;
};

export const projectService = {
  // Créer un nouveau projet
  async createProject(userId: string, projectData: CreateProjectData): Promise<string> {
    try {
      console.log('Création du projet pour userId:', userId);
      console.log('Données du projet:', projectData);

      // Nettoyer les données pour supprimer les champs undefined
      const cleanedData = removeUndefinedFields({
        ...projectData,
        userId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      console.log('Données nettoyées:', cleanedData);

      const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), cleanedData);

      console.log('Projet créé avec succès, ID:', docRef.id);
      return docRef.id;
    } catch (error: any) {
      console.error('Erreur détaillée lors de la création du projet:');
      console.error('Code:', error.code);
      console.error('Message:', error.message);
      console.error('Stack:', error.stack);

      // Messages d'erreur plus spécifiques
      if (error.code === 'permission-denied') {
        throw new Error('Accès refusé : Vérifiez les règles de sécurité Firestore');
      } else if (error.code === 'unauthenticated') {
        throw new Error('Utilisateur non authentifié');
      } else if (error.code === 'unavailable') {
        throw new Error('Service Firestore temporairement indisponible');
      } else {
        throw new Error(`Erreur Firestore: ${error.message}`);
      }
    }
  },

  // Récupérer tous les projets d'un utilisateur
  async getUserProjects(userId: string): Promise<Project[]> {
    try {
      console.log('Récupération des projets pour userId:', userId);

      // Requête simplifiée temporairement (sans orderBy)
      const q = query(
        collection(db, PROJECTS_COLLECTION),
        where('userId', '==', userId)
        // orderBy('updatedAt', 'desc') // Commenté temporairement
      );

      const querySnapshot = await getDocs(q);
      const projects: Project[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        projects.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as Project);
      });

      // Trier côté client temporairement
      projects.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

      console.log('Projets récupérés:', projects.length);
      return projects;
    } catch (error: any) {
      console.error('Erreur détaillée lors de la récupération des projets:');
      console.error('Code:', error.code);
      console.error('Message:', error.message);

      if (error.code === 'permission-denied') {
        throw new Error('Accès refusé : Vérifiez les règles de sécurité Firestore');
      } else {
        throw new Error(`Erreur lors de la récupération: ${error.message}`);
      }
    }
  },

  // Mettre à jour un projet
  async updateProject(projectId: string, updates: UpdateProjectData): Promise<void> {
    try {
      console.log('Mise à jour du projet:', projectId, updates);

      // Nettoyer les données pour supprimer les champs undefined
      const cleanedUpdates = removeUndefinedFields({
        ...updates,
        updatedAt: serverTimestamp(),
      });

      console.log('Données de mise à jour nettoyées:', cleanedUpdates);

      const projectRef = doc(db, PROJECTS_COLLECTION, projectId);
      await updateDoc(projectRef, cleanedUpdates);

      console.log('Projet mis à jour avec succès');
    } catch (error: any) {
      console.error('Erreur détaillée lors de la mise à jour du projet:');
      console.error('Code:', error.code);
      console.error('Message:', error.message);

      if (error.code === 'permission-denied') {
        throw new Error('Accès refusé : Vous ne pouvez pas modifier ce projet');
      } else {
        throw new Error(`Erreur lors de la mise à jour: ${error.message}`);
      }
    }
  },

  // Supprimer un projet
  async deleteProject(projectId: string): Promise<void> {
    try {
      console.log('Suppression du projet:', projectId);

      await deleteDoc(doc(db, PROJECTS_COLLECTION, projectId));

      console.log('Projet supprimé avec succès');
    } catch (error: any) {
      console.error('Erreur détaillée lors de la suppression du projet:');
      console.error('Code:', error.code);
      console.error('Message:', error.message);

      if (error.code === 'permission-denied') {
        throw new Error('Accès refusé : Vous ne pouvez pas supprimer ce projet');
      } else {
        throw new Error(`Erreur lors de la suppression: ${error.message}`);
      }
    }
  },
}; 
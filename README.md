# 🚀 Environment Manager

> **Gestionnaire de variables d'environnement moderne et sécurisé**

Environment Manager est une application web React moderne qui vous permet de gérer vos variables d'environnement de manière sécurisée et organisée. Avec une interface élégante et un système de thème sombre/clair, c'est l'outil parfait pour les développeurs.

## ✨ Fonctionnalités

### 🔐 **Authentification sécurisée**

- Connexion/inscription avec Firebase Authentication
- Interface moderne inspirée de Vercel
- Gestion des sessions utilisateur
- Protection des données personnelles

### 📊 **Gestion des projets**

- **Création** de projets avec nom, description et tags
- **Édition** complète de tous les champs
- **Suppression** sécurisée avec confirmation
- **Organisation** par utilisateur

### 🌈 **Interface colorée et moderne**

- **8 palettes de couleurs** différentes pour les cartes
- **Gradients dynamiques** basés sur le nom du projet
- **Animations fluides** et effets de survol
- **Design responsive** pour tous les écrans

### 🔒 **Variables d'environnement**

- **Stockage sécurisé** dans Firebase Firestore
- **Copie rapide** d'un clic
- **Format .env** standard
- **Aperçu** avec coloration syntaxique

### 📚 **Documentation intégrée**

- **README** par projet avec support Markdown
- **Instructions** d'installation et d'utilisation
- **Notes importantes** et documentation

### 🏷️ **Système de tags**

- **Catégorisation** des projets
- **Tags colorés** et interactifs
- **Organisation** visuelle

### 🌙 **Thème sombre/clair**

- **Basculement instantané** entre les modes
- **Persistance** des préférences utilisateur
- **Détection automatique** des préférences système
- **Interface complète** adaptée aux deux thèmes

### 🎨 **Modales et interactions**

- **Modales de confirmation** modernes
- **Formulaires interactifs** avec validation
- **États de chargement** avec skeletons
- **Feedback visuel** pour toutes les actions

## 🛠️ Technologies utilisées

### Frontend

- **React 18** avec TypeScript
- **Tailwind CSS v3.4** pour le design
- **Vite** pour le build rapide
- **React Context** pour la gestion d'état

### Backend & Base de données

- **Firebase Authentication** pour l'authentification
- **Firebase Firestore** pour la base de données
- **Règles de sécurité** Firestore configurées

### Outils de développement

- **TypeScript** pour la sécurité des types
- **PostCSS** & **Autoprefixer**
- **ESLint** pour la qualité du code

## 🚀 Installation

### Prérequis

- Node.js 18+
- npm ou yarn
- Compte Firebase

### 1. Clonage du projet

```bash
git clone <url-du-projet>
cd env-manager
```

### 2. Installation des dépendances

```bash
npm install
```

### 3. Configuration Firebase

1. Créez un projet sur [Firebase Console](https://console.firebase.google.com)
2. Activez **Authentication** (Email/Password)
3. Créez une base de données **Firestore**
4. Copiez vos clés de configuration

### 4. Variables d'environnement

Créez un fichier `.env.local` :

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your_app_id
```

### 5. Règles Firestore

Configurez les règles dans Firebase Console :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /projects/{projectId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

### 6. Démarrage

```bash
npm run dev
```

L'application sera accessible à `http://localhost:5173`

## 📱 Utilisation

### Premier démarrage

1. **Créez un compte** ou connectez-vous
2. **Créez votre premier projet** avec le bouton "+"
3. **Ajoutez vos variables** d'environnement
4. **Organisez** avec des tags et de la documentation

### Gestion des projets

- **Cartes colorées** : Chaque projet a sa couleur unique
- **Actions rapides** : Modifier/Supprimer au survol
- **Copie rapide** : Cliquez sur "Copier" pour les variables

### Personnalisation

- **Thème** : Basculez avec le bouton ☀️/🌙
- **Organisation** : Utilisez les tags pour catégoriser
- **Documentation** : Ajoutez des README détaillés

## 🎨 Captures d'écran

### Mode clair

![Mode clair - Dashboard avec projets colorés]

### Mode sombre

![Mode sombre - Interface élégante]

### Création de projet

![Formulaire de création avec tous les champs]

## 🔧 Structure du projet

```
src/
├── components/           # Composants React
│   ├── Auth/            # Authentification
│   ├── Common/          # Composants partagés
│   ├── Dashboard/       # Interface principale
│   └── Layout/          # Mise en page
├── contexts/            # Contextes React
│   ├── AuthContext.tsx  # Gestion utilisateur
│   └── ThemeContext.tsx # Gestion du thème
├── services/            # Services externes
│   └── projectService.ts # API Firestore
├── types/               # Types TypeScript
└── assets/              # Images et icônes
```

## 🚀 Build pour la production

```bash
npm run build
```

Les fichiers optimisés seront dans le dossier `dist/`.

## 🤝 Contribution

1. Fork le projet
2. Créez une branche pour votre fonctionnalité
3. Commitez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

Développé avec ❤️ pour simplifier la gestion des variables d'environnement.

---

**🌟 Si ce projet vous plaît, n'hésitez pas à lui donner une étoile !**

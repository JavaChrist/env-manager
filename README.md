# Environment Manager

> Coffre personnel pour centraliser, organiser et réutiliser les variables d'environnement (`.env`) de vos projets, avec import direct depuis Vercel.

Environment Manager est une application web (React + Vite) qui permet à un développeur de stocker ses blocs de variables d'environnement projet par projet dans son espace privé (Firebase), de les copier en un clic, et d'importer automatiquement les variables déjà déployées sur ses projets Vercel.

---

## Objectif et public

- **Objectif** : éviter de chercher ses clés API et secrets éparpillés dans différents fichiers `.env`, en les regroupant dans un espace unique, organisé et accessible depuis le navigateur.
- **Public visé** : développeurs / indie makers qui gèrent plusieurs projets et veulent retrouver rapidement les variables d'environnement d'un projet, y compris celles déjà configurées sur Vercel.

> ⚠️ **Note de sécurité** : les valeurs sont stockées en clair dans Firestore (aucun chiffrement applicatif). L'outil est pensé pour un usage personnel. Voir [Limites connues](#limites-connues).

---

## Fonctionnalités

### ✅ Opérationnelles (vérifiées dans le code)

- **Authentification e-mail / mot de passe** via Firebase Auth : connexion, inscription (avec confirmation du mot de passe), déconnexion, messages d'erreur traduits en français.
- **Gestion de projets** (CRUD complet dans Firestore, isolée par utilisateur) : chaque projet contient un nom, une description, un bloc de variables `.env`, une note de documentation et des tags.
- **Copie en un clic** du bloc de variables d'un projet vers le presse-papier.
- **Import depuis Vercel** : bouton « Importer depuis Vercel » qui liste vos projets Vercel, laisse choisir l'environnement (Production / Preview / Development) et pré-remplit le formulaire avec les variables récupérées. L'appel à l'API Vercel passe par des **fonctions serverless** (`/api/vercel/*`) ; le token Vercel reste côté serveur et n'est jamais exposé au navigateur.
- **Thème clair / sombre** : bascule manuelle, mémorisation du choix (localStorage) et détection de la préférence système.
- **PWA** : installable et utilisable hors ligne (service worker via `vite-plugin-pwa`, mise à jour automatique).
- **Confort d'interface** : cartes colorées (couleur dérivée du nom du projet), modales de création/édition et de confirmation de suppression, écrans de chargement (skeletons).

### 🟡 Partielles / cosmétiques

- **Aperçu des variables** : affiché dans un bloc stylé façon terminal, mais **sans réelle coloration syntaxique**.
- **Documentation de projet (README)** : saisie et affichée en **texte brut** ; il n'y a **pas de rendu Markdown** malgré ce que suggérait l'ancienne documentation.
- **Tags** : purement visuels pour catégoriser un projet. **Aucun filtre ni recherche** par tag n'est implémenté.
- **Variables « Sensitive » de Vercel** : l'API Vercel ne renvoie jamais leur valeur déchiffrée ; elles sont donc importées avec une valeur vide, à compléter manuellement.

### ⛔ Non implémentées (évoquées mais absentes du code)

- **Détection automatique** de nouveaux projets Cursor / VS Code : non présente. L'ajout de projets se fait manuellement (copier-coller du `.env`) ou via l'import Vercel.
- **Chiffrement applicatif** des valeurs stockées : non présent.
- **Recherche / tri configurable** : le tri est fixe (par date de dernière modification, côté client).

---

## Stack technique

| Domaine | Technologie |
|--------|-------------|
| UI | React 19 + TypeScript |
| Build / dev | Vite 6 |
| Styles | Tailwind CSS 3 (mode sombre via classe `dark`) |
| État | React Context (`AuthContext`, `ThemeContext`) |
| Authentification | Firebase Authentication (e-mail / mot de passe) |
| Base de données | Firebase Firestore (collection `projects`) |
| Fonctions serveur | Vercel Functions (`api/vercel/projects.ts`, `api/vercel/env.ts`) appelant l'API REST Vercel |
| PWA | `vite-plugin-pwa` + `workbox-window` |
| Qualité | ESLint, PostCSS, Autoprefixer |

> L'ancienne documentation mentionnait « React 18 » : la version réellement installée est **React 19**.

### Structure du projet

```
env-manager/
├── api/
│   └── vercel/
│       ├── projects.ts     # Liste les projets Vercel (serverless)
│       └── env.ts          # Récupère les variables d'un projet Vercel (serverless)
├── src/
│   ├── components/
│   │   ├── Auth/           # Formulaire de connexion / inscription
│   │   ├── Common/         # Modale de confirmation
│   │   ├── Dashboard/      # Liste, cartes, formulaire, import Vercel
│   │   └── Layout/         # En-tête (thème, déconnexion)
│   ├── contexts/           # AuthContext, ThemeContext
│   ├── services/           # projectService (Firestore), vercelService (API /api)
│   ├── types/              # Types TypeScript (Project)
│   └── firebase.ts         # Initialisation Firebase
├── scripts/deploy-check.js # Vérifie la présence des variables Firebase
├── vercel.json             # Build + routage SPA (hors /api)
└── vite.config.ts          # Config Vite + manifeste PWA
```

---

## Prérequis

- Node.js 18+
- Un projet Firebase (Authentication e-mail/mot de passe + base Firestore)
- Pour l'import Vercel : un compte Vercel et un token d'accès

---

## Installation

```bash
git clone <url-du-depot>
cd env-manager
npm install
```

---

## Configuration

### 1. Variables côté client (Firebase)

Créez un fichier `.env.local` à la racine. **Seuls les noms** sont donnés ici ; renseignez vos propres valeurs (ne jamais committer ce fichier, déjà ignoré par Git) :

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=   # optionnel (Analytics)
```

> Les variables préfixées `VITE_` sont injectées dans le build et donc **visibles côté navigateur** : c'est le fonctionnement normal des clés Firebase client, la sécurité reposant sur les règles Firestore et la configuration Authentication.

### 2. Variables côté serveur (import Vercel)

Nécessaires uniquement pour la fonctionnalité « Importer depuis Vercel ». À définir dans les **variables d'environnement du projet sur Vercel** (ou dans `.env.local` pour un test local avec `vercel dev`). **Ne pas** les préfixer par `VITE_` : ce sont des secrets serveur.

```env
VERCEL_TOKEN=            # token d'accès Vercel (secret) — requis
VERCEL_TEAM_ID=          # identifiant d'équipe — requis si les projets appartiennent à une équipe
```

### 3. Règles de sécurité Firestore

À configurer dans la console Firebase (accès réservé au propriétaire de chaque projet) :

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

---

## Commandes utiles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement Vite (`http://localhost:5173`). ⚠️ Les routes `/api` ne sont **pas** servies par Vite. |
| `npm run build` | Vérification TypeScript puis build de production (`tsc -b && vite build`) dans `dist/`. |
| `npm run preview` | Prévisualise le build de production. |
| `npm run lint` | Analyse ESLint. |
| `npm run deploy-check` | Vérifie que les 6 variables `VITE_FIREBASE_*` sont présentes dans `.env.local`. |
| `vercel dev` | Lance l'app **avec** les fonctions `/api` pour tester l'import Vercel en local (nécessite le CLI Vercel). |

---

## Déploiement

Le projet est pensé pour Vercel : `vercel.json` définit le build Vite, le routage SPA (en excluant `/api`) et des en-têtes de sécurité. Les fonctions du dossier `api/` sont automatiquement déployées comme fonctions serverless.

Pensez à définir, dans les variables d'environnement du projet Vercel, les `VITE_FIREBASE_*` **et** (pour l'import) `VERCEL_TOKEN` / `VERCEL_TEAM_ID`. Guide détaillé : voir [`DEPLOYMENT.md`](./DEPLOYMENT.md).

---

## Limites connues

- Les valeurs de variables sont **stockées en clair** dans Firestore (pas de chiffrement applicatif) → usage personnel recommandé.
- La fonction serverless utilise **un seul `VERCEL_TOKEN`** côté serveur : tous les comptes de l'instance déployée accèdent donc aux projets Vercel associés à ce token. Adapté à un déploiement personnel.
- Le bundle JavaScript de production dépasse 500 kB (avertissement Vite) : pas de découpage de code pour l'instant.
- La mise à jour de la PWA utilise une boîte de dialogue native (`confirm`).

---

## Adresse de l'application

Déploiement Vercel de production : **https://env-manager-nine.vercel.app** (alias vérifié lors du dernier déploiement).

---

## Licence

L'ancienne documentation mentionnait une licence MIT, mais aucun fichier `LICENSE` n'est présent dans le dépôt → **à confirmer**.

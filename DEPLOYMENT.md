# 🚀 Guide de déploiement Vercel

## 📋 Prérequis

- Compte Vercel
- Repository GitHub
- Projet Firebase configuré

## 🔧 Configuration des variables d'environnement

### 1. Sur Vercel

Dans votre projet Vercel, allez dans **Settings > Environment Variables** et ajoutez :

```
VITE_FIREBASE_API_KEY=votre_api_key
VITE_FIREBASE_AUTH_DOMAIN=votre_projet.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=votre_projet_id
VITE_FIREBASE_STORAGE_BUCKET=votre_projet.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=votre_app_id
```

### Import depuis Vercel (fonctionnalité)

Pour activer le bouton **« Importer depuis Vercel »** (récupération automatique des
variables d'environnement de vos projets déjà déployés), ajoutez dans
**Settings > Environment Variables** :

```
VERCEL_TOKEN=votre_token_vercel
VERCEL_TEAM_ID=team_xxx   # optionnel, uniquement si vos projets sont dans une équipe
```

- Le token se crée sur [vercel.com/account/tokens](https://vercel.com/account/tokens).
- ⚠️ **N'utilisez PAS le préfixe `VITE_`** : ce token est **secret** et ne doit
  jamais être exposé au navigateur. Il est utilisé uniquement par les fonctions
  serverless (`/api/vercel/*`), côté serveur.
- Les variables Vercel de type **« Sensitive »** ne sont jamais renvoyées
  déchiffrées par l'API : elles apparaîtront avec une valeur vide, à compléter
  manuellement.

> 💡 En local, `npm run dev` (Vite) ne sert pas les fonctions `/api`. Pour tester
> l'import Vercel en local, utilisez `vercel dev` après `npm i -g vercel`.

### 2. Configuration de build

Vercel détectera automatiquement Vite. Les paramètres par défaut fonctionnent :

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## 🔒 Sécurité Firebase

### 1. Règles Firestore

Dans Firebase Console > Firestore Database > Règles :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Projets : accès uniquement au propriétaire
    match /projects/{projectId} {
      allow read, write: if request.auth != null &&
                         request.auth.uid == resource.data.userId;
      allow create: if request.auth != null &&
                    request.auth.uid == request.resource.data.userId;
    }

    // Empêcher tout autre accès
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### 2. Configuration Authentication

Dans Firebase Console > Authentication > Settings :

- ✅ **Domaines autorisés** : Ajoutez votre domaine Vercel
- ✅ **Restrictions de connexion** : Configurez selon vos besoins
- ❌ **Désactivez** les méthodes non utilisées

### 3. Configuration réseau (optionnel)

Pour plus de sécurité, vous pouvez :

1. **App Check** : Protéger contre l'utilisation abusive
2. **Restrictions IP** : Limiter l'accès depuis certaines IP
3. **CORS** : Configurer les domaines autorisés

## 🌐 Déploiement step-by-step

### 1. Préparer le repository

```bash
# Vérifier que .env.local n'est pas tracké
git status

# Si .env.local apparaît, l'exclure
echo ".env.local" >> .gitignore

# Commit et push
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Connecter à Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. **Import Project** depuis GitHub
3. Sélectionnez votre repository
4. **Configure** : Laissez les paramètres par défaut
5. **Deploy**

### 3. Configurer les variables

Après le premier déploiement :

1. **Project Settings** > **Environment Variables**
2. Ajoutez toutes vos variables `VITE_FIREBASE_*`
3. **Redeploy** le projet

## ⚠️ Points d'attention

### Variables Firebase publiques

Les clés Firebase côté client sont **publiques par design** :

- ✅ `VITE_FIREBASE_API_KEY` : Publique, pas secrète
- ✅ `VITE_FIREBASE_PROJECT_ID` : Publique
- ✅ `VITE_FIREBASE_AUTH_DOMAIN` : Publique

### Vraie sécurité

La sécurité repose sur :

- 🔐 **Règles Firestore** : Contrôlent l'accès aux données
- 🔐 **Règles Authentication** : Contrôlent qui peut se connecter
- 🔐 **Validation côté serveur** : Si vous avez des fonctions

### Alertes GitHub

Si GitHub vous alerte sur une "clé API" :

1. C'est normal pour Firebase (clés publiques)
2. Vous pouvez **Dismiss** l'alerte
3. Ou créer un `.github/SECURITY.md` pour expliquer

## 🚀 Commandes utiles

```bash
# Build local pour tester
npm run build
npm run preview

# Vérifier le bundle
npm run build && du -sh dist/*

# Test de production en local
npx serve dist
```

## 📊 Monitoring

Après déploiement, surveillez :

- **Vercel Analytics** : Performance
- **Firebase Console** : Utilisation et erreurs
- **Browser DevTools** : Erreurs côté client

## 🔄 Mises à jour

Pour mettre à jour :

```bash
git add .
git commit -m "Update: nouvelle fonctionnalité"
git push origin main
# Vercel redéploie automatiquement
```

---

**✅ Une fois déployé, votre app sera accessible sur `https://votre-projet.vercel.app`**

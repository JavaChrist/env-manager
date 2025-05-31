# Politique de sécurité

## 🔒 Variables d'environnement Firebase

Ce projet utilise Firebase avec des clés d'API côté client. **Ces clés sont publiques par design** et ne représentent pas un risque de sécurité.

### ✅ Clés publiques (non secrètes)

Les variables suivantes sont **intentionnellement publiques** :

- `VITE_FIREBASE_API_KEY` - Clé publique Firebase
- `VITE_FIREBASE_AUTH_DOMAIN` - Domaine d'authentification
- `VITE_FIREBASE_PROJECT_ID` - ID du projet Firebase
- `VITE_FIREBASE_STORAGE_BUCKET` - Bucket de stockage
- `VITE_FIREBASE_MESSAGING_SENDER_ID` - ID pour les notifications
- `VITE_FIREBASE_APP_ID` - ID de l'application

### 🛡️ Sécurité réelle

La sécurité de ce projet repose sur :

1. **Règles de sécurité Firestore** - Contrôlent l'accès aux données
2. **Règles d'authentification Firebase** - Contrôlent qui peut se connecter
3. **Validation côté serveur** - Pour les opérations sensibles

### 📚 Ressources

- [Documentation Firebase Security](https://firebase.google.com/docs/rules)
- [Is it safe to expose Firebase apiKey?](https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public)
- [Firebase Security Best Practices](https://firebase.google.com/docs/database/security)

## 🚨 Signaler une vulnérabilité

Si vous découvrez une vraie vulnérabilité de sécurité, veuillez la signaler de manière responsable :

1. **NE PAS** créer d'issue publique
2. Contacter directement le mainteneur
3. Fournir des détails techniques précis
4. Permettre un délai raisonnable pour la correction

## ✅ Vulnérabilités acceptées

Les "alertes" suivantes peuvent être ignorées :

- Exposition des clés Firebase côté client
- Variables d'environnement commençant par `VITE_`
- Configuration Firebase dans le code source

---

**Cette configuration suit les meilleures pratiques de sécurité Firebase.**

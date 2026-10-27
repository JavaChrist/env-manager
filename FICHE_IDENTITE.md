# Environment Manager

## Présentation en une phrase
Environment Manager est une application web qui permet à un développeur de regrouper au même endroit les variables d'environnement (clés API, secrets) de ses différents projets, de les copier en un clic et d'importer automatiquement celles déjà configurées sur Vercel.

## Public visé
Les développeurs et créateurs de projets qui jonglent avec plusieurs applications et veulent retrouver rapidement, dans un espace privé, les variables d'environnement propres à chaque projet.

## Problème résolu
Les clés API et secrets se retrouvent dispersés dans de nombreux fichiers `.env` difficiles à retrouver. L'application centralise ces informations dans un coffre personnel organisé par projet, et évite de les ressaisir à la main en les récupérant directement depuis les projets déjà déployés sur Vercel.

## Fonctionnalités principales
- **Compte personnel sécurisé** : chacun se connecte avec son e-mail et son mot de passe ; ses projets ne sont visibles que par lui.
- **Fiches de projet** : pour chaque projet, on enregistre un nom, une description, le bloc de variables d'environnement, une note et des étiquettes.
- **Copie en un clic** : le bloc de variables d'un projet se copie instantanément pour être collé ailleurs.
- **Import depuis Vercel** : l'application liste les projets Vercel de l'utilisateur et récupère automatiquement leurs variables selon l'environnement choisi (Production, Preview ou Développement).
- **Thème clair / sombre et application installable** : l'affichage s'adapte aux préférences et l'outil peut s'installer comme une application, utilisable même hors ligne.

## Statut
**Disponible et fonctionnel** : l'application est déployée et les fonctionnalités ci-dessus ont été vérifiées dans le code et testées sur l'import Vercel.

Limites importantes à connaître :
- Les valeurs des variables sont enregistrées **sans chiffrement** dans la base de données : l'outil convient à un usage personnel.
- L'import Vercel repose sur **un seul jeton d'accès** configuré côté serveur ; il est donc adapté à un déploiement individuel.
- Les variables marquées « Sensible » sur Vercel ne peuvent pas être récupérées (valeur renvoyée vide, à compléter manuellement).
- Les étiquettes servent uniquement à l'affichage (pas de recherche ni de filtre), et la documentation d'un projet s'affiche en texte simple.

## Adresse du site
https://env-manager-nine.vercel.app (alias de production Vercel, vérifié lors du dernier déploiement).

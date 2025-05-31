#!/usr/bin/env node

/**
 * Script de vérification avant déploiement
 * Vérifie que toutes les variables d'environnement sont configurées
 */

import { readFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

// Variables d'environnement requises
const REQUIRED_ENV_VARS = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_STORAGE_BUCKET",
  "VITE_FIREBASE_MESSAGING_SENDER_ID",
  "VITE_FIREBASE_APP_ID",
];

console.log("🚀 Vérification avant déploiement...\n");

// 1. Vérifier que .env.local existe
const envPath = join(projectRoot, ".env.local");
if (!existsSync(envPath)) {
  console.error("❌ Fichier .env.local introuvable");
  console.log("   Créez un fichier .env.local avec vos variables Firebase");
  process.exit(1);
}

console.log("✅ Fichier .env.local trouvé");

// 2. Lire les variables d'environnement
let envContent;
try {
  envContent = readFileSync(envPath, "utf-8");
} catch (error) {
  console.error("❌ Impossible de lire .env.local:", error.message);
  process.exit(1);
}

// 3. Vérifier chaque variable requise
const missingVars = [];
const foundVars = [];

REQUIRED_ENV_VARS.forEach((varName) => {
  const regex = new RegExp(`^${varName}=.+$`, "m");
  if (regex.test(envContent)) {
    foundVars.push(varName);
    console.log(`✅ ${varName}`);
  } else {
    missingVars.push(varName);
    console.log(`❌ ${varName} - MANQUANT`);
  }
});

// 4. Vérifier .gitignore
const gitignorePath = join(projectRoot, ".gitignore");
if (existsSync(gitignorePath)) {
  const gitignoreContent = readFileSync(gitignorePath, "utf-8");
  if (
    gitignoreContent.includes("*.local") ||
    gitignoreContent.includes(".env.local")
  ) {
    console.log("✅ .env.local est ignoré par Git");
  } else {
    console.log("⚠️  .env.local pourrait être tracké par Git");
    console.log('   Ajoutez "*.local" à votre .gitignore');
  }
} else {
  console.log("⚠️  Fichier .gitignore introuvable");
}

// 5. Vérifier package.json
const packagePath = join(projectRoot, "package.json");
if (existsSync(packagePath)) {
  try {
    const packageJson = JSON.parse(readFileSync(packagePath, "utf-8"));
    if (packageJson.scripts && packageJson.scripts.build) {
      console.log("✅ Script de build configuré");
    } else {
      console.log("❌ Script de build manquant dans package.json");
    }
  } catch (error) {
    console.log("⚠️  Impossible de lire package.json");
  }
}

// 6. Résumé
console.log("\n📊 Résumé:");
console.log(
  `   Variables trouvées: ${foundVars.length}/${REQUIRED_ENV_VARS.length}`
);

if (missingVars.length > 0) {
  console.log("\n❌ Variables manquantes:");
  missingVars.forEach((varName) => {
    console.log(`   - ${varName}`);
  });
  console.log("\n📝 Ajoutez ces variables à votre .env.local");
  process.exit(1);
}

console.log("\n🎉 Tout est prêt pour le déploiement !");
console.log("\n📋 Prochaines étapes:");
console.log("   1. git add .");
console.log('   2. git commit -m "Ready for deployment"');
console.log("   3. git push origin main");
console.log("   4. Configurer les variables sur Vercel");
console.log("   5. Déployer sur Vercel");

console.log("\n🔗 Liens utiles:");
console.log("   - Vercel: https://vercel.com");
console.log("   - Guide de déploiement: ./DEPLOYMENT.md");

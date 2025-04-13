# NestJS Authentication API

Un example d'authentification construite avec NestJS, utilisant JWT pour la gestion des tokens et SQLite comme BDD.

## 🚀 Fonctionnalités

- 👤 Inscription utilisateur
- 🔐 Connexion sécurisée
- 🎟️ Authentification JWT
- 📝 Validation des données avec class-validator
- 🔒 Hashage des mots de passe avec bcrypt
- 📦 Base de données SQLite avec TypeORM

## 📋 Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn

## 🛠️ Installation

1. Clonez le repository :
```bash
git clone [url-du-repo]
cd nestjs-auth
```

2. Installez les dépendances :
```bash
npm install
```

3. Créez un fichier `.env` à la racine du projet :
```env
JWT_SECRET=votre_secret_jwt
```

## 🚦 Démarrage

1. Pour lancer l'application en mode développement :
```bash
npm run start:dev
```

2. Pour construire et lancer en production :
```bash
npm run build
npm run start:prod
```

## 📡 Points d'API

### Inscription
- **POST** `/auth/signup`
```json
{
  "email": "user@example.com",
  "password": "Passw0rd123"
}
```

### Connexion
- **POST** `/auth/login`
```json
{
  "email": "user@example.com",
  "password": "Passw0rd123"
}
```

## 🔒 Validation des Mots de Passe

Le mot de passe doit contenir :
- Au moins 8 caractéres
- Au moins 1 majuscule
- Au moins 1 minuscule
- Au moins 1 chiffre

## 🏗️ Structure du Projet

```
src/
├── auth/
│   ├── dtos/
│   │   ├── login.dto.ts
│   │   └── signup.dto.ts
│   ├── entity/
│   │   └── user.entity.ts
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   └── auth.service.ts
├── config/
│   └── config.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts
```

## 📚 Documentation

La documentation TypeDoc est disponible pour tous les composants du projet. Pour générer la documentation :

```bash
npm run doc
```

## ⚠️ Notes de Sécurité

- Le mode `synchronize: true` de TypeORM ne doit pas être utilisé en production
- Stockez toujours les secrets (JWT_SECRET) dans des variables d'environnement
- Les mots de passe sont hashés avec bcrypt avant stockage

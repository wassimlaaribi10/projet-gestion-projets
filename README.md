# Plateforme Web Collaborative de Gestion de Projets

Application web MERN permettant à des équipes de créer, organiser, suivre et piloter leurs projets collaboratifs.

---

## 📋 Description

Cette plateforme permet à des utilisateurs authentifiés de :

* Créer et gérer des projets
* Inviter des membres et leur attribuer des rôles
* Organiser le travail en tâches assignables
* Collaborer via des commentaires et notifications
* Suivre l'avancement via un tableau de bord
* Consulter l'historique des actions

---

## 🛠 Stack technique

### Frontend

* React.js
* React Router
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* API REST

### Base de données

* MongoDB
* Mongoose

### Sécurité

* JWT (authentification)
* bcrypt (hashage)
* Helmet, CORS, rate limiting
* RBAC (contrôle d'accès basé sur les rôles)

### Tests

* Jest / Vitest
* Supertest
* Postman

### Qualité

* ESLint
* Prettier

### DevOps

* Docker
* GitHub Actions

---

## 📁 Structure du projet

```text
projet-gestion-projets/
├── backend/ # API REST (Node.js + Express + MongoDB)
├── frontend/ # Interface utilisateur (React)
├── docs/ # Documentation, UML, maquettes
├── .gitignore
├── README.md
└── CONTRIBUTING.md
```

---

## ✅ Prérequis

Avant de commencer, assure-toi d'avoir installé :

* **Node.js** (version 18 ou supérieure) — [télécharger](https://nodejs.org/)
* **npm** (installé avec Node.js)
* **Git** — [télécharger](https://git-scm.com/)
* **MongoDB** (local ou MongoDB Atlas) — [télécharger](https://www.mongodb.com/try/download/community)
* **VS Code** (recommandé) — [télécharger](https://code.visualstudio.com/)

---

## 🚀 Installation

> Les instructions détaillées seront ajoutées au fil du développement.

### Cloner le projet

```bash
git clone https://github.com/TON-USERNAME/projet-gestion-projets.git
cd projet-gestion-projets
```

### Backend (à venir)

```bash
cd backend
npm install
npm run dev
```

### Frontend (à venir)

```bash
cd frontend
npm install
npm run dev
```

---

## 🌿 Conventions Git

### Branches

| **Type**       | **Format**       | **Exemple**             |
| :------------- | :--------------- | :---------------------- |
| Fonctionnalité | `feature/<nom>`  | `feature/auth-login`    |
| Correction     | `fix/<nom>`      | `fix/task-status`       |
| Documentation  | `docs/<nom>`     | `docs/api-endpoints`    |
| Refactoring    | `refactor/<nom>` | `refactor/task-service` |
| Tests          | `test/<nom>`     | `test/auth-endpoints`   |
| Configuration  | `chore/<nom>`    | `chore/docker-setup`    |

### Commits (Conventional Commits)

Format : `<type>: <description>`

| **Type**   | **Usage**               |
| :--------- | :---------------------- |
| `feat`     | Nouvelle fonctionnalité |
| `fix`      | Correction de bug       |
| `docs`     | Documentation           |
| `style`    | Formatage               |
| `refactor` | Refactoring             |
| `test`     | Tests                   |
| `chore`    | Configuration           |

---

## 📝 Conventions de code

| **Élément**        | **Convention**     | **Exemple**       |
| :----------------- | :----------------- | :---------------- |
| Dossier            | kebab-case         | `task-management` |
| Composant React    | PascalCase         | `TaskCard.jsx`    |
| Fichier utilitaire | camelCase          | `formatDate.js`   |
| Variable           | camelCase          | `taskList`        |
| Constante          | UPPER_SNAKE_CASE   | `MAX_FILE_SIZE`   |
| Modèle             | PascalCase         | `Task`            |
| Route API          | kebab-case pluriel | `/api/tasks`      |

---

## 🎯 Definition of Done

Une User Story est considérée comme terminée lorsque :

* [ ] Le code est écrit et fonctionne
* [ ] Le code respecte ESLint et Prettier
* [ ] Les validations frontend et backend sont en place
* [ ] Les erreurs sont gérées
* [ ] Les permissions RBAC sont vérifiées
* [ ] Les tests passent
* [ ] Le responsive est vérifié
* [ ] Les états loading / success / error / empty sont gérés
* [ ] Le commit respecte les Conventional Commits
* [ ] La documentation est à jour

---

## 📊 Statut du projet

🚧 **En cours de développement — Sprint 1**
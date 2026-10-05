# Guide de contribution

Ce document décrit les règles et le workflow à suivre pour ce projet.

---

## 📋 Table des matières

1. [Prérequis](#-prérequis)
2. [Workflow Git](#-workflow-git)
3. [Conventions de branches](#-conventions-de-branches)
4. [Conventions de commits](#-conventions-de-commits)
5. [Conventions de code](#-conventions-de-code)
6. [Definition of Done](#-definition-of-done)
7. [Règles absolues](#-règles-absolues)
8. [Résumé ultra simple des étapes](#-résumé-ultra-simple-des-étapes)
9. [Exemple concret](#-exemple-concret)

---

## ✅ Prérequis

* Node.js (version 18 ou supérieure)
* npm
* Git
* Un compte GitHub
* Une connaissance de base de la stack MERN

---

## 🌿 Workflow Git

Le projet suit un workflow basé sur des branches dédiées.

### Branches principales

| **Branche** | **Rôle**                 |
| :---------- | :----------------------- |
| `main`      | Version stable, déployée |

### Étapes pour ajouter une fonctionnalité

1. **Se placer sur `main` et récupérer la dernière version**

   ```bash
   git checkout main
   git pull origin main
   ```

2. **Créer une branche de travail**

   ```bash
   git checkout -b feature/nom-court
   ```

3. **Travailler et commiter régulièrement**

   ```bash
   git add .
   git commit -m "feat: description courte"
   ```

4. **Pousser la branche sur GitHub**

   ```bash
   git push origin feature/nom-court
   ```

5. **Merger la branche dans** `main`

   ```bash
   git checkout main
   git merge feature/nom-court
   git push origin main
   ```

6. **Supprimer la branche après merge**

   ```bash
   git branch -d feature/nom-court
   ```

---

## 🌱 Conventions de branches

| **Type**       | **Format**       | **Exemple**             |
| :------------- | :--------------- | :---------------------- |
| Fonctionnalité | `feature/<nom>`  | `feature/auth-login`    |
| Correction     | `fix/<nom>`      | `fix/task-status`       |
| Documentation  | `docs/<nom>`     | `docs/api-endpoints`    |
| Refactoring    | `refactor/<nom>` | `refactor/task-service` |
| Tests          | `test/<nom>`     | `test/auth-endpoints`   |
| Configuration  | `chore/<nom>`    | `chore/docker-setup`    |

**Règles :**

* Utiliser le **kebab-case** (minuscules, tirets).
* Le nom doit être **court** et **descriptif**.
* Une branche = une seule préoccupation.

---

## 📝 Conventions de commits

Le projet utilise les **Conventional Commits**.

### Format

```text
<type>: <description courte>
```

### Types autorisés

| **Type**   | **Usage**                                |
| :--------- | :--------------------------------------- |
| `feat`     | Nouvelle fonctionnalité                  |
| `fix`      | Correction de bug                        |
| `docs`     | Documentation                            |
| `style`    | Formatage (pas de changement de logique) |
| `refactor` | Refactoring                              |
| `test`     | Ajout ou modification de tests           |
| `chore`    | Configuration, dépendances               |

### Exemples

```bash
feat: add user registration endpoint
fix: correct task status transition
docs: update README with installation steps
test: add integration tests for auth
chore: install ESLint and Prettier
refactor: extract task logic into service
```

### Règles

* Utiliser l'**impératif présent** ("add", "fix", "update").
* Ne pas mettre de point final.
* Ne pas dépasser 72 caractères.
* Un commit = un changement logique.

---

## 📐 Conventions de code

| **Élément**        | **Convention**     | **Exemple**       |
| :----------------- | :----------------- | :---------------- |
| Dossier            | kebab-case         | `task-management` |
| Composant React    | PascalCase         | `TaskCard.jsx`    |
| Fichier utilitaire | camelCase          | `formatDate.js`   |
| Fichier backend    | camelCase          | `taskService.js`  |
| Variable           | camelCase          | `taskList`        |
| Constante          | UPPER_SNAKE_CASE   | `MAX_FILE_SIZE`   |
| Modèle             | PascalCase         | `Task`            |
| Route API          | kebab-case pluriel | `/api/tasks`      |

### Règles générales

* **Indentation :** 2 espaces.
* **Guillemets :** simples en JavaScript, doubles en JSX.
* **Point-virgule :** obligatoire.
* **Longueur de ligne :** 100 caractères maximum.
* **Fonctions :** une fonction = une responsabilité.
* **Commentaires :** uniquement quand le code n'est pas évident.

---

## 🎯 Definition of Done

Une User Story est considérée comme **terminée** lorsque :

* [ ] Le code est écrit et fonctionne.
* [ ] Le code respecte ESLint et Prettier.
* [ ] Les validations frontend et backend sont en place.
* [ ] Les erreurs sont gérées (cas nominaux + cas d'erreur).
* [ ] Les permissions RBAC sont vérifiées.
* [ ] Les tests unitaires et/ou d'intégration passent.
* [ ] La fonctionnalité est testée manuellement (Postman + navigateur).
* [ ] Le responsive est vérifié (Desktop + Mobile).
* [ ] Les états loading / success / error / empty sont gérés.
* [ ] Le commit respecte les Conventional Commits.
* [ ] La branche est mergée dans `main`.
* [ ] La documentation est à jour.

---

## 🚫 Règles absolues

* **Ne jamais** versionner de fichier `.env`.
* **Ne jamais** commiter de secrets (clés API, mots de passe).
* **Ne jamais** faire de commit massif du type `final project`.
* **Toujours** tester avant de commiter.
* **Toujours** utiliser un message de commit clair.

---

## 5. Résumé ultra simple des étapes

Pour chaque nouvelle fonctionnalité, tu fais **toujours** ces 6 étapes :

| Étape | Commande                                             | Pourquoi                               |
| :---- | :--------------------------------------------------- | :------------------------------------- |
| 1     | `git checkout main` + `git pull origin main`         | Se placer sur la version stable à jour |
| 2     | `git checkout -b feature/ma-feature`                 | Créer une branche pour travailler      |
| 3     | `git add .` + `git commit -m "feat: ..."`            | Enregistrer le travail                 |
| 4     | `git push origin feature/ma-feature`                 | Envoyer sur GitHub                     |
| 5     | `git checkout main` + `git merge feature/ma-feature` | Fusionner dans main                    |
| 6     | `git branch -d feature/ma-feature`                   | Nettoyer la branche                    |

---

## 6. Exemple concret

Imaginons que tu vas créer le formulaire de connexion.

```powershell
# Étape 1 — Se placer sur main
git checkout main
git pull origin main

# Étape 2 — Créer une branche
git checkout -b feature/auth-login

# Étape 3 — Travailler et commiter
# (tu écris ton code)
git add .
git commit -m "feat: add login form"

# Étape 4 — Pousser sur GitHub
git push origin feature/auth-login

# Étape 5 — Merger dans main
git checkout main
git merge feature/auth-login
git push origin main

# Étape 6 — Supprimer la branche
git branch -d feature/auth-login
```

**C'est tout.** Tu répètes ce cycle pour chaque fonctionnalité.

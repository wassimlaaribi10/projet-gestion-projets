# Guide de contribution

Merci de votre intérêt pour ce projet. Ce document décrit les règles et le workflow à suivre pour contribuer efficacement.

---

## 📋 Table des matières

1. [Prérequis](#-prérequis)
2. [Workflow Git](#-workflow-git)
3. [Conventions de branches](#-conventions-de-branches)
4. [Conventions de commits](#-conventions-de-commits)
5. [Pull Requests](#-pull-requests)
6. [Conventions de code](#-conventions-de-code)
7. [Definition of Done](#-definition-of-done)
8. [Signaler un bug](#-signaler-un-bug)
9. [Proposer une fonctionnalité](#-proposer-une-fonctionnalité)

---

## ✅ Prérequis

Avant de contribuer, assurez-vous d'avoir :

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
| `develop`   | Branche d'intégration    |

### Étapes pour contribuer

1. **Récupérer la dernière version**

   ```bash
   git checkout develop
   git pull origin develop
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

5. **Ouvrir une Pull Request vers** `develop`

6. **Attendre la revue et merger**

7. **Supprimer la branche après merge**

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

## 🔀 Pull Requests

### Avant d'ouvrir une PR

* [ ] Le code fonctionne.
* [ ] Les tests passent.
* [ ] Le lint ne retourne aucune erreur.
* [ ] La branche est à jour avec `develop`.
* [ ] Les commits respectent les Conventional Commits.

### Format d'une PR

**Titre :**

```text
feat: add user registration
```

**Description :**

```markdown
## Description

Brève description de la modification.

## Type

- [ ] Nouvelle fonctionnalité
- [ ] Correction
- [ ] Documentation
- [ ] Refactoring
- [ ] Tests

## User Story concernée

US-XXX

## Checklist

- [ ] Code testé
- [ ] Tests ajoutés
- [ ] Documentation mise à jour
- [ ] Pas de secrets versionnés
```

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
* [ ] La branche est mergée dans `develop`.
* [ ] La documentation est à jour.

---

## 🐛 Signaler un bug

Ouvrir une **issue** sur GitHub avec :

* **Titre :** description courte du bug.
* **Description :** ce qui se passe vs ce qui devrait se passer.
* **Étapes de reproduction :** liste numérotée.
* **Environnement :** OS, navigateur, version de Node.js.
* **Captures d'écran :** si pertinent.

---

## 💡 Proposer une fonctionnalité

Ouvrir une **issue** sur GitHub avec :

* **Titre :** nom de la fonctionnalité.
* **Problème :** quel besoin cela résout.
* **Solution proposée :** description de la fonctionnalité.
* **Alternatives :** autres solutions envisagées.
* **Contexte additionnel :** maquettes, exemples.

---

## 🚫 Règles absolues

* **Ne jamais** versionner de fichier `.env`.
* **Ne jamais** commiter de secrets (clés API, mots de passe).
* **Ne jamais** pousser directement sur `main` ou `develop`.
* **Ne jamais** faire de commit massif du type `final project`.
* **Toujours** tester avant de commiter.
* **Toujours** utiliser un message de commit clair.

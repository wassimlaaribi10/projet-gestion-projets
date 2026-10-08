# Modèle de données MongoDB

**Projet :** Plateforme Web Collaborative de Gestion de Projets
**Version :** 1.0
**Date :** 2026

---

## 1. Vue d'ensemble

La base de données `gestion_projets` contient **6 collections** :

| #  | Collection      | Rôle                               |
| :- | :-------------- | :--------------------------------- |
| 1  | `users`         | Utilisateurs de la plateforme      |
| 2  | `projects`      | Projets créés par les utilisateurs |
| 3  | `tasks`         | Tâches des projets                 |
| 4  | `comments`      | Commentaires sur les tâches        |
| 5  | `notifications` | Notifications des utilisateurs     |
| 6  | `activitylogs`  | Journal d'activité (audit)         |

---

## 2. Choix d'architecture : Embedding vs Referencing

### Principe

* **Embedding** : stocker les données dans le document parent. Utilisé quand les données sont **toujours lues ensemble** et **peu nombreuses**.
* **Referencing** : stocker une référence (`ObjectId`) vers un autre document. Utilisé quand les données sont **lues séparément** ou **nombreuses**.

### Décisions appliquées

| Élément                  | Choix       | Justification                                          |
| :----------------------- | :---------- | :----------------------------------------------------- |
| `Project.membres`        | Embedding   | Peu de membres par projet, toujours lus avec le projet |
| `Project.proprietaire`   | Referencing | L'utilisateur existe indépendamment du projet          |
| `Task.projet`            | Referencing | Les tâches sont filtrées indépendamment du projet      |
| `Task.assigneA`          | Referencing | L'utilisateur existe indépendamment                    |
| `Task.tags`              | Embedding   | Tableau simple de chaînes                              |
| `Comment.tache`          | Referencing | Les commentaires sont lus séparément de la tâche       |
| `Comment.mentions`       | Referencing | Relation many-to-many avec les users                   |
| `Notification.reference` | Embedding   | Petit objet polymorphe, lu avec la notification        |
| `ActivityLog.details`    | Embedding   | Objet libre, lu avec le log                            |

---

## 3. Détail des collections

### 3.1 Collection `users`

| Champ               | Type     | Obligatoire | Description                                |
| :------------------ | :------- | :---------- | :----------------------------------------- |
| `_id`               | ObjectId | Oui         | Identifiant unique généré par MongoDB      |
| `nom`               | String   | Oui         | Nom de l'utilisateur                       |
| `prenom`            | String   | Oui         | Prénom de l'utilisateur                    |
| `email`             | String   | Oui         | Email unique (identifiant de connexion)    |
| `password`          | String   | Oui         | Mot de passe hashé avec bcrypt             |
| `role`              | String   | Oui         | Valeurs : `admin`, `chef_projet`, `membre` |
| `avatar`            | String   | Non         | URL de l'image de profil                   |
| `actif`             | Boolean  | Oui         | `true` par défaut                          |
| `dateCreation`      | Date     | Oui         | Date d'inscription                         |
| `derniereConnexion` | Date     | Non         | Dernière connexion                         |

**Indexes :**

| Index       | Champs         | Type   | Raison                   |
| :---------- | :------------- | :----- | :----------------------- |
| Index email | `{ email: 1 }` | Unique | Recherche à la connexion |
| Index rôle  | `{ role: 1 }`  | Simple | Filtrage par rôle        |

---

### 3.2 Collection `projects`

| Champ                 | Type          | Obligatoire | Description                           |
| :-------------------- | :------------ | :---------- | :------------------------------------ |
| `_id`                 | ObjectId      | Oui         | Identifiant unique                    |
| `nom`                 | String        | Oui         | Nom du projet                         |
| `description`         | String        | Non         | Description du projet                 |
| `statut`              | String        | Oui         | `actif` ou `archive`                  |
| `priorite`            | String        | Oui         | `basse`, `moyenne`, `haute`           |
| `dateDebut`           | Date          | Oui         | Date de début                         |
| `dateFinPrevue`       | Date          | Oui         | Date de fin prévue                    |
| `proprietaire`        | ObjectId      | Oui         | Référence vers `users._id`            |
| `membres`             | Array         | Oui         | Tableau de sous-documents (embedding) |
| `membres[].user`      | ObjectId      | Oui         | Référence vers `users._id`            |
| `membres[].role`      | String        | Oui         | `chef_projet` ou `membre`             |
| `membres[].dateAjout` | Date          | Oui         | Date d'ajout au projet                |
| `tags`                | Array<String> | Non         | Tags du projet                        |
| `couleur`             | String        | Non         | Couleur d'affichage                   |
| `dateCreation`        | Date          | Oui         | Date de création                      |

**Indexes :**

| Index              | Champs                  | Raison                          |
| :----------------- | :---------------------- | :------------------------------ |
| Index propriétaire | `{ proprietaire: 1 }`   | Lister les projets d'un user    |
| Index membre       | `{ "membres.user": 1 }` | Trouver les projets d'un membre |
| Index statut       | `{ statut: 1 }`         | Filtrer les projets actifs      |
| Index date         | `{ dateCreation: -1 }`  | Trier par date décroissante     |

---

### 3.3 Collection `tasks`

| Champ          | Type          | Obligatoire | Description                                   |
| :------------- | :------------ | :---------- | :-------------------------------------------- |
| `_id`          | ObjectId      | Oui         | Identifiant unique                            |
| `titre`        | String        | Oui         | Titre de la tâche                             |
| `description`  | String        | Non         | Description détaillée                         |
| `projet`       | ObjectId      | Oui         | Référence vers `projects._id`                 |
| `statut`       | String        | Oui         | `a_faire`, `en_cours`, `en_revue`, `terminee` |
| `priorite`     | String        | Oui         | `basse`, `moyenne`, `haute`, `urgente`        |
| `assigneA`     | ObjectId      | Non         | Référence vers `users._id` (nullable)         |
| `createur`     | ObjectId      | Oui         | Référence vers `users._id`                    |
| `dateEcheance` | Date          | Non         | Date limite                                   |
| `dateDebut`    | Date          | Non         | Date de début réelle                          |
| `dateFin`      | Date          | Non         | Date de fin réelle                            |
| `estimation`   | Number        | Non         | Estimation en heures                          |
| `tempsPasse`   | Number        | Non         | Temps passé en heures                         |
| `tags`         | Array<String> | Non         | Tags de la tâche                              |
| `ordre`        | Number        | Non         | Ordre d'affichage (kanban)                    |
| `dateCreation` | Date          | Oui         | Date de création                              |

**Indexes :**

| Index          | Champs                     | Raison                                 |
| :------------- | :------------------------- | :------------------------------------- |
| Index projet   | `{ projet: 1 }`            | Lister les tâches d'un projet          |
| Index assigné  | `{ assigneA: 1 }`          | Lister les tâches d'un user            |
| Index statut   | `{ statut: 1 }`            | Filtrer par statut                     |
| Index échéance | `{ dateEcheance: 1 }`      | Tâches en retard                       |
| Index composé  | `{ projet: 1, statut: 1 }` | Tâches d'un projet filtrées par statut |

---

### 3.4 Collection `comments`

| Champ              | Type            | Obligatoire | Description                   |
| :----------------- | :-------------- | :---------- | :---------------------------- |
| `_id`              | ObjectId        | Oui         | Identifiant unique            |
| `contenu`          | String          | Oui         | Contenu du commentaire        |
| `auteur`           | ObjectId        | Oui         | Référence vers `users._id`    |
| `tache`            | ObjectId        | Oui         | Référence vers `tasks._id`    |
| `mentions`         | Array<ObjectId> | Non         | Références vers `users._id`   |
| `dateCreation`     | Date            | Oui         | Date de création              |
| `dateModification` | Date            | Non         | Date de dernière modification |

**Indexes :**

| Index        | Champs                 | Raison                              |
| :----------- | :--------------------- | :---------------------------------- |
| Index tâche  | `{ tache: 1 }`         | Lister les commentaires d'une tâche |
| Index auteur | `{ auteur: 1 }`        | Lister les commentaires d'un user   |
| Index date   | `{ dateCreation: -1 }` | Trier par date décroissante         |

---

### 3.5 Collection `notifications`

| Champ                  | Type     | Obligatoire | Description                                             |
| :--------------------- | :------- | :---------- | :------------------------------------------------------ |
| `_id`                  | ObjectId | Oui         | Identifiant unique                                      |
| `destinataire`         | ObjectId | Oui         | Référence vers `users._id`                              |
| `type`                 | String   | Oui         | `tache_assignee`, `mention`, `echeance`, `projet_ajout` |
| `message`              | String   | Oui         | Message de la notification                              |
| `lien`                 | String   | Non         | URL frontend vers la ressource                          |
| `lue`                  | Boolean  | Oui         | `false` par défaut                                      |
| `reference.entiteType` | String   | Non         | `task`, `project`, `comment`                            |
| `reference.entiteId`   | ObjectId | Non         | Identifiant de l'entité concernée                       |
| `dateCreation`         | Date     | Oui         | Date de création                                        |

**Indexes :**

| Index              | Champs                        | Raison                           |
| :----------------- | :---------------------------- | :------------------------------- |
| Index destinataire | `{ destinataire: 1, lue: 1 }` | Notifications non lues d'un user |
| Index date         | `{ dateCreation: -1 }`        | Trier par date                   |

---

### 3.6 Collection `activitylogs`

| Champ          | Type     | Obligatoire | Description                              |
| :------------- | :------- | :---------- | :--------------------------------------- |
| `_id`          | ObjectId | Oui         | Identifiant unique                       |
| `utilisateur`  | ObjectId | Oui         | Référence vers `users._id`               |
| `action`       | String   | Oui         | `create`, `update`, `delete`, `assign`   |
| `entiteType`   | String   | Oui         | `project`, `task`, `comment`             |
| `entiteId`     | ObjectId | Oui         | Identifiant de l'entité concernée        |
| `projet`       | ObjectId | Non         | Référence vers `projects._id` (nullable) |
| `details`      | Object   | Non         | Détails de l'action                      |
| `dateCreation` | Date     | Oui         | Date de l'action                         |

**Indexes :**

| Index             | Champs                            | Raison                    |
| :---------------- | :-------------------------------- | :------------------------ |
| Index projet      | `{ projet: 1, dateCreation: -1 }` | Journal d'un projet trié  |
| Index utilisateur | `{ utilisateur: 1 }`              | Filtrer par user          |
| Index entité      | `{ entiteType: 1, entiteId: 1 }`  | Logs d'une entité précise |

---

## 4. Schéma des relations

```text
users
│
├──◄── projects.proprietaire
├──◄── projects.membres[].user
├──◄── tasks.assigneA
├──◄── tasks.createur
├──◄── comments.auteur
├──◄── comments.mentions[]
├──◄── notifications.destinataire
└──◄── activitylogs.utilisateur

projects
│
├──◄── tasks.projet
└──◄── activitylogs.projet

tasks
│
└──◄── comments.tache
```

---

## 5. Récapitulatif

| Collection      | Nombre de champs | Nombre d'indexes |
| :-------------- | :--------------- | :--------------- |
| `users`         | 10               | 2                |
| `projects`      | 12               | 4                |
| `tasks`         | 16               | 5                |
| `comments`      | 7                | 3                |
| `notifications` | 9                | 2                |
| `activitylogs`  | 8                | 3                |
| **Total**       | **62**           | **19**           |

---

## 6. Choix techniques justifiés

### Pourquoi `membres` est embarqué dans `projects` ?

* Un projet a **peu de membres** (quelques dizaines maximum).
* Les membres sont **toujours lus avec le projet**.
* Le rôle d'un membre est **spécifique au projet**.
* **Embedding = 1 seule requête** pour récupérer le projet et ses membres.

### Pourquoi `tasks` est une collection séparée ?

* Un projet peut avoir **des centaines de tâches**.
* Les tâches sont **fréquemment filtrées** (par statut, par assigné, etc.).
* Les tâches sont **modifiées indépendamment** du projet.
* **Referencing = requêtes ciblées** sur les tâches.

### Pourquoi `comments` est une collection séparée ?

* Une tâche peut avoir **beaucoup de commentaires**.
* Les commentaires sont **lus séparément** de la tâche.
* Éviter la limite de **16 MB** par document MongoDB.

### Pourquoi `notifications` est une collection séparée ?

* Un utilisateur peut recevoir **des centaines de notifications**.
* Les notifications sont **lues et marquées** indépendamment.
* **Referencing = performances** pour le comptage et le filtrage.

### Pourquoi `activitylogs` est une collection séparée ?

* Volume potentiellement **très important** (chaque action génère un log).
* Les logs sont **lus séparément** pour l'audit.
* **Referencing = scalabilité** pour les requêtes d'audit.

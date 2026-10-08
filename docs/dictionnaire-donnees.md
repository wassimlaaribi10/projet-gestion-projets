# Dictionnaire de données

**Projet :** Plateforme Web Collaborative de Gestion de Projets
**Base de données :** `gestion_projets`
**Version :** 1.0
**Date :** 2026

---

## 1. Collection `users`

**Description :** Stocke les utilisateurs de la plateforme.

| Champ | Type | Obligatoire | Unique | Description | Contraintes | Défaut |
|---|---|---|---|---|---|---|
| `_id` | ObjectId | Oui | Oui | Identifiant unique généré par MongoDB | — | auto |
| `nom` | String | Oui | Non | Nom de famille de l'utilisateur | 2 à 50 caractères | — |
| `prenom` | String | Oui | Non | Prénom de l'utilisateur | 2 à 50 caractères | — |
| `email` | String | Oui | Oui | Adresse email (identifiant de connexion) | Format email valide | — |
| `password` | String | Oui | Non | Mot de passe hashé avec bcrypt | 8 caractères min (avant hash) | — |
| `role` | String | Oui | Non | Rôle global dans la plateforme | Enum : `admin`, `chef_projet`, `membre` | `membre` |
| `avatar` | String | Non | Non | URL de l'image de profil | Format URL | `null` |
| `actif` | Boolean | Oui | Non | Compte actif ou désactivé | — | `true` |
| `dateCreation` | Date | Oui | Non | Date d'inscription | — | `Date.now` |
| `derniereConnexion` | Date | Non | Non | Date de la dernière connexion | — | `null` |

---

## 2. Collection `projects`

**Description :** Stocke les projets créés par les utilisateurs.

| Champ | Type | Obligatoire | Unique | Description | Contraintes | Défaut |
|---|---|---|---|---|---|---|
| `_id` | ObjectId | Oui | Oui | Identifiant unique | — | auto |
| `nom` | String | Oui | Non | Nom du projet | 3 à 100 caractères | — |
| `description` | String | Non | Non | Description du projet | 0 à 1000 caractères | `""` |
| `statut` | String | Oui | Non | Statut du projet | Enum : `actif`, `archive` | `actif` |
| `priorite` | String | Oui | Non | Priorité du projet | Enum : `basse`, `moyenne`, `haute` | `moyenne` |
| `dateDebut` | Date | Oui | Non | Date de début du projet | — | `Date.now` |
| `dateFinPrevue` | Date | Oui | Non | Date de fin prévue | Doit être > `dateDebut` | — |
| `proprietaire` | ObjectId | Oui | Non | Référence vers `users._id` | Doit exister | — |
| `membres` | Array | Oui | Non | Tableau de membres du projet | Au moins 1 (le propriétaire) | `[]` |
| `membres[].user` | ObjectId | Oui | Non | Référence vers `users._id` | Doit exister | — |
| `membres[].role` | String | Oui | Non | Rôle du membre dans le projet | Enum : `chef_projet`, `membre` | `membre` |
| `membres[].dateAjout` | Date | Oui | Non | Date d'ajout au projet | — | `Date.now` |
| `tags` | Array\<String\> | Non | Non | Tags du projet | Chaque tag : 1 à 30 caractères | `[]` |
| `couleur` | String | Non | Non | Couleur d'affichage (hexadécimal) | Format `#RRGGBB` | `#3B82F6` |
| `dateCreation` | Date | Oui | Non | Date de création du projet | — | `Date.now` |

---

## 3. Collection `tasks`

**Description :** Stocke les tâches des projets.

| Champ | Type | Obligatoire | Unique | Description | Contraintes | Défaut |
|---|---|---|---|---|---|---|
| `_id` | ObjectId | Oui | Oui | Identifiant unique | — | auto |
| `titre` | String | Oui | Non | Titre de la tâche | 3 à 200 caractères | — |
| `description` | String | Non | Non | Description détaillée | 0 à 2000 caractères | `""` |
| `projet` | ObjectId | Oui | Non | Référence vers `projects._id` | Doit exister | — |
| `statut` | String | Oui | Non | Statut de la tâche | Enum : `a_faire`, `en_cours`, `en_revue`, `terminee` | `a_faire` |
| `priorite` | String | Oui | Non | Priorité de la tâche | Enum : `basse`, `moyenne`, `haute`, `urgente` | `moyenne` |
| `assigneA` | ObjectId | Non | Non | Référence vers `users._id` | Doit être membre du projet | `null` |
| `createur` | ObjectId | Oui | Non | Référence vers `users._id` | Doit exister | — |
| `dateEcheance` | Date | Non | Non | Date limite de la tâche | Doit être > `dateDebut` | `null` |
| `dateDebut` | Date | Non | Non | Date de début réelle | — | `null` |
| `dateFin` | Date | Non | Non | Date de fin réelle | Doit être > `dateDebut` | `null` |
| `estimation` | Number | Non | Non | Estimation en heures | ≥ 0 | `0` |
| `tempsPasse` | Number | Non | Non | Temps passé en heures | ≥ 0 | `0` |
| `tags` | Array\<String\> | Non | Non | Tags de la tâche | Chaque tag : 1 à 30 caractères | `[]` |
| `ordre` | Number | Non | Non | Ordre d'affichage (kanban) | ≥ 0 | `0` |
| `dateCreation` | Date | Oui | Non | Date de création | — | `Date.now` |

---

## 4. Collection `comments`

**Description :** Stocke les commentaires sur les tâches.

| Champ | Type | Obligatoire | Unique | Description | Contraintes | Défaut |
|---|---|---|---|---|---|---|
| `_id` | ObjectId | Oui | Oui | Identifiant unique | — | auto |
| `contenu` | String | Oui | Non | Contenu du commentaire | 1 à 1000 caractères | — |
| `auteur` | ObjectId | Oui | Non | Référence vers `users._id` | Doit exister | — |
| `tache` | ObjectId | Oui | Non | Référence vers `tasks._id` | Doit exister | — |
| `mentions` | Array\<ObjectId\> | Non | Non | Références vers `users._id` | Chaque user doit être membre du projet | `[]` |
| `dateCreation` | Date | Oui | Non | Date de création | — | `Date.now` |
| `dateModification` | Date | Non | Non | Date de dernière modification | — | `null` |

---

## 5. Collection `notifications`

**Description :** Stocke les notifications des utilisateurs.

| Champ | Type | Obligatoire | Unique | Description | Contraintes | Défaut |
|---|---|---|---|---|---|---|
| `_id` | ObjectId | Oui | Oui | Identifiant unique | — | auto |
| `destinataire` | ObjectId | Oui | Non | Référence vers `users._id` | Doit exister | — |
| `type` | String | Oui | Non | Type de notification | Enum : `tache_assignee`, `mention`, `echeance`, `projet_ajout` | — |
| `message` | String | Oui | Non | Message affiché | 1 à 300 caractères | — |
| `lien` | String | Non | Non | URL frontend vers la ressource | Format URL relative | `null` |
| `lue` | Boolean | Oui | Non | Statut de lecture | — | `false` |
| `reference.entiteType` | String | Non | Non | Type de l'entité concernée | Enum : `task`, `project`, `comment` | `null` |
| `reference.entiteId` | ObjectId | Non | Non | Identifiant de l'entité concernée | — | `null` |
| `dateCreation` | Date | Oui | Non | Date de création | — | `Date.now` |

---

## 6. Collection `activitylogs`

**Description :** Stocke le journal d'activité (audit) de la plateforme.

| Champ | Type | Obligatoire | Unique | Description | Contraintes | Défaut |
|---|---|---|---|---|---|---|
| `_id` | ObjectId | Oui | Oui | Identifiant unique | — | auto |
| `utilisateur` | ObjectId | Oui | Non | Référence vers `users._id` (auteur de l'action) | Doit exister | — |
| `action` | String | Oui | Non | Type d'action effectuée | Enum : `create`, `update`, `delete`, `assign` | — |
| `entiteType` | String | Oui | Non | Type de l'entité concernée | Enum : `project`, `task`, `comment` | — |
| `entiteId` | ObjectId | Oui | Non | Identifiant de l'entité concernée | Doit exister | — |
| `projet` | ObjectId | Non | Non | Référence vers `projects._id` | — | `null` |
| `details` | Object | Non | Non | Détails de l'action (avant/après) | — | `{}` |
| `dateCreation` | Date | Oui | Non | Date de l'action | — | `Date.now` |

---

## 7. Récapitulatif

| Collection | Nombre de champs | Champs obligatoires |
|---|---|---|
| `users` | 10 | 8 |
| `projects` | 12 | 9 |
| `tasks` | 16 | 7 |
| `comments` | 7 | 5 |
| `notifications` | 9 | 5 |
| `activitylogs` | 8 | 6 |
| **Total** | **62** | **40** |

---

## 8. Règles de validation globales

| Règle | Description |
|---|---|
| **Email** | Format standard `xxx@yyy.zzz` |
| **Password** | 8 caractères minimum (avant hash) |
| **Dates** | Format ISO 8601 (MongoDB natif) |
| **ObjectId** | Doit référencer un document existant |
| **Enum** | Valeur strictement limitée à celles listées |
| **Strings** | Trim automatique des espaces |
| **Arrays** | Pas de valeurs dupliquées (pour `tags`, `mentions`) |

---

## 9. Contraintes d'intégrité

| Contrainte | Description |
|---|---|
| **Un user ne peut pas être ajouté deux fois au même projet** | Vérifié au niveau applicatif (pas de doublon dans `membres`) |
| **Une tâche doit appartenir à un projet existant** | Vérifié au niveau applicatif avant insertion |
| **L'assigné d'une tâche doit être membre du projet** | Vérifié avant assignation |
| **Un commentaire doit référencer une tâche existante** | Vérifié avant insertion |
| **Un utilisateur mentionné doit être membre du projet** | Vérifié avant insertion du commentaire |
| **Un email doit être unique** | Contrainte MongoDB via index unique |
# Maquettes responsive

**Projet :** Plateforme Web Collaborative de Gestion de Projets
**Version :** 1.0
**Date :** 2026
**Format :** Wireframes textuels

---

## 1. Écran de connexion

### Desktop

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                    GestionProjets                       │
│                                                         │
│              ┌───────────────────────────┐              │
│              │       Connexion           │              │
│              │                           │              │
│              │  Email                    │              │
│              │  [____________________]   │              │
│              │                           │              │
│              │  Mot de passe             │              │
│              │  [____________________]   │              │
│              │                           │              │
│              │  [    Se connecter    ]   │              │
│              │                           │              │
│              │  Pas de compte ? S'inscrire│             │
│              └───────────────────────────┘              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Mobile

```
┌───────────────────────┐
│    GestionProjets     │
│                       │
│   ┌───────────────┐   │
│   │   Connexion   │   │
│   │               │   │
│   │ Email         │   │
│   │ [__________]  │   │
│   │               │   │
│   │ Mot de passe  │   │
│   │ [__________]  │   │
│   │               │   │
│   │ [ Se connecter ]  │
│   │               │   │
│   │ Pas de compte ?│  │
│   │ S'inscrire    │   │
│   └───────────────┘   │
└───────────────────────┘
```

---

## 2. Dashboard

### Desktop

```
┌──────────┬──────────────────────────────────────────────────┐
│          │  Tableau de bord              [🔔]  [Avatar]     │
│  Logo    ├──────────────────────────────────────────────────┤
│          │                                                  │
│ Dashboard│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐    │
│ Projets  │  │Projets │ │Tâches  │ │Retard  │ │Terminé │    │
│ Notifs   │  │   5    │ │   23   │ │   4    │ │   12   │    │
│ Profil   │  └────────┘ └────────┘ └────────┘ └────────┘    │
│          │                                                  │
│          │  ┌────────────────────────────────────────────┐ │
│          │  │  Tâches par statut                         │ │
│          │  │  ▓▓▓▓▓▓▓ À faire                           │ │
│          │  │  ▓▓▓▓▓ En cours                            │ │
│          │  │  ▓▓▓ En revue                              │ │
│          │  │  ▓▓▓▓▓▓▓▓ Terminée                         │ │
│          │  └────────────────────────────────────────────┘ │
│          │                                                  │
│          │  ┌────────────────────────────────────────────┐ │
│          │  │  Activité récente                          │ │
│          │  │  • Ahmed a créé une tâche                  │ │
│          │  │  • Sara a commenté                         │ │
│          │  └────────────────────────────────────────────┘ │
└──────────┴──────────────────────────────────────────────────┘
```

### Mobile

```
┌─────────────────────┐
│ ☰  GestionProjets 🔔│
├─────────────────────┤
│  Tableau de bord    │
│                     │
│ ┌─────────────────┐ │
│ │ Projets : 5     │ │
│ └─────────────────┘ │
│ ┌─────────────────┐ │
│ │ Tâches : 23     │ │
│ └─────────────────┘ │
│ ┌─────────────────┐ │
│ │ En retard : 4   │ │
│ └─────────────────┘ │
│ ┌─────────────────┐ │
│ │ Terminées : 12  │ │
│ └─────────────────┘ │
│                     │
│ ┌─────────────────┐ │
│ │ Graphique       │ │
│ └─────────────────┘ │
└─────────────────────┘
```

---

## 3. Liste des projets

### Desktop

```
┌──────────┬──────────────────────────────────────────────────┐
│          │  Projets                    [+ Nouveau projet]   │
│  Logo    ├──────────────────────────────────────────────────┤
│          │  [🔍 Rechercher...]  [Statut ▼] [Priorité ▼]     │
│ Dashboard│                                                  │
│ Projets  │  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│ Notifs   │  │ Projet 1 │  │ Projet 2 │  │ Projet 3 │       │
│ Profil   │  │ ▓▓▓▓▓░░░ │  │ ▓▓▓░░░░░ │  │ ▓▓▓▓▓▓▓▓ │       │
│          │  │ 3 membres│  │ 5 membres│  │ 2 membres│       │
│          │  └──────────┘  └──────────┘  └──────────┘       │
│          │                                                  │
│          │  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│          │  │ Projet 4 │  │ Projet 5 │  │ Projet 6 │       │
│          │  └──────────┘  └──────────┘  └──────────┘       │
│          │                                                  │
│          │         [< 1 2 3 >]                            │
└──────────┴──────────────────────────────────────────────────┘
```

### Mobile

```
┌─────────────────────┐
│ ☰  Projets    [+]   │
├─────────────────────┤
│ [🔍 Rechercher...]  │
│ [Statut ▼][Prio ▼]  │
│                     │
│ ┌─────────────────┐ │
│ │ Projet 1        │ │
│ │ ▓▓▓▓▓░░░        │ │
│ │ 3 membres       │ │
│ └─────────────────┘ │
│ ┌─────────────────┐ │
│ │ Projet 2        │ │
│ │ ▓▓▓░░░░░        │ │
│ │ 5 membres       │ │
│ └─────────────────┘ │
│ ┌─────────────────┐ │
│ │ Projet 3        │ │
│ └─────────────────┘ │
│                     │
│    [< 1 2 3 >]     │
└─────────────────────┘
```

---

## 4. Détail d'un projet

### Desktop

```
┌──────────┬──────────────────────────────────────────────────┐
│          │  Projet : Refonte Site Web                      │
│  Logo    │  [Modifier] [Archiver] [+ Ajouter un membre]    │
│          ├──────────────────────────────────────────────────┤
│ Dashboard│  [ Informations ] [ Membres ] [ Tâches ]        │
│ Projets  ├──────────────────────────────────────────────────┤
│ Notifs   │                                                  │
│ Profil   │  Description : Refonte complète du site         │
│          │  Dates : 01/03/2026 → 30/06/2026                │
│          │  Priorité : Haute                               │
│          │                                                  │
│          │  Progression : ▓▓▓▓▓▓░░░░ 60%                  │
│          │                                                  │
│          │  ┌────────────────────────────────────────────┐ │
│          │  │ Tâche 1      [En cours]    Ahmed           │ │
│          │  │ Tâche 2      [Terminée]    Sara            │ │
│          │  │ Tâche 3      [À faire]     Karim           │ │
│          │  └────────────────────────────────────────────┘ │
└──────────┴──────────────────────────────────────────────────┘
```

### Mobile

```
┌─────────────────────┐
│ ☰  Refonte Site Web │
├─────────────────────┤
│ [Modif] [Arch] [+]  │
│                     │
│ [Info][Memb][Tâch]  │
│                     │
│ Description :       │
│ Refonte complète    │
│                     │
│ Dates :             │
│ 01/03 → 30/06       │
│                     │
│ Progression :       │
│ ▓▓▓▓▓▓░░░░ 60%     │
│                     │
│ ┌─────────────────┐ │
│ │ Tâche 1         │ │
│ │ [En cours]      │ │
│ └─────────────────┘ │
│ ┌─────────────────┐ │
│ │ Tâche 2         │ │
│ │ [Terminée]      │ │
│ └─────────────────┘ │
└─────────────────────┘
```

---

## 5. Composants réutilisables identifiés

À partir de ces maquettes, on identifie les composants React à créer :

| Composant | Utilisé dans |
|---|---|
| `Button` | Tous les écrans |
| `Input` | Connexion, formulaires |
| `Card` | Dashboard, liste des projets |
| `Badge` | Statut, priorité |
| `Sidebar` | Desktop connecté |
| `Header` | Mobile |
| `SearchBar` | Liste des projets |
| `Pagination` | Liste des projets |

---

## 6. Navigation

### Desktop

Sidebar fixe à gauche + contenu à droite.

### Mobile

Header avec menu burger → menu déroulant.

---

## 7. Responsive

| Breakpoint | Largeur | Layout |
|---|---|---|
| Mobile | < 1024px | 1 colonne, header avec menu burger |
| Desktop | ≥ 1024px | Sidebar fixe + contenu |
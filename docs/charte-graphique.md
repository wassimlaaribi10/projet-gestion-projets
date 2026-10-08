# Charte graphique

**Projet :** Plateforme Web Collaborative de Gestion de Projets
**Version :** 1.0
**Date :** 2026

---

## 1. Palette de couleurs

### Couleurs principales

| Nom            | Code HEX  | Aperçu | Usage                              |
| -------------- | --------- | ------ | ---------------------------------- |
| Primaire       | `#3B82F6` | 🔵     | Boutons principaux, liens, accents |
| Primaire foncé | `#2563EB` | 🔵     | Hover, focus                       |
| Primaire clair | `#DBEAFE` | 🔵     | Fonds légers                       |

### Couleurs sémantiques

| Nom       | Code HEX  | Aperçu | Usage                                |
| --------- | --------- | ------ | ------------------------------------ |
| Succès    | `#10B981` | 🟢     | Messages de succès, tâches terminées |
| Attention | `#F59E0B` | 🟠     | Avertissements, tâches en cours      |
| Erreur    | `#EF4444` | 🔴     | Erreurs, tâches en retard            |
| Info      | `#06B6D4` | 🔵     | Informations, notifications          |

### Couleurs neutres

| Nom          | Code HEX  | Aperçu | Usage              |
| ------------ | --------- | ------ | ------------------ |
| Neutre foncé | `#1F2937` | ⚫      | Texte principal    |
| Neutre moyen | `#6B7280` | ⚫      | Texte secondaire   |
| Neutre clair | `#F3F4F6` | ⚪      | Fonds, séparateurs |
| Blanc        | `#FFFFFF` | ⚪      | Fonds de cartes    |

### Couleurs par statut de tâche

| Statut   | Couleur | Code HEX  |
| -------- | ------- | --------- |
| À faire  | Gris    | `#6B7280` |
| En cours | Bleu    | `#3B82F6` |
| En revue | Orange  | `#F59E0B` |
| Terminée | Vert    | `#10B981` |

### Couleurs par priorité

| Priorité | Couleur | Code HEX  |
| -------- | ------- | --------- |
| Basse    | Gris    | `#6B7280` |
| Moyenne  | Bleu    | `#3B82F6` |
| Haute    | Orange  | `#F59E0B` |
| Urgente  | Rouge   | `#EF4444` |

---

## 2. Typographie

### Police

**Police principale :** `Inter`, avec fallback sur `system-ui` et `sans-serif`.

```css
font-family: 'Inter', system-ui, -apple-system, sans-serif;
```

### Échelle typographique

| Élément    | Taille | Graisse        | Line-height |
| ---------- | -----: | -------------- | ----------: |
| H1         |   32px | 700 (bold)     |         1.2 |
| H2         |   24px | 600 (semibold) |         1.3 |
| H3         |   20px | 600 (semibold) |         1.4 |
| H4         |   18px | 600            |         1.4 |
| Corps      |   16px | 400 (regular)  |         1.5 |
| Petit      |   14px | 400            |         1.5 |
| Très petit |   12px | 400            |         1.4 |

---

## 3. Espacements

| Nom   | Valeur | Usage                           |
| ----- | -----: | ------------------------------- |
| `xs`  |    4px | Micro-espacements (icône-texte) |
| `sm`  |    8px | Espacements internes            |
| `md`  |   16px | Espacements standards           |
| `lg`  |   24px | Espacements entre sections      |
| `xl`  |   32px | Espacements majeurs             |
| `2xl` |   48px | Espacements entre blocs         |

---

## 4. Composants

### Boutons

| Type       | Fond        | Texte     | Bordure   | Radius |
| ---------- | ----------- | --------- | --------- | -----: |
| Primaire   | `#3B82F6`   | Blanc     | Aucune    |    8px |
| Secondaire | Blanc       | `#3B82F6` | `#3B82F6` |    8px |
| Danger     | `#EF4444`   | Blanc     | Aucune    |    8px |
| Fantôme    | Transparent | `#3B82F6` | Aucune    |    8px |

**États :**

* **Hover** : fond légèrement plus foncé.
* **Focus** : anneau bleu autour du bouton.
* **Disabled** : opacité 50 %, curseur interdit.

### Inputs

| État     | Bordure   | Fond      |
| -------- | --------- | --------- |
| Normal   | `#D1D5DB` | Blanc     |
| Focus    | `#3B82F6` | Blanc     |
| Erreur   | `#EF4444` | `#FEF2F2` |
| Disabled | `#E5E7EB` | `#F9FAFB` |

**Style :**

* Padding : 10px 14px.
* Radius : 6px.
* Taille police : 16px.

### Cartes

* Fond : blanc.
* Bordure : `#E5E7EB` (1px) ou ombre légère.
* Radius : 12px.
* Padding : 20px.
* Ombre : `0 1px 3px rgba(0,0,0,0.1)`.

### Badges

* Padding : 4px 10px.
* Radius : 999px (pilule).
* Taille police : 12px.
* Graisse : 500.

**Exemple :**

```text
[ Terminée ]  (fond #D1FAE5, texte #065F46)
[ En cours ]  (fond #DBEAFE, texte #1E40AF)
[ Urgente ]   (fond #FEE2E2, texte #991B1B)
```

### Ombres

| Nom  | Valeur                        | Usage                    |
| ---- | ----------------------------- | ------------------------ |
| `sm` | `0 1px 2px rgba(0,0,0,0.05)`  | Éléments légers          |
| `md` | `0 1px 3px rgba(0,0,0,0.1)`   | Cartes                   |
| `lg` | `0 4px 6px rgba(0,0,0,0.1)`   | Modales                  |
| `xl` | `0 10px 15px rgba(0,0,0,0.1)` | Notifications flottantes |

### Bordures

| Nom         | Valeur |
| ----------- | -----: |
| Radius sm   |    4px |
| Radius md   |    8px |
| Radius lg   |   12px |
| Radius full |  999px |

---

## 5. Iconographie

* **Bibliothèque :** Lucide React (ou Heroicons).
* **Style :** outline (bordure), stroke 2px.
* **Taille standard :** 20px.
* **Taille petite :** 16px.
* **Taille grande :** 24px.

**Icônes principales :**

| Action        | Icône           |
| ------------- | --------------- |
| Créer         | Plus (+)        |
| Modifier      | Crayon          |
| Supprimer     | Poubelle        |
| Rechercher    | Loupe           |
| Filtrer       | Entonnoir       |
| Notifications | Cloche          |
| Profil        | Utilisateur     |
| Déconnexion   | Porte de sortie |

---

## 6. Grille et layout

### Breakpoints responsive

| Nom  |   Taille | Usage         |
| ---- | -------: | ------------- |
| `sm` |  ≥ 640px | Mobile large  |
| `md` |  ≥ 768px | Tablette      |
| `lg` | ≥ 1024px | Desktop       |
| `xl` | ≥ 1280px | Desktop large |

### Layout

* **Desktop :** sidebar fixe (240px) + contenu principal.
* **Tablette :** sidebar réduite (icônes seules, 64px).
* **Mobile :** sidebar cachée, menu burger en haut.

### Largeur maximale du contenu

* **Contenu principal :** 1280px max, centré.
* **Formulaires :** 600px max.

---

## 7. Accessibilité

| Règle                  | Description                                   |
| ---------------------- | --------------------------------------------- |
| **Contraste**          | Ratio minimum 4.5:1 pour le texte             |
| **Focus visible**      | Anneau bleu sur tous les éléments interactifs |
| **Labels**             | Tous les inputs ont un label                  |
| **Alt text**           | Toutes les images ont un attribut alt         |
| **Navigation clavier** | Tous les éléments accessibles au clavier      |
| **Tailles de police**  | Minimum 14px pour le corps                    |

---

## 8. Application dans Tailwind CSS

Notre charte sera implémentée avec **Tailwind CSS**. Les couleurs seront configurées dans `tailwind.config.js` :

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
          dark: '#2563EB',
          light: '#DBEAFE',
        },
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        info: '#06B6D4',
        neutral: {
          dark: '#1F2937',
          DEFAULT: '#6B7280',
          light: '#F3F4F6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
};
```

Ainsi, on utilisera des classes comme `bg-primary`, `text-success`, `border-danger` directement dans les composants React.

---

## 9. Exemples d'application

### Bouton primaire

```jsx
<button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark">
  Créer un projet
</button>
```

### Badge de statut

```jsx
<span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
  En cours
</span>
```

### Carte

```jsx
<div className="bg-white rounded-lg shadow-md p-5">
  <h3 className="text-lg font-semibold">Titre</h3>
  <p className="text-neutral">Description</p>
</div>
```

---

## 10. Récapitulatif

| Élément              | Nombre |
| -------------------- | -----: |
| Couleurs principales |      3 |
| Couleurs sémantiques |      4 |
| Couleurs neutres     |      4 |
| Tailles de police    |      7 |
| Espacements          |      6 |
| Composants définis   |      4 |
| Breakpoints          |      4 |
| Ombres               |      4 |

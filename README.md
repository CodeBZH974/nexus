
<div align="center">
  <img src="frontend/public/Logo_principal.svg" alt="Nexus Logo" width="400"/>
</div>

<h1 align="center">Nexus - Le Co-pilote de Projet Intelligent</h1>

Nexus est une application web complète conçue pour réinventer la gestion de projet. En tant que "co-pilote", Nexus utilise l'intelligence artificielle pour fournir une vision claire et unifiée, anticiper les risques, optimiser les flux de travail et aider les équipes à rester parfaitement synchronisées.

## ✨ Philosophie

Notre philosophie repose sur trois piliers :

1.  **Clarté Absolue** : Centraliser toutes les informations pour offrir une source unique de vérité.
2.  **Intelligence Augmentée** : Intégrer l'IA pour transformer les données en insights actionnables.
3.  **Flux de Travail Intuitif** : Concevoir une expérience utilisateur qui rend la complexité simple et agréable.

---

## 🚀 Démarrage Rapide avec Docker

L'ensemble de l'environnement de développement est conteneurisé avec Docker pour garantir une configuration simple et reproductible.

**Prérequis :**

*   [Docker](https://www.docker.com/get-started)
*   [Docker Compose](https://docs.docker.com/compose/install/)

**Étapes :**

1.  **Cloner le dépôt :**
    ```bash
    git clone https://github.com/votre-utilisateur/nexus.git
    cd nexus
    ```

2.  **Configurer les variables d'environnement :**
    Copiez le fichier d'exemple `.env.dev` et personnalisez-le si nécessaire.
    ```bash
    cp .env.dev .env
    ```

3.  **Lancer l'application :**
    ```bash
    docker-compose up --build
    ```

Une fois les conteneurs démarrés, l'application sera accessible aux adresses suivantes :

*   **Frontend (React) :** [http://localhost:5173](http://localhost:5173)
*   **Backend (Django API) :** [http://localhost:8000](http://localhost:8000)

---

## 🛠️ Stack Technique

Nexus est construit avec une stack moderne et robuste, choisie pour sa performance et sa scalabilité.

| Domaine | Technologie | Description |
| :--- | :--- | :--- |
| **Frontend** | ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black) | Bibliothèque JavaScript pour construire des interfaces utilisateur interactives. |
| | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) | Outil de build frontend ultra-rapide pour le développement moderne. |
| | ![Material-UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=mui&logoColor=white) | Framework de composants React pour un design élégant et cohérent. |
| **Backend** | ![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white) | Framework web Python de haut niveau pour un développement rapide et sécurisé. |
| | ![Django REST](https://img.shields.io/badge/Django_REST-A30000?style=for-the-badge&logo=django&logoColor=white) | Toolkit puissant pour construire des APIs Web. |
| **Base de Données** | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white) | Système de gestion de base de données relationnel-objet open-source. |
| **Conteneurisation** | ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white) | Plateforme pour développer, déployer et exécuter des applications dans des conteneurs. |

---

## 🎨 Système de Design

L'interface de Nexus est guidée par un système de design clair et intentionnel.

### Couleurs

| Couleur | Hex | Usage |
| :--- | :--- | :--- |
| **Primaire** | `#1A3A6D` | Identité principale, titres, éléments de navigation. |
| **Accent** | `#00C49A` | Appels à l'action, indicateurs de succès, progression. |
| **Avertissement** | `#FFA500` | Risques potentiels, suggestions de l'IA, délais serrés. |
| **Erreur** | `#FF4842` | Erreurs critiques, blocages, chemins critiques en danger. |

### Typographie

*   **Titres & Éléments Clés :** `Montserrat` - Pour un impact visuel fort et une hiérarchie claire.
*   **Corps de Texte & Descriptions :** `Lato` - Pour une lisibilité et un confort de lecture optimaux.

---

## 🌟 Fonctionnalités Uniques

Nexus n'est pas juste un gestionnaire de tâches. C'est un partenaire proactif.

*   **Le Hub de Projet :** Un tableau de bord central qui donne une vision à 360° de la santé et de l'avancement de chaque projet.
*   **La Tâche Intelligente :** Des cartes de tâches enrichies par l'IA qui identifient les risques, suggèrent des collaborateurs et estiment les efforts.
*   **La Timeline Prédictive :** Un diagramme de Gantt dynamique qui visualise non seulement le planning, mais aussi les prédictions de l'IA sur les délais et met en évidence le chemin critique.
*   **Le Flowboard :** Un Kanban évolué qui montre les dépendances, identifie les goulots d'étranglement et optimise le flux de travail.

---

## 🤝 Contribution

Nous sommes ouverts aux contributions ! Si vous souhaitez participer à l'amélioration de Nexus, veuillez consulter notre guide de contribution (à venir) et respecter le code de conduite du projet.

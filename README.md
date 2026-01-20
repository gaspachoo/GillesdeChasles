# Gilles de Chasles - Application de Poèmes

Application web fullstack pour afficher et gérer des poèmes, réflexions et autres contenus littéraires.

## 🏗️ Architecture

- **Frontend** : Angular 21 avec SSR (Server-Side Rendering)
- **Backend** : Spring Boot 3 avec PostgreSQL
- **Styling** : TailwindCSS

## 🚀 Démarrage rapide

### Prérequis

- Node.js 20+ et npm
- Java 17+
- PostgreSQL 15+
- Gradle (inclus via wrapper)

### 1. Démarrer PostgreSQL

Assurez-vous que PostgreSQL est lancé avec la configuration suivante :
- Base de données : `postgres`
- Utilisateur : `postgres`
- Mot de passe : `temppasswd`
- Port : `5432`

**Note** : Vous n'avez pas besoin de créer les tables manuellement ! 
Spring Boot avec `spring.jpa.hibernate.ddl-auto=update` crée automatiquement toutes les tables au premier démarrage.

### 2. Démarrer le backend

```bash
cd back
./gradlew bootRun
```

Le serveur démarre sur `http://localhost:8080`

### 3. Démarrer le frontend

```bash
cd front
ng serve
```

Le serveur démarre sur `http://localhost:4200`

## 🔌 API Endpoints

### Contenus

- `GET /api/content/titles?type=poeme` - Récupérer tous les titres de poèmes
- `GET /api/content/{id}` - Récupérer un contenu par ID
- `POST /api/content` - Créer un nouveau contenu

### Exemple de requête

```bash
curl -X POST http://localhost:8080/api/content \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mon Poème",
    "type": "POEME",
    "contentText": "Le texte du poème..."
  }'
```

## 🎨 Fonctionnalités

### Page Poèmes
- ✅ Chargement automatique des titres
- ✅ Expansion/réduction au clic avec animation
- ✅ Chargement du contenu à la demande (lazy loading)
- ✅ États de chargement et d'erreur
- ✅ Design responsive

### À venir
- Page Réflexions
- Page Ailleurs
- Page Vous
- Système de tags et thèmes
- Recommandations de contenu

## 🛠️ Développement

### Frontend

```bash
cd front
npm run start    # Démarrer en mode dev
npm run build    # Build pour production
npm run test     # Lancer les tests
```

### Backend

```bash
cd back
./gradlew bootRun    # Démarrer l'application
./gradlew build      # Build
./gradlew test       # Lancer les tests
```


## 🔧 Configuration

### Backend (application.properties)

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/postgres
spring.datasource.username=postgres
spring.datasource.password=temppasswd
spring.jpa.hibernate.ddl-auto=update
```

### Frontend (environment.ts)

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

## 📝 Types de contenus

- `POEME` - Poèmes
- `REFLEXION` - Réflexions
- `DESSIN` - Dessins

## 📄 License

Tous droits réservés.
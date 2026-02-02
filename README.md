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

### 1. Configurer les variables d'environnement

```bash
# Copier le fichier d'exemple
cp .env.example .env

### 2. Démarrer avec Docker Compose

```bash
# Démarrage simple (développement)
docker-compose up -d

# Arrêter les services
docker-compose down
```

### OU Démarrage local

#### Démarrer PostgreSQL

Assurez-vous que PostgreSQL est lancé avec la configuration suivante :
- Base de données : `postgres`
- Utilisateur : `postgres`
- Mot de passe : `temppasswd` (ou celle dans `.env`)
- Port : `5432`

**Note** : Vous n'avez pas besoin de créer les tables manuellement ! 
Spring Boot avec `spring.jpa.hibernate.ddl-auto=update` crée automatiquement toutes les tables au premier démarrage.

#### Démarrer le backend

```bash
cd back
./gradlew bootRun
```

Le serveur démarre sur `http://localhost:8080`

#### Démarrer le frontend

```bash
cd front
npm install
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

## 🚀 Production

Website is available at:
https://gillesdechasles.duckdns.org

**Pour le déploiement en production**, utiliser les github secrets.

## 🔧 Configuration

### Variables d'Environnement

Les variables d'environnement sont définies dans le fichier `.env` :

```env
# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# JWT Configuration
JWT_SECRET=mySecretKeyThatIsLongEnoughForHS256AlgorithmToWork
JWT_EXPIRATION=86400000

# Database
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/postgres
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=temppasswd
```

Voir `.env.example` pour la liste complète.

### Backend (application.properties)

Les propriétés de Spring Boot lisent les variables d'environnement avec des valeurs par défaut :

```properties
spring.datasource.url=${SPRING_DATASOURCE_URL:jdbc:postgresql://localhost:5432/postgres}
spring.datasource.username=${SPRING_DATASOURCE_USERNAME:postgres}
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD:temppasswd}
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


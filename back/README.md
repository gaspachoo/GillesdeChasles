Here is the description of the tables :

contenus :

| Champ            | Type           | Description                                                      |
|------------------|----------------|------------------------------------------------------------------|
| id               | SERIAL         | Clé primaire                                                     |
| titre            | VARCHAR(255)   | Titre du contenu                                                 |
| type_contenu     | VARCHAR(20)    | "poème", "réflexion", "dessin" (ENUM ou clé étrangère vers `types`) |
| contenu_texte    | TEXT           | NULL si type_contenu = "dessin" (le texte est sur l’image)       |
| date_publication | TIMESTAMP      | Date de publication (auto-remplie)                               |
| image_id         | INTEGER        | Clé étrangère vers images (NULL si pas d’image)                  |
| video_id         | INTEGER        | Clé étrangère vers videos (NULL si pas de vidéo)                 |

images :

| Champ    | Type         | Description                       |
|----------|--------------|-----------------------------------|
| id       | SERIAL       | Clé primaire                      |
| url      | VARCHAR(512) | URL ou chemin vers l’image        |
| legende  | VARCHAR(255) | Légende ou description            |
| est_ia   | BOOLEAN      | True si générée par IA            |

videos :

| Champ | Type         | Description                                   |
|-------|--------------|-----------------------------------------------|
| id    | SERIAL       | Clé primaire                                  |
| url   | VARCHAR(512) | URL YouTube (ex: https://youtu.be/xxxx)       |
| titre | VARCHAR(255) | Titre de la vidéo                             |

themes :

| Champ | Type         | Description                         |
|-------|--------------|-------------------------------------|
| id    | SERIAL       | Clé primaire                        |
| nom   | VARCHAR(100) | Nom du thème (ex: "Amour", "Nature") |

contenus_themes :

| Champ       | Type     | Description                   |
|-------------|----------|-------------------------------|
| contenu_id  | INTEGER  | Clé étrangère vers contenus   |
| theme_id    | INTEGER  | Clé étrangère vers themes     |

tags :

| Champ | Type         | Description                             |
|-------|--------------|-----------------------------------------|
| id    | SERIAL       | Clé primaire                            |
| nom   | VARCHAR(100) | Nom du tag (ex: "Mélancolie", "Printemps") |

contenus_tags :

| Champ       | Type     | Description                 |
|-------------|----------|-----------------------------|
| contenu_id  | INTEGER  | Clé étrangère vers contenus |
| tag_id      | INTEGER  | Clé étrangère vers tags     |

liens :

| Champ            | Type     | Description                                        |
|------------------|----------|----------------------------------------------------|
| id               | SERIAL   | Clé primaire                                       |
| contenu_id       | INTEGER  | Clé étrangère vers contenus (contenu source)       |
| contenu_cible_id | INTEGER  | Clé étrangère vers contenus (contenu recommandé)   |



## Installation

```bash
$ npm install
```

## Running the database and PHPMyAdmin

```bash
docker compose up -d
```

Pour consulter PHPMyAdmin, aller sur `localhost:8081`.


Serveur : `db`

Utilisateur: `user`

Mot de passe: `password`


*Toutes ces valeurs ainsi que le port sur lequel tourne PHPMyAdmin peuvent être changées dans le fichier `.env`.*

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

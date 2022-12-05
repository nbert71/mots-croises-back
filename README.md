

## Installation

```bash
$ npm install
```

## Running the database and PHPMyAdmin

```bash
docker compose up -d
```

Pour consulter PGAdmin, aller sur `localhost:5050`.

Connexion : 
root@email.com
admin

-> Add new server
nom comme on veut
connexion : hostname : db
username : root
mdp : admin

Pour voir les données 

Schema/Tables



Serveur : `db`

Utilisateur: `user`

Mot de passe: `password`


*Toutes ces valeurs ainsi que le port sur lequel tourne PHPMyAdmin peuvent être changées dans le fichier `.env`.*

## Running the app

N'oubliez pas d'installer la CLI de NestJS pour pouvoir lancer le projet `npm install -g @nestjs/cli`.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```



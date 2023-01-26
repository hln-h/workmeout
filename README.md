# WorkMeOut

## Description

A website which creates a workout for you based on information such as time, parts of the body you wish to train, and equipment available. You can save workout combinations and revisit them in the saved section. You can also access futher information about each exercise (from the API) which gives you tips about how to perform each move.

## Setup

### Dependencies

Run `yarn` in the project folder to install dependencies related to Express (the server).

`cd client` and run `yarn` install dependencies related to React (the client).

Since this API doesn't have CORS, you'll need to add the Chrome extension MOESIF Origins & CORS changer. This is not something we can fix.

### Database Prep

Create `.env` file in project directory and add
DB_HOST=localhost
DB_USER=root
DB_PASS=root
DB_NAME=workmeout

## Backend

- `routes` contains all routes using express for https requests GET, PUT, DELETE and POST.
  ​
- `config`, contains config file, with the secret key and bcript for the authentication.
  ​
- `model`, contains all table models for the project, including: workouts. All these models are located in a sql script called init_db.sql which can be runned using the command: `yarn run migrate`

- `seed.sql`, contains all seed files and it's another script with data examples to populate the DB. Can be runned using the command: `yarn run seed`
  ​

### Run Your Development Servers

- Run `yarn start` in project directory to start the Express server on port 5000
- `cd client` and run `yarn start` to start client server in development mode with hot reloading in port 3000.
- Client is configured so all API calls will be proxied to port 5000 for a smoother development experience. Yay!
- You can test your client app in `http://localhost:3000`
- You can test your API in `http://localhost:5000/api`

## Visuals

Database:
+----------------+--------------+------+-----+---------+----------------+
| Field          | Type         | Null | Key | Default | Extra          |
+----------------+--------------+------+-----+---------+----------------+
| id             | int          | NO   | PRI | NULL    | auto_increment |
| bodyPart       | varchar(250) | YES  |     | NULL    |                |
| time           | int          | NO   |     | NULL    |                |
| equipment      | varchar(250) | YES  |     | NULL    |                |
| exerciseApiIds | varchar(250) | YES  |     | NULL    |                |
+----------------+--------------+------+-----+---------+----------------+

## Roadmap

- Embedding spotify playlists
- Embedding youtube videos to help with form etc
- Share workouts with friends
- Edit saved workouts by specific moves.

## Authors and acknowledgment

Helen Hoang

_This is a student project that was created at [CodeOp](http://codeop.tech), a full stack development bootcamp in Barcelona._

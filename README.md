# Express SQL API

This is an RESTful API that interacts with a SQL server DB. 

Built using the following tools:
- Node (server)
- Express (server framework)
- Sequelize (SQL ORM)
- JSON web token (authentication)
- JSON validator (schema validation based on AJV)

Other tools in this project include:
- SQLite3 (local db)
- Pino (logging)
- Mocha (unit testing framework)
- Chai (assertion library)
- Sinon (test mocking)


## Installation

To install node dependencies:
```bash
npm install
```

## Setup

To setup local SQLite DB and insert seed data:
```bash
npm run bootstrap
```
Create a new file `.env` in your root directory with the following variables. See `.env.example` for default example:
```
PORT=4000
LOG_LEVEL='info'
DB_USERNAME=''
DB_PASSWORD=''
DB_NAME='express-sql'
DB_HOSTNAME='localhost'
DB_DIALECT=''
JWT_SECRET='secret'
```
*NOTE: In development mode the DB dialect will be defaulted to SQLite3 and will be stored in a file called `db.sqlite` in the project root.*

## Usage
To start the project using default config:
```bash
npm start
```
To start project in dev mode with live monitoring (requires `node-mon` to be installed locally first):
```bash
npm run start:dev
```
To start project using test config:
```bash
npm run start:test
```
To start project using production config:
```bash
npm run start:prod
```
## Testing

All `POST,PUT,DELETE` routes are protected by JWT token verification.

The default user for testing purposes is:
```bash
username: admin
password: password
```
To get a valid JWT token, you first need to make a request to the `/users/authenticate` endpoint with valid credentials:
```
curl -d '{"username":"admin", "password":"password"}' -H "Content-Type: application/json" -X POST http://localhost:4000/api/v1/users/authenticate

```
This will return the following payload:
```
{
    "id": "cb4d48c8-f9e9-4af6-8538-42e39386a8bf",
    "username": "admin",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNiNGQ0OGM4LWY5ZTktNGFmNi04NTM4LTQyZTM5Mzg2YThiZiIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE1NjY1MjE3NDIsImV4cCI6MTU2NjUyNTM0Mn0.8M2bE56ftXd-y12waDNAwouD5V97e7022qFZaq70zWs"
}
```
For testing purposes the token is valid for an hour.

To make a request to a protected route e.g. `POST` to `/shoppingCentres`, you need to set your `Authorization` bearer header with the token from the previous response:
```
curl -d '{"name":"Test shopping centre", "address":"123 Test St"}' -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNiNGQ0OGM4LWY5ZTktNGFmNi04NTM4LTQyZTM5Mzg2YThiZiIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE1NjY1MjE3NDIsImV4cCI6MTU2NjUyNTM0Mn0.8M2bE56ftXd-y12waDNAwouD5V97e7022qFZaq70zWs" -X POST http://localhost:4000/api/v1/shoppingCentres
```

## Unit testing
To run unit tests using mocha:
```bash
npm run test
```

# crud-api

## Installation

Use `npm i` to install app dependencies.

## Running

There are 3 modes of running application (development and production):
- The application is run in development mode with npm script `npm run start:dev`.
- The application is run in production mode with npm script `npm run start:prod` that starts the build process and then runs the bundled file.
- There is horizontal scaling for application with npm script `npm run start:multi` that starts multiple instances of application using the Node.js Cluster API (equal to the number of available parallelism - 1 on the host machine, each listening on port PORT + n) with a load balancer that distributes requests across them (using Round-robin algorithm).

## Development

For running in development mode use `npm run start:dev`.

For running tests use `npm run test`.

## Available endpoints

- `GET api/users` is used to get all persons. Server should answer with status code 200 and all users records
- `GET api/users/{userId}`. Server should answer with status code 200 and record with `id === userId` if it exists. Server should answer with status code 400 and corresponding message if `userId` is invalid (not uuid). Server should answer with status code 404 and corresponding message if record with `id === userId` doesn't exist.
- `POST api/users` is used to create record about new user and store it in database. Server should answer with status code 201 and newly created record. Server should answer with status code 400 and corresponding message if request body does not contain required fields.
- `PUT api/users/{userId}` is used to update existing user. Server should answer with status code 200 and updated record. Server should answer with status code 400 and corresponding message if `userId` is invalid (not uuid). Server should answer with status code 404 and corresponding message if record with `id === userId` doesn't exist
- `DELETE api/users/{userId}` is used to delete existing user from database. Server should answer with status code 204 if the record is found and deleted. Server should answer with status code 400 and corresponding message if `userId` is invalid (not uuid). Server should answer with status code 404 and corresponding message if record with `id === userId` doesn't exist.

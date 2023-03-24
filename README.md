# Login Platform with NestJS

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Overview

This is a login platform built with NestJS. It provides an authentication system with JWT and roles-based authorization, as well as features such as password recovery with Nodemailer and the ability to store data on Amazon S3. The project uses Docker for containerization and Prisma as the ORM to interact with a PostgreSQL database.

The platform consists of the following modules:

- `auth`: module that handles authentication and authorization.
- `user`: module that allows admins to register users and collaborators.
- `shared`: module containing shared resources such as middleware and decorators.

The architecture of the platform follows a clean architecture approach and uses repository pattern to access the database.

The API is documented with Swagger and has unit tests.

## Technologies

The following technologies are used in this project:

- Node.js
- NestJS
- PostgreSQL
- Prisma
- Docker
- Amazon S3
- JWT
- Nodemailer
- Swagger

## Installation

1. Clone the repository:

git clone https://github.com/LyoDekken/docker-nestjs.git

2. Install dependencies:

npm install

3. Start the application:

npm run start:dev

4. Access the API at `http://localhost:3000`.

## Usage

Refer to the API documentation provided by Swagger at `http://localhost:3333/docs` for instructions on how to use the API.

## Docker and Docker Compose

This project includes a `Dockerfile` and `docker-compose.yml` file for easy containerization and deployment. Here are the most common Docker and Docker Compose commands you may want to use:

- `docker build -t your-image-name .`: Build a Docker image for the project. Replace `your-image-name` with a name for your image.
- `docker run your-image-name`: Run a container based on the built image. Replace `your-image-name` with the name you used when building the image. You can change the port number if necessary.

If you want to use Docker Compose, follow these commands:

- `docker compose build`: Build the services defined in the `docker-compose.yml` file.
- `docker compose up`: Run the services defined in the `docker-compose.yml` file.

To stop and remove containers, networks, and volumes defined in the `docker-compose.yml` file, run:

```sh
docker-compose down
```

For more information on Docker and Docker Compose, refer to the official documentation:

- [Docker](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## License

Nest is [MIT licensed](LICENSE).

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)



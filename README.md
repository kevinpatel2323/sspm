<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://img.shields.io/badge/sponsor-opencollective-blue.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This is a NestJS monorepo containing two applications: a `user-service` and an `api-gateway`. The `user-service` provides CRUD operations for users using in-memory storage and exposes its functionality via gRPC. The `api-gateway` provides a RESTful interface to the user service, communicating with it using gRPC.

The monorepo structure includes a `libs` folder for shared code such as DTOs and Protocol Buffer definitions (`.proto` files).

## Project Structure

```
.
├── apps
│   ├── api-gateway
│   │   ├── src
│   │   │   ├── app.controller.ts
│   │   │   ├── app.module.ts
│   │   │   ├── main.ts
│   │   │   └── user
│   │   │       ├── user.controller.ts
│   │   │       └── user.module.ts
│   │   └── tsconfig.app.json
│   └── user-service
│       ├── src
│       │   ├── app.module.ts
│       │   ├── grpc.config.ts
│       │   ├── main.ts
│       │   └── user
│       │       ├── user.controller.ts
│       │       ├── user.service.ts
│       │       └── user.module.ts
│       └── tsconfig.app.json
├── libs
│   ├── dto
│   │   └── user
│   │       ├── create-user.dto.ts
│   │       ├── update-user.dto.ts
│   │       └── user-response.dto.ts
│   └── proto
│       └── user.proto
├── nest-cli.json
├── package.json
├── README.md
├── tsconfig.json
└── yarn.lock
```

## Project setup

```bash
$ npm install
```

Alternatively, if you are using Yarn:

```bash
$ yarn install
```

This will install dependencies for the entire monorepo.

## Compile and run the project

To run the applications, you need to start the user service first, as the API gateway depends on it.

```bash
# Start the user service (gRPC server) in development mode
$ npm run start:dev user-service

# In a new terminal, start the API gateway (REST server)
$ npm run start:dev api-gateway
```

Alternatively, if you are using Yarn:

```bash
# Start the user service (gRPC server) in development mode
$ yarn start:dev user-service

# In a new terminal, start the API gateway (REST server)
$ yarn start:dev api-gateway
```

The user service will listen on `localhost:5000` for gRPC requests, and the API gateway will listen on `localhost:3000` for REST requests.

## API Endpoints

The API gateway exposes the following REST endpoints for user management:

- `POST /users`: Create a new user. Expects a JSON body with `email` and `name`.
- `GET /users`: Get all users.
- `GET /users/:id`: Get a user by ID.
- `PATCH /users/:id`: Update a user by ID. Expects a JSON body with fields to update (`email` or `name`).
- `DELETE /users/:id`: Delete a user by ID.

## Example Usage (using curl)

```bash
# Create a user
$ curl -X POST -H "Content-Type: application/json" -d '{"email":"test@example.com", "name":"Test User"}' http://localhost:3000/users

# Get all users
$ curl http://localhost:3000/users

# Get a user by ID (replace <id> with the actual user ID from the creation response)
$ curl http://localhost:3000/users/<id>

# Update a user by ID (replace <id> and provide update fields)
$ curl -X PATCH -H "Content-Type: application/json" -d '{"name":"Updated User"}' http://localhost:3000/users/<id>

# Delete a user by ID (replace <id>)
$ curl -X DELETE http://localhost:3000/users/<id>
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

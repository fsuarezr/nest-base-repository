<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# NestJS Base Template Project

## Getting Started 🚀
Hey developers! 👋

This template is your launchpad for building awesome NestJS applications. It provides a clean foundation with core and service modules already separated, ready for your customization.

### What's included?

- Solid foundation: Separate core and service modules for cleaner code organization.
- Database options: Pre-configured setups for MongoDB and PostgreSQL/MySQL (pick your poison!).
- `.env` support: Easily manage environment variables for secrets and configuration.

***
### Prerequisites 📋
   ```
   1) Make sure you have Node.JS installed.
   2) Make sure you have Nest CLI installed.
   3) Grab your favorite code editor or IDE.
```

***
### Installation 🔧

1. Clone the repository:
```
https://github.com/fsuarezr/nest-base-repository.git
```

2. Install dependencies:
```
npm i
```

3. Environment setup:
  * Create a .env file in the project root and refer to .env.template for guidance.
  * Install the database package based on your choice:
    * **MongoDB**: ```npm install @nestjs/mongoose```
    * **PostgreSQL/MySQL/Others**: ```npm install @nestjs/typeorm```
    > (Optional) For databases requiring SSL, you'll need to upload your `*.crt` file to a folder within the project root and specify that path within the `DB_CERTIFICATE_PATH` variable in your `.env`, and also specify that path within your .gitignore.

**Optionally, for unused modules:** Remove references from the `./core/core.module.ts` file if you don't plan on using any of the pre-configured database modules.

***
### Running the project: 🧑‍💻
To start the server in development mode, run:
```
npm run start:dev
```

To start the server in debug mode, run:
```
npm run start:debug
```

To start the server in production mode, run:
```
npm run start:prod
```

***
## Contributions
The community is invited to participate in the project development.

***
## Roadmap 📝
The project is continuously developing, with plans for the following improvements:

* Integration with Redis for cache management.
* Integration with RabbitMQ for queue management.
* Base implementation for JWT authentication.

***
## Author ✒️

* **Franz Suárez** - *Backend Developer* - [fsuarezr](https://github.com/fsuarezr)

🧑‍💻 Made with ❤️ by [fsuarezr](https://github.com/fsuarezr) 🤘  I hope you find it useful. 🤓🤘

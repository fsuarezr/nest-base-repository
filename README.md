<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# NestJS Base Template Project

## Getting Started 🚀
Hey developers! 👋

This template is your launchpad for building awesome NestJS applications. It provides a clean foundation with core and service modules already separated, ready for your customization.

### What's included?

- **Solid foundation**: Separate core and service modules for cleaner code organization.
- **Database options**: Pre-configured setups for MongoDB and PostgreSQL/MySQL (pick your poison!).
- **`.env` support**: Easily manage environment variables for secrets and configuration.
- **JWT Authentication**: Secure user sessions with configurable token expiration, route protection, and session management endpoints.
- **Standardized Responses**: Consistent response format with success, data, and error handling for all endpoints.

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
   * Create a `.env` file in the project root and refer to `.env.template` for guidance.
   * Install the database package based on your choice:
     * **MongoDB**: ```npm install @nestjs/mongoose```
     * **PostgreSQL/MySQL/Others**: ```npm install @nestjs/typeorm```
     > (Optional) For databases requiring SSL, upload your `*.crt` file to a folder within the project root, specify that path within the `DB_CERTIFICATE_PATH` variable in your `.env`, and add the path to your `.gitignore`.

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
## Key Features

### 1. **JWT Authentication Module**
   - **Endpoints**:
     - `POST /register`: Registers a new user, returning user data (excluding password) with a signed JWT.
     - `POST /login`: Authenticates user with email and password, returning user email, ID, and JWT token.
     - `GET /check-status`: Verifies JWT to maintain active session without re-login.
   
   - **Token Configuration**: JWT token expiration time is configurable via `.env`, allowing for tailored session durations.

### 2. **EntityServiceProvider for Standardized CRUD**
   - **Generic CRUD Service**: `EntityServiceProvider` simplifies CRUD operations for all entities, reducing redundancy and enhancing consistency.
   - **Common Columns**: `CommonEntity` provides standard columns like `id`, `is_active`, `created_at`, and `updated_at` for all entities.
  
### 3. **Standardized Response Format**
   - **Consistent Responses**: All endpoint responses follow a standardized format `{ success, data, error }`, ensuring a uniform structure across the application.
   - **Response Details**:
     - When `success` is `true`, the response returns the requested data according to the request type.
     - When `success` is `false`, the response provides an appropriate HTTP code and a descriptive error message, depending on the type of error encountered, including specific cases like JWT errors (401 or 403).

***
## Contributions
The community is invited to participate in the project development.

***
## Roadmap 📝
The project is continuously developing, with plans for the following improvements:

* Integration with Redis for cache management.
* Integration with RabbitMQ for queue management.

***
## Author ✒️

* **Franz Suárez** - *Backend Developer* - [fsuarezr](https://github.com/fsuarezr)

🧑‍💻 Made with ❤️ by [fsuarezr](https://github.com/fsuarezr) 🤘  I hope you find it useful. 🤓🤘

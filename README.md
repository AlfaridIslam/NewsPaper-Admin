# Aabha Admin Backend

This project is a backend for the admin of a newspaper blog. It provides various APIs to manage articles, users, and other administrative tasks.

## API Endpoints

### Blog Management
- **POST [/api/sections](http://localhost:3000/api/sections)** - Create all six sections
- **GET [/api/sections/:section](http://localhost:3000/api/sections/section2)** - Get a particular section
- **PATCH /api/sections/:section (http://localhost:3000/api/sections/section3)** - Updates details of a specific section
- **PUT /api/sections/:section (http://localhost:3000/api/sections/section3)** - Update a specific section
- **DELETE /api/sections/:section (http://localhost:3000/api/sections/section4)** - Delete a specific section
- **GET /api/search/:query (http://localhost:3000/api/search/sto)** - Search for a specific word or letter in the entire blog (sections)

### Admin Login Management
- **POST /api/admin/register** - [Create a new admin](http://localhost:3000/api/admin/register)
- **POST /api/admin/login** - [Authentication and authorization of admin](http://localhost:3000/api/admin/login)
- **POST /api/forgot-password/send-otp** - [Send OTP using Nodemailer to change password](http://localhost:3000/api/forgot-password/send-otp)
- **POST /api/forgot-password/verify-otp** - [Verify OTP](http://localhost:3000/api/forgot-password/verify-otp)
- **POST /api/forgot-password/reset-password** - [Update new password](http://localhost:3000/api/forgot-password/reset-password)

## Steps to Create the Backend

1. **Initialize the Project**
    - Created a new Node.js project using `npm init`.
    - Set up the project structure with folders for routes, controllers, models, and middleware.

2. **Set Up Express**
    - Installed Express.js using `npm install express`.
    - Created an Express server and set up basic routing.

3. **Database Integration**
    - Installed and configured MongoDB using `npm install mongoose`.
    - Created Mongoose models for users and articles.

4. **API Development**
    - Created RESTful API endpoints for user and article management.
    - Implemented controllers to handle the business logic.

5. **Security Measures**
    - Implemented JWT authentication for secure API access using `npm install jsonwebtoken`.
    - Used bcrypt for password hashing using `npm install bcrypt`.
    - Set up CORS to allow requests from specific origins using `npm install cors`.
    - Validated input data using `npm install express-validator`.

6. **Dependencies Used**
    - `express` - Web framework for Node.js
    - `mongoose` - MongoDB object modeling tool
    - `jsonwebtoken` - For JWT authentication
    - `bcrypt` - For password hashing
    - `cors` - For enabling CORS
    - `express-validator` - For input validation
    - `nodemailer` - For sending emails

## Security Measures

- **Authentication**: Implemented JWT-based authentication to ensure that only authorized users can access the APIs.
- **Password Hashing**: Used bcrypt to hash passwords before storing them in the database.
- **CORS**: Configured CORS to restrict access to the APIs from specific origins.
- **Input Validation**: Used express-validator to validate and sanitize input data to prevent SQL injection and other attacks.

## How to Run the Project

1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Set up environment variables for database connection and JWT secret.
4. Start the server using `npm run build` followed by `npm run dev`.

## Project Structure

src/
├── config/
│   ├── email.config.ts         # Email configuration
│   ├── database.config.ts      # Database configuration
│   └── jwt.config.ts           # JWT configuration
│
├── controllers/
│   ├── admin/
│   │   ├── auth.controller.ts  # Login, register, refresh token
│   │   ├── profile.controller.ts # Profile management
│   │   └── password.controller.ts # Password reset, change
│   ├── news/
│   │   └── section.controller.ts
│   └── search/
│       └── search.controller.ts
│
├── middleware/
│   ├── auth/
│   │   ├── jwt.middleware.ts   # JWT validation
│   │   └── role.middleware.ts  # Role-based access control
│   ├── validation/
│   │   ├── admin.validator.ts
│   │   ├── section.validator.ts
│   │   └── search.validator.ts
│   └── error.middleware.ts     # Global error handling
│
├── models/
│   ├── admin.model.ts
│   ├── section.model.ts
│   └── index.ts               # Export all models
│
├── routes/
│   ├── v1/                    # API version 1
│   │   ├── admin.routes.ts
│   │   ├── section.routes.ts
│   │   ├── search.routes.ts
│   │   └── index.ts          # Combine all routes
│   └── index.ts              # Route version management
│
├── services/                  # Business logic layer
│   ├── admin/
│   │   ├── auth.service.ts
│   │   └── email.service.ts
│   ├── news/
│   │   └── section.service.ts
│   └── search/
│       └── search.service.ts
│
├── types/
│   ├── models/               # Model interfaces
│   │   ├── admin.types.ts
│   │   └── section.types.ts
│   ├── requests/            # Request/Response interfaces
│   │   ├── admin.requests.ts
│   │   └── section.requests.ts
│   └── index.ts
│
├── utils/                    # Utility functions
│   ├── logger.ts
│   ├── validators.ts
│   └── helpers.ts
│
└── app.ts                    # Application entry point



tsconfig.json
```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "lib": ["es2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": "./src",
    "paths": {
      "@/*": ["*"],
      "@config/*": ["config/*"],
      "@controllers/*": ["controllers/*"],
      "@middleware/*": ["middleware/*"],
      "@models/*": ["models/*"],
      "@routes/*": ["routes/*"],
      "@services/*": ["services/*"],
      "@types/*": ["types/*"],
      "@utils/*": ["utils/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

package.json
```json
{
  "name": "your-project-name",
  "version": "1.0.0",
  "scripts": {
    "start": "node dist/app.js",
    "dev": "nodemon src/app.ts",
    "build": "tsc",
    "lint": "eslint . --ext .ts",
    "test": "jest"
  },
  "dependencies": {
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "express-validator": "^7.0.1",
    "helmet": "^7.1.0",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.0.3",
    "nodemailer": "^6.9.7",
    "winston": "^3.11.0"
  },
  "devDependencies": {
    "@types/bcrypt": "^5.0.2",
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/jest": "^29.5.11",
    "@types/jsonwebtoken": "^9.0.5",
    "@types/node": "^20.10.4",
    "@types/nodemailer": "^6.4.14",
    "@typescript-eslint/eslint-plugin": "^6.13.2",
    "@typescript-eslint/parser": "^6.13.2",
    "eslint": "^8.55.0",
    "jest": "^29.7.0",
    "nodemon": "^3.0.2",
    "ts-jest": "^29.1.1",
    "ts-node": "^10.9.1",
    "typescript": "^5.3.3"
  }
}
```

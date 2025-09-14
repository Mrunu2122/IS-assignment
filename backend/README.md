# Notes App - Backend

This is the backend for the Notes App, built with Node.js, Express, TypeScript, and Prisma. It provides a RESTful API for the frontend to interact with the database and handle user authentication.

## Features

- User authentication (register, login, logout)
- JWT-based authentication
- CRUD operations for notes
- Input validation
- Error handling
- CORS support
- Environment-based configuration
- TypeScript support
- Prisma ORM for database operations
- SQLite database (for development)

## Prerequisites

- Node.js (v16 or later)
- npm or yarn
- SQLite (for development) or PostgreSQL (for production)

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up the environment variables:
   - Copy `.env.example` to `.env`
   - Update the environment variables as needed

4. Run database migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

6. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

The server will start on `http://localhost:5000` by default.

## Project Structure

```
backend/
├── prisma/             # Prisma schema and migrations
├── src/
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Express middleware
│   ├── routes/         # API routes
│   ├── lib/            # Utility functions
│   └── index.ts        # Application entry point
├── .env.example       # Example environment variables
├── package.json       # Project dependencies
├── tsconfig.json      # TypeScript configuration
└── prisma/schema.prisma  # Database schema
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user (invalidate token)
- `GET /api/auth/me` - Get current user profile

### Notes

- `GET /api/notes` - Get all notes for the authenticated user
- `POST /api/notes` - Create a new note
- `GET /api/notes/:id` - Get a specific note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
DATABASE_URL="file:./dev.db"
```

For production, use a PostgreSQL database:

```
DATABASE_URL="postgresql://user:password@localhost:5432/notes_app?schema=public"
```

## Available Scripts

- `npm run dev` - Start the development server with hot-reload
- `npm run build` - Build the application
- `npm start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run migrate` - Run database migrations
- `npm run generate` - Generate Prisma client

## Database

This project uses Prisma as the ORM. The database schema is defined in `prisma/schema.prisma`.

### Migrations

To create a new migration after changing the schema:

```bash
npx prisma migrate dev --name your_migration_name
```

### Prisma Studio

To view and edit the database in a GUI:

```bash
npx prisma studio
```

## Testing

To run tests:

```bash
npm test
```

## Deployment

### Prerequisites

- Node.js (v16 or later)
- PostgreSQL database
- PM2 (for process management in production)

### Steps

1. Build the application:
   ```bash
   npm run build
   ```

2. Set up environment variables in production:
   ```bash
   cp .env.example .env
   # Edit .env with production values
   ```

3. Install PM2 globally:
   ```bash
   npm install -g pm2
   ```

4. Start the application with PM2:
   ```bash
   pm2 start dist/index.js --name notes-app
   ```

5. Save the PM2 process list:
   ```bash
   pm2 save
   ```

6. Set up PM2 to start on system boot:
   ```bash
   pm2 startup
   ```

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

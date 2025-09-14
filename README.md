# Notes App with Authentication

A full-stack notes application with user authentication built with Next.js, TypeScript, Node.js, Express, and Prisma.

## Features

- User authentication (signup, login, logout)
- Create, read, update, and delete notes
- Responsive design with Material-UI
- Type-safe with TypeScript
- SQLite database with Prisma ORM
- JWT authentication

## Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Git

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

4. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRES_IN=7d
   DATABASE_URL="file:./dev.db"
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. In a new terminal, navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the frontend directory:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
.
├── backend/                 # Backend server
│   ├── prisma/             # Prisma schema and migrations
│   ├── src/                # Source files
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Express middleware
│   │   ├── routes/         # API routes
│   │   ├── lib/            # Utility functions
│   │   └── index.ts        # Application entry point
│   ├── .env                # Environment variables
│   └── package.json        # Backend dependencies
│
└── frontend/               # Frontend Next.js app
    ├── public/             # Static files
    ├── src/
    │   ├── app/            # Next.js app router
    │   ├── components/     # Reusable components
    │   ├── contexts/       # React contexts
    │   ├── services/       # API services
    │   └── utils/          # Utility functions
    ├── .env.local          # Frontend environment variables
    └── package.json        # Frontend dependencies
```

## Available Scripts

### Backend

- `npm run dev` - Start the development server
- `npm run build` - Build the application
- `npm start` - Start the production server
- `npm run migrate` - Run database migrations
- `npm run generate` - Generate Prisma client

### Frontend

- `npm run dev` - Start the development server
- `npm run build` - Build the application
- `npm start` - Start the production server
- `npm run lint` - Run ESLint

## Technologies Used

- **Frontend**:
  - Next.js 14
  - TypeScript
  - Material-UI
  - React Query
  - Formik & Yup for form handling

- **Backend**:
  - Node.js
  - Express
  - TypeScript
  - Prisma ORM
  - SQLite (for development)
  - JWT for authentication

## License

This project is open source and available under the [MIT License](LICENSE).

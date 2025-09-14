# Notes App - Frontend

This is the frontend for the Notes App, a full-stack application built with Next.js, TypeScript, and Material-UI. The frontend communicates with a Node.js/Express backend to provide a seamless note-taking experience with user authentication.

## Features

- User authentication (login/register)
- Create, read, update, and delete notes
- Responsive design with Material-UI
- Client-side form validation
- Protected routes
- Dark/light theme support

## Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Backend server running (see backend README for setup)

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add the following environment variables:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure

```
frontend/
├── public/             # Static files
├── src/
│   ├── app/            # Next.js app router
│   ├── components/     # Reusable components
│   ├── contexts/       # React contexts
│   ├── services/       # API services
│   └── utils/          # Utility functions
├── .eslintrc.json      # ESLint configuration
├── .gitignore          # Git ignore file
├── next.config.js      # Next.js configuration
├── package.json        # Project dependencies
└── tsconfig.json      # TypeScript configuration
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## Dependencies

- Next.js 14
- React 18
- TypeScript
- Material-UI (MUI)
- Axios
- Formik & Yup (form handling)
- React Query (data fetching)
- JWT-decode (JWT token handling)

## Environment Variables

- `NEXT_PUBLIC_API_URL` - The base URL of the backend API

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

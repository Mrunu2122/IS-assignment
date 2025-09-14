import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { AppError, globalErrorHandler } from './middleware/error.middleware';
import authRouter from './routes/auth.routes';
import notesRouter from './routes/notes.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/notes', notesRouter);

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Handle unhandled routes - using a valid path pattern
app.use((req, _res, next) => {
  next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
});

// Global error handler
app.use(globalErrorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

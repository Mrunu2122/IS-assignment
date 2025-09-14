import { Router } from 'express';
import * as notesController from '../controllers/notes.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

// Protect all routes after this middleware
router.use(protect);

router
  .route('/')
  .get(notesController.getNotes)
  .post(notesController.createNote);

router
  .route('/:id')
  .get(notesController.getNote)
  .patch(notesController.updateNote)
  .delete(notesController.deleteNote);

export default router;

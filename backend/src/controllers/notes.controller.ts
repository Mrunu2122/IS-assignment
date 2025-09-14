import { Request, Response, NextFunction } from 'express';
import { AppError } from '../middleware/error.middleware';
import prisma from '../lib/prisma';

export const createNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;

    const note = await prisma.note.create({
      data: {
        title,
        content,
        userId,
      },
    });

    res.status(201).json({
      status: 'success',
      data: {
        note,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;

    const notes = await prisma.note.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(200).json({
      status: 'success',
      results: notes.length,
      data: {
        notes,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const note = await prisma.note.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!note) {
      return next(new AppError('No note found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        note,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.user.id;

    const note = await prisma.note.updateMany({
      where: {
        id,
        userId,
      },
      data: {
        title,
        content,
      },
    });

    if (note.count === 0) {
      return next(new AppError('No note found with that ID', 404));
    }

    const updatedNote = await prisma.note.findUnique({
      where: { id },
    });

    res.status(200).json({
      status: 'success',
      data: {
        note: updatedNote,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const note = await prisma.note.deleteMany({
      where: {
        id,
        userId,
      },
    });

    if (note.count === 0) {
      return next(new AppError('No note found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

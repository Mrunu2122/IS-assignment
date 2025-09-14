import api from '@/lib/api';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const getNotes = async (): Promise<Note[]> => {
  const response = await api.get('/v1/notes');
  return response.data.data.notes;
};

export const getNote = async (id: string): Promise<Note> => {
  const response = await api.get(`/v1/notes/${id}`);
  return response.data.data.note;
};

export const createNote = async (data: { title: string; content: string }): Promise<Note> => {
  const response = await api.post('/v1/notes', data);
  return response.data.data.note;
};

export const updateNote = async (
  id: string,
  data: { title: string; content: string }
): Promise<Note> => {
  const response = await api.patch(`/v1/notes/${id}`, data);
  return response.data.data.note;
};

export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/v1/notes/${id}`);
};

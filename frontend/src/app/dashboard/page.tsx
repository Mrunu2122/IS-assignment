'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getNotes, Note, createNote, updateNote, deleteNote } from '@/services/notes.service';
import { Box, Button, Container, Typography, Card, CardContent, CardActions, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function DashboardPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    fetchNotes();
  }, [isAuthenticated, router]);

  const fetchNotes = async () => {
    try {
      const notesData = await getNotes();
      setNotes(notesData);
    } catch (error) {
      console.error('Failed to fetch notes', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (note: Note | null = null) => {
    if (note) {
      setCurrentNote(note);
      setTitle(note.title);
      setContent(note.content || '');
    } else {
      setCurrentNote(null);
      setTitle('');
      setContent('');
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentNote(null);
    setTitle('');
    setContent('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentNote) {
        // Update existing note
        await updateNote(currentNote.id, { title, content });
      } else {
        // Create new note
        await createNote({ title, content });
      }
      handleClose();
      fetchNotes();
    } catch (error) {
      console.error('Failed to save note', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(id);
        fetchNotes();
      } catch (error) {
        console.error('Failed to delete note', error);
      }
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading your notes..." />;
  }

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 4 }}>
        <Typography variant="h4">My Notes</Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => handleOpen()}
            sx={{ mr: 2 }}
          >
            Add Note
          </Button>
          <Button variant="outlined" color="error" onClick={logout}>
            Logout
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3, mt: 4 }}>
        {notes.map((note) => (
          <Card key={note.id}>
            <CardContent>
              <Typography variant="h6" component="div">
                {note.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, minHeight: '60px' }}>
                {note.content || 'No content'}
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 2 }}>
                Last updated: {new Date(note.updatedAt).toLocaleString()}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton size="small" onClick={() => handleOpen(note)}>
                <Edit fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={() => handleDelete(note.id)}>
                <Delete fontSize="small" color="error" />
              </IconButton>
            </CardActions>
          </Card>
        ))}

        {notes.length === 0 && (
          <Typography variant="body1" color="text.secondary" sx={{ mt: 4, textAlign: 'center', gridColumn: '1 / -1' }}>
            No notes yet. Click "Add Note" to create your first note!
          </Typography>
        )}
      </Box>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>{currentNote ? 'Edit Note' : 'Add New Note'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              type="text"
              fullWidth
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              id="content"
              label="Content"
              type="text"
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              {currentNote ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
}

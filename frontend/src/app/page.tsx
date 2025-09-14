'use client';

import { useEffect } from 'react';
import { Box, Button, CircularProgress, Container, Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const theme = useTheme();
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  // No more automatic redirection to dashboard
  // Show loading state only while checking initial auth state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  // If not authenticated, show the home page
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: theme.palette.background.default,
      }}
    >
      <Container maxWidth="lg" sx={{ py: 8, flex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '70vh',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 'bold',
              mb: 3,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Welcome to Notes App
          </Typography>
          
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4, maxWidth: '700px' }}>
            A simple and secure way to organize your thoughts, ideas, and important information.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
            <Button
              component={Link}
              href="/login"
              variant="contained"
              size="large"
              color="primary"
            >
              Sign In
            </Button>
            <Button
              component={Link}
              href="/register"
              variant="outlined"
              size="large"
              color="primary"
            >
              Create Account
            </Button>
          </Box>

          <Box sx={{ mt: 8, display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4, width: '100%' }}>
            {[
              {
                title: 'Secure',
                description: 'Your notes are encrypted and secure with JWT authentication.',
              },
              {
                title: 'Accessible',
                description: 'Access your notes from anywhere, anytime, on any device.',
              },
              {
                title: 'Simple',
                description: 'Clean and intuitive interface for a seamless experience.',
              },
            ].map((feature, index) => (
              <Box
                key={index}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  boxShadow: 1,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3,
                  },
                }}
              >
                <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: theme.palette.mode === 'light' ? 'grey.100' : 'grey.900',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Notes App. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

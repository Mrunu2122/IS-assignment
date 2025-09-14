'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { login } from '@/services/auth.service';
import { 
  Box, 
  Button, 
  Container, 
  TextField, 
  Typography, 
  Link as MuiLink, 
  Paper, 
  InputAdornment,
  IconButton,
  Divider,
  Fade
} from '@mui/material';
import Link from 'next/link';
import { Visibility, VisibilityOff, Login as LoginIcon } from '@mui/icons-material';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login: authLogin } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setError('');
    setLoading(true);

    try {
      const response = await login({ email, password });
      // Pass both token and user data to authLogin
      authLogin(response.token, response.data.user);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        py: 4,
      }}
    >
      <Container component="main" maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: { xs: 3, md: 6 },
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 4,
            }}
          >
            <Box sx={{ mb: 2 }}>
              <Image 
                src="/logo.svg" 
                alt="Logo" 
                width={60} 
                height={60} 
                style={{ borderRadius: '50%' }}
              />
            </Box>
            <Typography component="h1" variant="h4" fontWeight="bold" color="primary">
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Sign in to access your account
            </Typography>
          </Box>

          <Fade in={!!error}>
            <Box 
              sx={{
                bgcolor: 'error.light',
                color: 'error.contrastText',
                p: 2,
                borderRadius: 1,
                mb: 3,
                display: error ? 'flex' : 'none',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Typography variant="body2">{error}</Typography>
            </Box>
          </Fade>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{
                style: { borderRadius: 12 },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                style: { borderRadius: 12 },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
              <MuiLink 
                component={Link} 
                href="/forgot-password" 
                variant="body2"
                sx={{ textDecoration: 'none', color: 'primary.main' }}
              >
                Forgot password?
              </MuiLink>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              startIcon={<LoginIcon />}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                borderRadius: 3,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(25, 118, 210, 0.4)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <MuiLink 
                  component={Link} 
                  href="/register" 
                  sx={{ 
                    color: 'primary.main',
                    textDecoration: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Sign Up
                </MuiLink>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

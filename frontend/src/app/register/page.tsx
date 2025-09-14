'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { register } from '@/services/auth.service';
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
  Fade,
  Card,
  CardContent
} from '@mui/material';
import Link from 'next/link';
import { Visibility, VisibilityOff, PersonAdd as PersonAddIcon, CheckCircle } from '@mui/icons-material';

type PlanType = 'FREE' | 'PRO';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [plan, setPlan] = useState<PlanType>('FREE');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login: authLogin } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (!name || !email) {
      setError('Please fill in all required fields');
      return;
    }
    
    setError('');
    setLoading(true);

    setError('');
    setLoading(true);

    try {
      const response = await register({ name, email, password, plan });
      // Pass both token and user data to authLogin
      authLogin(response.token, response.data.user);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const plans = [
    {
      id: 'FREE',
      name: 'Free Plan',
      price: '$0',
      description: 'Perfect for getting started',
      features: [
        'Create up to 3 notes',
        'Basic note formatting',
        'Access to basic features'
      ]
    },
    {
      id: 'PRO',
      name: 'Pro Plan',
      price: '$9.99',
      description: 'Best for power users',
      features: [
        'Unlimited notes',
        'Advanced formatting options',
        'Priority support',
        'Cloud sync across devices'
      ]
    }
  ];

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
      <Container component="main" maxWidth="md">
        <Paper
          elevation={6}
          sx={{
            p: { xs: 3, md: 6 },
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.95)',
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
            <Typography component="h1" variant="h4" fontWeight="bold" color="primary">
              Create Your Account
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Join us today and boost your productivity
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

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Select Your Plan
              </Typography>
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 3 }}>
                {plans.map((p) => (
                  <Card
                    key={p.id}
                    variant="outlined"
                    onClick={() => setPlan(p.id as PlanType)}
                    sx={{
                      flex: 1,
                      minWidth: 250,
                      borderColor: plan === p.id ? 'primary.main' : 'divider',
                      borderWidth: plan === p.id ? 2 : 1,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 3,
                      },
                    }}
                  >
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="h6" component="div">
                          {p.name}
                        </Typography>
                        {plan === p.id && <CheckCircle color="primary" />}
                      </Box>
                      <Typography variant="h5" color="primary" gutterBottom>
                        {p.price}
                        {p.id === 'PRO' && (
                          <Typography component="span" variant="body2" color="text.secondary">
                            /month
                          </Typography>
                        )}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {p.description}
                      </Typography>
                      <Box component="ul" sx={{ pl: 2, mt: 2, mb: 0 }}>
                        {p.features.map((feature, i) => (
                          <Typography 
                            key={i} 
                            component="li" 
                            variant="body2"
                            sx={{ 
                              display: 'flex', 
                              alignItems: 'center',
                              mb: 0.5,
                              '&:before': {
                                content: '"✓"',
                                color: 'success.main',
                                mr: 1,
                                fontWeight: 'bold',
                              }
                            }}
                          >
                            {feature}
                          </Typography>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>

            <Typography variant="h6" gutterBottom>
              Account Information
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
              <TextField
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputProps={{
                  style: { borderRadius: 12 },
                }}
              />
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  style: { borderRadius: 12 },
                }}
              />
              <TextField
                required
                fullWidth
                name="password"
                label="Password (min 6 characters)"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
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
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              startIcon={<PersonAddIcon />}
              sx={{
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
                mt: 2,
              }}
            >
              {loading ? 'Creating Account...' : `Sign Up for ${plan === 'PRO' ? 'Pro Plan' : 'Free'}`}
            </Button>

            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <MuiLink 
                  component={Link} 
                  href="/login" 
                  sx={{ 
                    color: 'primary.main',
                    textDecoration: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Sign In
                </MuiLink>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

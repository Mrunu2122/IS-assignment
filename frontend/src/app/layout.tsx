'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { isAuthenticated } from '@/utils/auth';
import './globals.css';

// Using Inter as a reliable fallback font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'var(--font-inter), Arial, sans-serif',
  },
});

// AuthHandler component - removed automatic redirections
function AuthHandler({ children }: { children: React.ReactNode }) {
  // No more automatic redirections
  return <>{children}</>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <AuthHandler>
              {children}
            </AuthHandler>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

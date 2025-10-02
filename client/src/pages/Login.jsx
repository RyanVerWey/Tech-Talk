import React from 'react';
import { Typography, Container, Paper, Button, Box } from '@mui/material';
import { Google } from '@mui/icons-material';

const Login = () => {
  const handleGoogleLogin = () => {
    // Redirect to Google OAuth endpoint
    window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/google`;
  };

  return (
    <Container maxWidth="sm">
      <Paper className="p-8 text-center mt-16">
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome Back
        </Typography>
        <Typography variant="body1" color="text.secondary" className="mb-6">
          Sign in to access your Tech Talk Alumni Network account
        </Typography>

        <Box className="space-y-4">
          <Button
            variant="contained"
            size="large"
            startIcon={<Google />}
            onClick={handleGoogleLogin}
            className="w-full bg-red-600 hover:bg-red-700 py-3"
          >
            Continue with Google
          </Button>
        </Box>

        <Typography variant="body2" color="text.secondary" className="mt-6">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
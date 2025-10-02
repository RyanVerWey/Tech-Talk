import React from 'react';
import { Button, CircularProgress, Box } from '@mui/material';

const LoadingButton = ({ 
  loading = false, 
  children, 
  disabled = false,
  loadingText = 'Loading...',
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  className = '',
  ...props 
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      disabled={disabled || loading}
      className={`relative ${className}`}
      {...props}
    >
      {loading ? (
        <Box className="flex items-center space-x-2">
          <CircularProgress size={20} color="inherit" />
          <span>{loadingText}</span>
        </Box>
      ) : (
        children
      )}
    </Button>
  );
};

export default LoadingButton;
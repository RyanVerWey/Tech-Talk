import React from 'react';
import { Alert, AlertTitle, Snackbar, Box } from '@mui/material';
import { CheckCircle, Error, Warning, Info } from '@mui/icons-material';

const NotificationBar = ({ 
  open = false,
  onClose,
  type = 'info', // 'success', 'error', 'warning', 'info'
  title,
  message,
  autoHideDuration = 6000,
  className = ''
}) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle />;
      case 'error':
        return <Error />;
      case 'warning':
        return <Warning />;
      default:
        return <Info />;
    }
  };

  const getSeverity = () => {
    return type === 'error' ? 'error' : 
           type === 'warning' ? 'warning' : 
           type === 'success' ? 'success' : 'info';
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      className={className}
    >
      <Alert
        onClose={onClose}
        severity={getSeverity()}
        icon={getIcon()}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationBar;
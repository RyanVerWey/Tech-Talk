import React from 'react';
import { Button } from '@mui/material';
import { Warning } from '@mui/icons-material';
import Modal from './Modal';
import LoadingButton from '../UI/LoadingButton';

const ConfirmDialog = ({
  open = false,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmColor = 'primary',
  variant = 'default', // 'default', 'danger'
  loading = false,
  maxWidth = 'xs'
}) => {
  const isDanger = variant === 'danger';
  
  const actions = (
    <>
      <Button 
        onClick={onClose} 
        disabled={loading}
        color="inherit"
        variant="outlined"
      >
        {cancelText}
      </Button>
      <LoadingButton
        onClick={onConfirm}
        loading={loading}
        color={isDanger ? 'error' : confirmColor}
        variant="contained"
        className={isDanger ? 'bg-red-600 hover:bg-red-700' : ''}
      >
        {confirmText}
      </LoadingButton>
    </>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      actions={actions}
      maxWidth={maxWidth}
      disableBackdropClick={loading}
      showCloseButton={!loading}
    >
      <div className="flex items-start space-x-3">
        {isDanger && (
          <Warning className="text-red-500 mt-1" fontSize="large" />
        )}
        <div className="flex-1">
          <p className="text-gray-700">{message}</p>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
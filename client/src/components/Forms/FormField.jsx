import React from 'react';
import { TextField, FormControl, FormHelperText } from '@mui/material';

const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  helperText,
  required = false,
  disabled = false,
  multiline = false,
  rows = 4,
  placeholder,
  variant = 'outlined',
  fullWidth = true,
  className = '',
  ...props
}) => {
  const hasError = Boolean(error);

  return (
    <FormControl fullWidth={fullWidth} error={hasError} className={className}>
      <TextField
        label={label}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={hasError}
        helperText={error || helperText}
        required={required}
        disabled={disabled}
        multiline={multiline}
        rows={multiline ? rows : undefined}
        placeholder={placeholder}
        variant={variant}
        fullWidth={fullWidth}
        {...props}
      />
    </FormControl>
  );
};

export default FormField;
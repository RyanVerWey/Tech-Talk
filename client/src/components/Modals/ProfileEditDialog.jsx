import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Grid,
  Avatar,
  Typography,
  Alert,
  CircularProgress
} from '@mui/material';
import { GitHub, LinkedIn, Launch, Save, Cancel } from '@mui/icons-material';
import { useAuth } from '../../contexts';
import axios from 'axios';

const ProfileEditDialog = ({ open, onClose, user, onProfileUpdate }) => {
  const { user: currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    graduationYear: '',
    degree: '',
    company: '',
    city: '',
    socialLinks: {
      portfolio: '',
      github: '',
      linkedin: ''
    }
  });

  // Initialize form data when dialog opens
  useEffect(() => {
    if (open && user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        graduationYear: user.graduationYear || '',
        degree: user.degree || '',
        company: user.company || '',
        city: user.location?.city || '',
        socialLinks: {
          portfolio: user.socialLinks?.portfolio || '',
          github: user.socialLinks?.github || '',
          linkedin: user.socialLinks?.linkedin || ''
        }
      });
      setError('');
      setSuccess('');
    }
  }, [open, user]);

  const handleInputChange = (field, value) => {
    if (field.startsWith('socialLinks.')) {
      const socialField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const validateForm = () => {
    const errors = [];
    
    if (!formData.firstName.trim()) errors.push('First name is required');
    if (!formData.lastName.trim()) errors.push('Last name is required');
    
    // Validate URLs
    const urlFields = ['portfolio', 'github', 'linkedin'];
    urlFields.forEach(field => {
      const url = formData.socialLinks[field];
      if (url && !isValidUrl(url)) {
        errors.push(`${field} must be a valid URL starting with http:// or https://`);
      }
    });

    // Validate graduation year
    if (formData.graduationYear) {
      const year = parseInt(formData.graduationYear);
      const currentYear = new Date().getFullYear();
      if (year < 1850 || year > currentYear + 10) {
        errors.push('Please enter a valid graduation year');
      }
    }

    return errors;
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return url.startsWith('http://') || url.startsWith('https://');
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join('. '));
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.put('/api/profile', formData);
      
      if (response.data.success) {
        setSuccess('Profile updated successfully!');
        onProfileUpdate?.(response.data.data);
        
        // Close dialog after brief success message
        setTimeout(() => {
          onClose();
          setSuccess('');
        }, 1500);
      } else {
        setError(response.data.message || 'Failed to update profile');
      }
    } catch (err) {
      if (err.response?.data?.errors) {
        const errorMessages = err.response.data.errors.map(e => e.message).join('. ');
        setError(errorMessages);
      } else {
        setError(err.response?.data?.message || 'Failed to update profile');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
      setError('');
      setSuccess('');
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        className: 'bg-black border border-white/20',
        sx: {
          backgroundColor: '#000000 !important',
          backgroundImage: 'none !important'
        }
      }}
    >
      <DialogTitle className="text-white border-b border-white/10">
        <div className="flex items-center space-x-3">
          <Avatar
            src={currentUser?.avatar}
            alt={currentUser?.displayName}
            sx={{ width: 40, height: 40 }}
          />
          <div>
            <Typography variant="h6" className="text-white">
              Edit Profile
            </Typography>
            <Typography variant="body2" className="text-white/60">
              Update your information and social links
            </Typography>
          </div>
        </div>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent className="bg-gradient-to-br from-gray-900 to-gray-800">
          <Box className="space-y-6 pt-4">
            
            {/* Error/Success Messages */}
            {error && (
              <Alert severity="error" className="bg-red-900/20 border border-red-500/30 text-red-300">
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" className="bg-green-900/20 border border-green-500/30 text-green-300">
                {success}
              </Alert>
            )}

            {/* Basic Information */}
            <Box>
              <Typography variant="h6" className="text-white mb-3">
                Basic Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="First Name"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    fullWidth
                    required
                    variant="outlined"
                    className="bg-white/5"
                    InputLabelProps={{ className: 'text-white/70' }}
                    InputProps={{ 
                      className: 'text-white',
                      style: { backgroundColor: 'rgba(255,255,255,0.05)' }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Last Name"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    fullWidth
                    required
                    variant="outlined"
                    className="bg-white/5"
                    InputLabelProps={{ className: 'text-white/70' }}
                    InputProps={{ 
                      className: 'text-white',
                      style: { backgroundColor: 'rgba(255,255,255,0.05)' }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    fullWidth
                    variant="outlined"
                    placeholder="e.g. Google, Microsoft, Startup Inc."
                    className="bg-white/5"
                    InputLabelProps={{ className: 'text-white/70' }}
                    InputProps={{ 
                      className: 'text-white',
                      style: { backgroundColor: 'rgba(255,255,255,0.05)' }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="City"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    fullWidth
                    variant="outlined"
                    placeholder="e.g. San Francisco, New York, Austin"
                    className="bg-white/5"
                    InputLabelProps={{ className: 'text-white/70' }}
                    InputProps={{ 
                      className: 'text-white',
                      style: { backgroundColor: 'rgba(255,255,255,0.05)' }
                    }}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Academic Information */}
            <Box>
              <Typography variant="h6" className="text-white mb-3">
                Academic Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Graduation Year"
                    type="number"
                    value={formData.graduationYear}
                    onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                    fullWidth
                    variant="outlined"
                    className="bg-white/5"
                    InputLabelProps={{ className: 'text-white/70' }}
                    InputProps={{ 
                      className: 'text-white',
                      style: { backgroundColor: 'rgba(255,255,255,0.05)' }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Degree"
                    value={formData.degree}
                    onChange={(e) => handleInputChange('degree', e.target.value)}
                    fullWidth
                    variant="outlined"
                    placeholder="e.g. Bachelor of Science, Master of Science"
                    className="bg-white/5"
                    InputLabelProps={{ className: 'text-white/70' }}
                    InputProps={{ 
                      className: 'text-white',
                      style: { backgroundColor: 'rgba(255,255,255,0.05)' }
                    }}
                  />
                </Grid>

              </Grid>
            </Box>

            {/* Social Links */}
            <Box>
              <Typography variant="h6" className="text-white mb-3">
                Social Links
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Portfolio URL"
                    value={formData.socialLinks.portfolio}
                    onChange={(e) => handleInputChange('socialLinks.portfolio', e.target.value)}
                    fullWidth
                    variant="outlined"
                    placeholder="https://yourportfolio.com"
                    InputProps={{
                      startAdornment: <Launch className="text-purple-400 mr-2" />,
                      className: 'text-white',
                      style: { backgroundColor: 'rgba(255,255,255,0.05)' }
                    }}
                    InputLabelProps={{ className: 'text-white/70' }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="GitHub URL"
                    value={formData.socialLinks.github}
                    onChange={(e) => handleInputChange('socialLinks.github', e.target.value)}
                    fullWidth
                    variant="outlined"
                    placeholder="https://github.com/yourusername"
                    InputProps={{
                      startAdornment: <GitHub className="text-gray-400 mr-2" />,
                      className: 'text-white',
                      style: { backgroundColor: 'rgba(255,255,255,0.05)' }
                    }}
                    InputLabelProps={{ className: 'text-white/70' }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="LinkedIn URL"
                    value={formData.socialLinks.linkedin}
                    onChange={(e) => handleInputChange('socialLinks.linkedin', e.target.value)}
                    fullWidth
                    variant="outlined"
                    placeholder="https://linkedin.com/in/yourusername"
                    InputProps={{
                      startAdornment: <LinkedIn className="text-blue-400 mr-2" />,
                      className: 'text-white',
                      style: { backgroundColor: 'rgba(255,255,255,0.05)' }
                    }}
                    InputLabelProps={{ className: 'text-white/70' }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions className="bg-gradient-to-br from-gray-900 to-gray-800 border-t border-white/10 p-6">
          <Button
            onClick={handleClose}
            disabled={loading}
            className="text-white/70 hover:text-white"
            startIcon={<Cancel />}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white min-w-[120px]"
            startIcon={loading ? <CircularProgress size={20} /> : <Save />}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProfileEditDialog;
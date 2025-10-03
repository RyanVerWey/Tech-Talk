import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Container, Box, Button, Alert } from '@mui/material';
import { Add, FilterList, Refresh } from '@mui/icons-material';
import { PageTitle, ProfileCard, CardSkeleton } from '../components';
import { useAuth } from '../contexts';
import axios from 'axios';

const Profiles = () => {
  const { user: currentUser } = useAuth();
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch alumni profiles
  const fetchProfiles = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      
      // For now, we'll fetch the current user's profile as an example
      // In a real application, you'd have an endpoint like /api/users or /api/profiles
      const response = await axios.get('/api/profile');
      
      if (response.data.success) {
        // For demonstration, we'll show the current user's profile
        // In production, this would be a list of all public profiles
        setAlumni([response.data.data]);
      } else {
        setError('Failed to load alumni profiles');
      }
    } catch (err) {
      console.error('Error fetching profiles:', err);
      setError('Failed to load alumni profiles. Please try again.');
      // For development, show at least the current user
      if (currentUser) {
        setAlumni([currentUser]);
      }
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const handleProfileUpdate = (updatedProfile) => {
    setAlumni(prev => prev.map(profile => 
      profile._id === updatedProfile._id ? updatedProfile : profile
    ));
  };

  const handleProfileClick = (profile) => {
    console.log('Profile clicked:', profile);
    // TODO: Navigate to detailed profile view or open modal
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Container maxWidth="lg" className="pt-8 pb-16">
        <PageTitle
          title="Alumni Network"
          subtitle="Connect with fellow FSU Computer Science graduates"
          className="mb-12"
        />

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              className="border-white/20 text-white/80 hover:bg-white/5 hover:border-white/40"
            >
              Filter
            </Button>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={fetchProfiles}
              disabled={loading}
              className="border-white/20 text-white/80 hover:bg-white/5 hover:border-white/40"
            >
              Refresh
            </Button>
          </div>
          <Button
            variant="contained"
            startIcon={<Add />}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
          >
            Join Network
          </Button>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" className="mb-6 bg-red-900/20 border border-red-500/30 text-red-300">
            {error}
          </Alert>
        )}

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="backdrop-blur-xl bg-black/20 border border-white/10 rounded-xl p-4 text-center">
            <Typography variant="h4" className="font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {alumni.length}
            </Typography>
            <Typography variant="body2" className="text-white/60">
              Alumni Members
            </Typography>
          </div>
          <div className="backdrop-blur-xl bg-black/20 border border-white/10 rounded-xl p-4 text-center">
            <Typography variant="h4" className="font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              25
            </Typography>
            <Typography variant="body2" className="text-white/60">
              Companies
            </Typography>
          </div>
          <div className="backdrop-blur-xl bg-black/20 border border-white/10 rounded-xl p-4 text-center">
            <Typography variant="h4" className="font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              12
            </Typography>
            <Typography variant="body2" className="text-white/60">
              Cities
            </Typography>
          </div>
          <div className="backdrop-blur-xl bg-black/20 border border-white/10 rounded-xl p-4 text-center">
            <Typography variant="h4" className="font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              5
            </Typography>
            <Typography variant="body2" className="text-white/60">
              Grad Years
            </Typography>
          </div>
        </div>

        {/* Alumni Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={index} showAvatar lines={3} />
            ))
          ) : alumni.length > 0 ? (
            // Alumni profile cards
            alumni.map((alumniProfile) => (
              <ProfileCard
                key={alumniProfile._id || alumniProfile.id}
                user={alumniProfile}
                onClick={() => handleProfileClick(alumniProfile)}
                onProfileUpdate={handleProfileUpdate}
              />
            ))
          ) : (
            // No profiles found
            <div className="col-span-full text-center py-12">
              <Typography variant="h6" className="text-white/60 mb-4">
                No alumni profiles found
              </Typography>
              <Typography variant="body2" className="text-white/40">
                {error ? 'There was an error loading profiles.' : 'Be the first to join our network!'}
              </Typography>
            </div>
          )}
        </div>

        {/* Load More */}
        {alumni.length > 0 && !loading && (
          <div className="text-center mt-12">
            <Button
              variant="outlined"
              className="border-white/20 text-white/80 hover:bg-white/5 hover:border-white/40 px-8 py-2"
            >
              Load More Alumni
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Profiles;
import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Container, Box, Button, Alert } from '@mui/material';
import { Add, FilterList, Refresh } from '@mui/icons-material';
import { PageTitle, ProfileCard, CardSkeleton } from '../components';
import { useAuth } from '../contexts';
import axios from 'axios';
const Profiles = () => {
  const { user: currentUser, updateUser } = useAuth();
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [joining, setJoining] = useState(false);
  const fetchProfiles = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get('/api/profiles/all');
      if (response.data.success) {
        setAlumni(response.data.data);
      } else {
        setError('Failed to load alumni profiles');
      }
    } catch (err) {
      console.error('Error fetching profiles:', err);
      setError('Failed to load alumni profiles. Please try again.');
      setAlumni([]);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);
  const handleProfileUpdate = (updatedProfile) => {
    setAlumni(prev => prev.map(profile => 
      profile._id === updatedProfile._id ? updatedProfile : profile
    ));
  };
  const handleJoinNetwork = async () => {
    try {
      setJoining(true);
      setError('');
      const response = await axios.post('/api/profiles/join');
      if (response.data.success) {
        updateUser({ hasJoinedNetwork: true, networkJoinedAt: new Date() });
        await fetchProfiles();
      } else {
        setError(response.data.message || 'Failed to join network');
      }
    } catch (err) {
      console.error('Error joining network:', err);
      setError(err.response?.data?.message || 'Failed to join network. Please try again.');
    } finally {
      setJoining(false);
    }
  };
  const stats = {
    members: alumni.length,
    companies: new Set(alumni.filter(a => a.company).map(a => a.company)).size,
    cities: new Set(alumni.filter(a => a.location?.city).map(a => a.location.city)).size,
    graduationYears: new Set(alumni.filter(a => a.graduationYear).map(a => a.graduationYear)).size
  };
  const handleProfileClick = (profile) => {
    console.log('Profile clicked:', profile);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Container maxWidth="lg" className="pt-8 pb-16">
        <PageTitle
          title="Alumni Network"
          subtitle={`Connect with fellow Full Sail Web Development graduates • ${alumni.length} ${alumni.length === 1 ? 'Member' : 'Members'}`}
          className="mb-12"
        />
        {}
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
          {currentUser && !currentUser.hasJoinedNetwork && (
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleJoinNetwork}
              disabled={joining}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
            >
              {joining ? 'Joining...' : 'Join Network'}
            </Button>
          )}
        </div>
        {}
        {error && (
          <Alert severity="error" className="mb-6 bg-red-900/20 border border-red-500/30 text-red-300">
            {error}
          </Alert>
        )}
        {}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="backdrop-blur-xl bg-black/20 border border-white/10 rounded-xl p-4 text-center">
            <Typography variant="h4" className="font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {stats.members}
            </Typography>
            <Typography variant="body2" className="text-white/60">
              Alumni Members
            </Typography>
          </div>
          <div className="backdrop-blur-xl bg-black/20 border border-white/10 rounded-xl p-4 text-center">
            <Typography variant="h4" className="font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {stats.companies}
            </Typography>
            <Typography variant="body2" className="text-white/60">
              Companies
            </Typography>
          </div>
          <div className="backdrop-blur-xl bg-black/20 border border-white/10 rounded-xl p-4 text-center">
            <Typography variant="h4" className="font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              {stats.cities}
            </Typography>
            <Typography variant="body2" className="text-white/60">
              Cities
            </Typography>
          </div>
          <div className="backdrop-blur-xl bg-black/20 border border-white/10 rounded-xl p-4 text-center">
            <Typography variant="h4" className="font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              {stats.graduationYears}
            </Typography>
            <Typography variant="body2" className="text-white/60">
              Grad Years
            </Typography>
          </div>
        </div>
        {}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={index} showAvatar lines={3} />
            ))
          ) : alumni.length > 0 ? (
            alumni.map((alumniProfile) => (
              <ProfileCard
                key={alumniProfile._id || alumniProfile.id}
                user={alumniProfile}
                onClick={() => handleProfileClick(alumniProfile)}
                onProfileUpdate={handleProfileUpdate}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="max-w-md mx-auto">
                <Typography variant="h6" className="text-white/60 mb-4">
                  {error ? 'Error Loading Profiles' : 'No Alumni Network Members Yet'}
                </Typography>
                <Typography variant="body2" className="text-white/40 mb-6">
                  {error 
                    ? 'There was an error loading profiles. Please try refreshing the page.' 
                    : 'Be the first to join our Full Sail Web Development Alumni Network! Click "Join Network" above to get started and connect with fellow graduates.'
                  }
                </Typography>
                {!error && currentUser && !currentUser.hasJoinedNetwork && (
                  <Button
                    variant="contained"
                    onClick={handleJoinNetwork}
                    disabled={joining}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                  >
                    {joining ? 'Joining...' : 'Join Network Now'}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
        {}
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

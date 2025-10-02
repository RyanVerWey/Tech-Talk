import React, { useState, useEffect } from 'react';
import { Typography, Box, Chip } from '@mui/material';
import { CheckCircle, Error, Warning } from '@mui/icons-material';

const HealthStatus = ({ className = '' }) => {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHealthStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3002'}/api/health`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setHealth(data);
      setError(null);
    } catch (err) {
      console.error('Health check failed:', err);
      setError(err.message);
      setHealth(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealthStatus();
    // Check health every 30 seconds
    const interval = setInterval(fetchHealthStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    if (loading) return 'default';
    if (error) return 'error';
    if (health?.success && health?.database === 'connected') return 'success';
    return 'warning';
  };

  const getStatusIcon = () => {
    if (loading) return null;
    if (error) return <Error fontSize="small" />;
    if (health?.success && health?.database === 'connected') return <CheckCircle fontSize="small" />;
    return <Warning fontSize="small" />;
  };

  const getStatusText = () => {
    if (loading) return 'Checking...';
    if (error) return 'API Offline';
    if (health?.success && health?.database === 'connected') return 'All Systems Operational';
    if (health?.success) return 'API Online, DB Issues';
    return 'Unknown Status';
  };

  return (
    <Box className={`${className}`}>
      <Chip
        icon={getStatusIcon()}
        label={getStatusText()}
        color={getStatusColor()}
        variant="outlined"
        size="small"
        className="cursor-pointer"
        onClick={fetchHealthStatus}
        title={health ? `Last checked: ${new Date(health.timestamp).toLocaleTimeString()}` : 'Click to refresh'}
      />
      
      {health && !loading && (
        <Box className="mt-2 text-xs text-gray-500">
          <Typography variant="caption" display="block">
            Environment: {health.environment}
          </Typography>
          <Typography variant="caption" display="block">
            Database: {health.database}
          </Typography>
          <Typography variant="caption" display="block">
            Last check: {new Date(health.timestamp).toLocaleString()}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default HealthStatus;
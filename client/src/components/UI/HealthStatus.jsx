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
      const apiUrl = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? window.location.origin : 'http://localhost:3002');
      const response = await fetch(`${apiUrl}/api/health`);
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
    const interval = setInterval(fetchHealthStatus, 30000);
    return () => clearInterval(interval);
  }, []);
  const getStatusColor = () => {
    if (loading) return 'default';
    if (error) return 'error';
    if (health?.success && health?.database?.connected) return 'success';
    if (health?.success) return 'warning';
    return 'error';
  };
  const getStatusIcon = () => {
    if (loading) return null;
    if (error) return <Error fontSize="small" />;
    if (health?.success && health?.database?.connected) return <CheckCircle fontSize="small" />;
    return <Warning fontSize="small" />;
  };
  const getStatusText = () => {
    if (loading) return 'Checking...';
    if (error) return 'API Offline';
    if (health?.success && health?.database?.connected) return 'All Systems Operational';
    if (health?.success) return `API Online, DB ${health.database?.state || 'Unknown'}`;
    return 'System Error';
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
            Database: {health.database?.connected ? 
              `${health.database.state} (${health.database.host})` : 
              health.database?.state || 'Unknown'}
          </Typography>
          {health.database?.collections !== undefined && (
            <Typography variant="caption" display="block">
              Collections: {health.database.collections}
            </Typography>
          )}
          <Typography variant="caption" display="block">
            Last check: {new Date(health.timestamp).toLocaleString()}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
export default HealthStatus;

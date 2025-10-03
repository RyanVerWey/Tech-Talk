import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext.js';

// Configure axios defaults
axios.defaults.withCredentials = true;
const apiUrl = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? window.location.origin : 'http://localhost:3002');
axios.defaults.baseURL = apiUrl;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on app load and handle OAuth callback
  useEffect(() => {
    // Handle OAuth callback by checking for access token in URL
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('token');
    const userData = urlParams.get('user');
    
    if (accessToken) {
      // Store token and user data
      localStorage.setItem('accessToken', accessToken);
      if (userData) {
        try {
          const parsedUser = JSON.parse(decodeURIComponent(userData));
          setUser(parsedUser);
          setLoading(false);
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
      
      // Redirect to home page and remove tokens from URL
      window.history.replaceState({}, document.title, '/');
      window.location.href = '/';
      return;
    }
    
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await axios.get('/api/auth/me');
      if (response.data.success) {
        setUser(response.data.data);
      } else {
        setUser(null);
        localStorage.removeItem('accessToken');
        delete axios.defaults.headers.common['Authorization'];
      }
    } catch (error) {
      // User is not authenticated - this is expected behavior
      console.log('Authentication check failed:', error.response?.status === 401 ? 'Token invalid/expired' : error.message);
      setUser(null);
      localStorage.removeItem('accessToken');
      delete axios.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
    } catch (error) {
      console.warn('Logout request failed, clearing user session:', error.message);
    }
    
    // Clear local state and token
    setUser(null);
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common['Authorization'];
    
    // Redirect to login
    window.location.href = '/login';
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
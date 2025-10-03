import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Home, Article, People, Work, Login, Menu, FlashOn } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts';
const Header = () => {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Blog', path: '/blog', icon: Article },
    { label: 'Profiles', path: '/profiles', icon: People },
    { label: 'Projects', path: '/projects', icon: Work },
  ];
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const isActivePath = (path) => {
    return location.pathname === path;
  };
  return (
    <AppBar 
      position="static" 
      className="backdrop-blur-xl bg-black/20 border-b border-white/10 shadow-2xl"
      elevation={0}
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <Toolbar className="px-6 py-2">
        {}
        <Typography 
          variant="h6" 
          component={Link}
          to="/"
          sx={{ 
            flexGrow: 1, 
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 800,
            background: 'linear-gradient(45deg, #00D4FF 30%, #FF6B35 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontSize: '1.5rem',
          }}
          className="hover:scale-105 transition-transform duration-300 flex items-center gap-2"
        >
          <FlashOn className="text-cyan-400" />
          TechTalk
        </Typography>
        {}
        {!isMobile && isAuthenticated && (
          <Box className="flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.path}
                  color="inherit"
                  component={Link}
                  to={item.path}
                  startIcon={<Icon />}
                  className={`transition-all duration-300 ${
                    isActivePath(item.path) 
                      ? 'bg-gradient-to-r from-cyan-400/20 to-blue-600/20 text-cyan-300 scale-105' 
                      : 'hover:bg-white/10 hover:scale-105'
                  }`}
                  sx={{ 
                    borderRadius: 3, 
                    px: 3,
                    py: 1,
                    backdropFilter: 'blur(10px)',
                    border: isActivePath(item.path) ? '1px solid rgba(0, 212, 255, 0.3)' : '1px solid transparent',
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Box>
        )}
        {}
        <Box className="ml-4 flex items-center">
          {user ? (
            <Box className="flex items-center space-x-3">
              <img
                src={user.avatar || user.picture || `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#00D4FF"/><text x="50" y="55" text-anchor="middle" fill="white" font-size="20">${(user.displayName || user.firstName || 'U').charAt(0).toUpperCase()}</text></svg>`)}`}
                alt={user.displayName || `${user.firstName} ${user.lastName}`}
                className="w-8 h-8 rounded-full border-2 border-cyan-400 border-opacity-60"
              />
              {!isMobile && (
                <Typography variant="body2" className="text-white font-medium">
                  {user.displayName || `${user.firstName} ${user.lastName}`}
                </Typography>
              )}
              <Button 
                color="inherit" 
                onClick={logout}
                variant="outlined"
                size="small"
                className="border-red-400 border-opacity-50 text-red-300 hover:bg-red-500 hover:bg-opacity-20 hover:border-red-400"
              >
                Logout
              </Button>
            </Box>
          ) : (
            <Button
              color="inherit"
              component={Link}
              to="/login"
              startIcon={<Login />}
              variant="outlined"
              className="border-white border-opacity-30 hover:bg-white hover:bg-opacity-10"
            >
              Login
            </Button>
          )}
        </Box>
        {}
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className="ml-2"
          >
            <Menu />
          </IconButton>
        )}
      </Toolbar>
      {}
    </AppBar>
  );
};
export default Header;

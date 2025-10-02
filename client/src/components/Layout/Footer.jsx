import React from 'react';
import { Box, Container, Typography, Grid, Link, IconButton } from '@mui/material';
import { GitHub, LinkedIn, Twitter, Email, FlashOn, Favorite } from '@mui/icons-material';
import { HealthStatus } from '../';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      className="relative mt-16 overflow-hidden"
      sx={{ 
        py: 8,
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(20, 20, 20, 0.9) 100%)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-gradient-to-r from-orange-400/10 to-pink-600/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>
      
      <Container maxWidth="lg" className="relative z-10">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography 
              variant="h6" 
              component="h3" 
              gutterBottom 
              className="font-bold mb-4"
              sx={{
                background: 'linear-gradient(135deg, #00D4FF 0%, #FF6B35 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              <FlashOn className="inline mr-1" /> TechTalk Alumni
            </Typography>
            <Typography variant="body2" className="text-gray-400 mb-6 leading-relaxed">
              A network for FSU tech alumni. Share knowledge, connect with peers, and collaborate on meaningful projects.
            </Typography>
            
            {/* Social Links */}
            <Box className="flex space-x-2">
              <IconButton 
                size="small" 
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 hover:scale-110"
                aria-label="GitHub"
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 212, 255, 0.1)',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                  }
                }}
              >
                <GitHub />
              </IconButton>
              <IconButton 
                size="small" 
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300 hover:scale-110"
                aria-label="LinkedIn"
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                  }
                }}
              >
                <LinkedIn />
              </IconButton>
              <IconButton 
                size="small" 
                className="text-gray-400 hover:text-orange-400 transition-colors duration-300 hover:scale-110"
                aria-label="Twitter"
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 107, 53, 0.1)',
                    border: '1px solid rgba(255, 107, 53, 0.3)',
                  }
                }}
              >
                <Twitter />
              </IconButton>
              <IconButton 
                size="small" 
                className="text-gray-400 hover:text-purple-400 transition-colors duration-300 hover:scale-110"
                aria-label="Email"
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(168, 85, 247, 0.1)',
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                  }
                }}
              >
                <Email />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" component="h3" gutterBottom className="font-semibold">
              Quick Links
            </Typography>
            <Box className="space-y-2">
              <Link href="/" color="inherit" className="block text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/blog" color="inherit" className="block text-gray-300 hover:text-white transition-colors">
                Blog
              </Link>
              <Link href="/profiles" color="inherit" className="block text-gray-300 hover:text-white transition-colors">
                Profiles
              </Link>
              <Link href="/projects" color="inherit" className="block text-gray-300 hover:text-white transition-colors">
                Projects
              </Link>
            </Box>
          </Grid>

          {/* Resources */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" component="h3" gutterBottom className="font-semibold">
              Resources
            </Typography>
            <Box className="space-y-2">
              <Link href="#" color="inherit" className="block text-gray-300 hover:text-white transition-colors">
                API Documentation
              </Link>
              <Link href="#" color="inherit" className="block text-gray-300 hover:text-white transition-colors">
                Contributing Guide
              </Link>
              <Link href="#" color="inherit" className="block text-gray-300 hover:text-white transition-colors">
                Community Guidelines
              </Link>
              <Link href="#" color="inherit" className="block text-gray-300 hover:text-white transition-colors">
                Support
              </Link>
            </Box>
          </Grid>

          {/* Legal */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" component="h3" gutterBottom className="font-semibold">
              Legal
            </Typography>
            <Box className="space-y-2">
              <Link href="#" color="inherit" className="block text-gray-300 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" color="inherit" className="block text-gray-300 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="#" color="inherit" className="block text-gray-300 hover:text-white transition-colors">
                Cookie Policy
              </Link>
              <Link href="#" color="inherit" className="block text-gray-300 hover:text-white transition-colors">
                Code of Conduct
              </Link>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright Section */}
        <Box className="border-t border-white/10 mt-8 pt-6">
          <div className="flex flex-col items-center space-y-3">
            {/* System Status */}
            <HealthStatus />
            
            {/* Copyright */}
            <Typography 
              variant="body2" 
              align="center" 
              className="text-gray-400"
              sx={{ 
                '& span': {
                  background: 'linear-gradient(135deg, #00D4FF 0%, #FF6B35 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }
              }}
            >
              © {currentYear} <span>TechTalk Alumni Network</span>. Built with <Favorite className="inline text-red-400 mx-1" fontSize="small" /> by FSU developers, for FSU developers.
            </Typography>
          </div>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
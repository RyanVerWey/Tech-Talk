import React from 'react';
import {
  Typography,
  Avatar,
  Box,
  Chip,
  IconButton
} from '@mui/material';
import { GitHub, LinkedIn, Launch, LocationOn, School } from '@mui/icons-material';

const ProfileCard = ({
  user,
  onClick,
  className = ''
}) => {
  const {
    name = 'Unknown',
    avatar,
    portfolio,
    github,
    linkedin,
    joinDate,
    location = 'Tallahassee, FL'
  } = user || {};

  const handleSocialClick = (e, url) => {
    e.stopPropagation();
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div 
      className={`group relative cursor-pointer transition-all duration-300 hover:scale-105 w-full ${className}`}
      onClick={onClick}
    >
      {/* Simplified card with gradient border */}
      <div className="bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-orange-500/20 p-0.5 rounded-2xl">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-4 h-full">
          
          {/* Profile Content - Horizontal Layout */}
          <div className="flex items-center space-x-4">
            {/* Profile Photo */}
            <div className="flex-shrink-0">
              <Avatar
                src={avatar}
                alt={name}
                sx={{ width: 80, height: 80 }}
                className="border-2 border-cyan-400/50"
              />
            </div>
            
            {/* Name and Location */}
            <div className="flex-grow flex flex-col justify-center">
              <Typography variant="h6" className="font-bold text-white mb-1 leading-tight">
                {name}
              </Typography>
              
              <div className="flex items-center space-x-1 mb-1">
                <LocationOn className="text-cyan-400 text-sm" />
                <Typography variant="body2" className="text-cyan-400">
                  {location}
                </Typography>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="border-t border-white/10 pt-3 mt-3">
            <Typography variant="caption" className="text-white/60 font-bold tracking-wide mb-2 block text-center">
              CONNECT
            </Typography>
            <div className="flex justify-center space-x-2">
              {github && (
                <IconButton
                  size="small"
                  onClick={(e) => handleSocialClick(e, github)}
                  className="bg-gray-700/50 text-white hover:bg-gray-600/50 hover:text-cyan-400 transition-all duration-300"
                  title="GitHub"
                >
                  <GitHub fontSize="small" />
                </IconButton>
              )}
              {linkedin && (
                <IconButton
                  size="small"
                  onClick={(e) => handleSocialClick(e, linkedin)}
                  className="bg-blue-600/50 text-white hover:bg-blue-500/50 hover:text-cyan-400 transition-all duration-300"
                  title="LinkedIn"
                >
                  <LinkedIn fontSize="small" />
                </IconButton>
              )}
              {portfolio && (
                <IconButton
                  size="small"
                  onClick={(e) => handleSocialClick(e, portfolio)}
                  className="bg-purple-600/50 text-white hover:bg-purple-500/50 hover:text-cyan-400 transition-all duration-300"
                  title="Portfolio"
                >
                  <Launch fontSize="small" />
                </IconButton>
              )}
            </div>
          </div>

          {/* Member since */}
          {joinDate && (
            <div className="mt-2 text-center">
              <Typography variant="caption" className="text-white/40 text-xs">
                Alumni since {new Date(joinDate).getFullYear()}
              </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
import React, { useState } from 'react';
import {
  Typography,
  Avatar,
  Box,
  Chip,
  IconButton,
  Button
} from '@mui/material';
import { GitHub, LinkedIn, Launch, LocationOn, School, Edit } from '@mui/icons-material';
import { useAuth } from '../../contexts';
import ProfileEditDialog from '../Modals/ProfileEditDialog';

const ProfileCard = ({
  user,
  onClick,
  className = '',
  onProfileUpdate
}) => {
  const { user: currentUser } = useAuth();
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Extract data from MongoDB user structure
  const {
    _id,
    displayName,
    firstName,
    lastName,
    avatar,
    bio,
    graduationYear,
    degree,
    major,
    socialLinks = {},
    createdAt
  } = user || {};

  const name = displayName || `${firstName || ''} ${lastName || ''}`.trim() || 'Unknown';
  const isOwnProfile = currentUser?._id === _id;

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
            
            {/* Name, Bio, and Academic Info */}
            <div className="flex-grow flex flex-col justify-center">
              <Typography variant="h6" className="font-bold text-white mb-1 leading-tight">
                {name}
              </Typography>
              
              {bio && (
                <Typography variant="body2" className="text-white/80 mb-2 line-clamp-2">
                  {bio}
                </Typography>
              )}
              
              <div className="flex items-center space-x-1 mb-1">
                <School className="text-cyan-400 text-sm" />
                <Typography variant="body2" className="text-cyan-400">
                  {graduationYear ? `Class of ${graduationYear}` : 'FSU Alumni'}
                  {degree && ` • ${degree}`}
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
              {socialLinks.github && (
                <IconButton
                  size="small"
                  onClick={(e) => handleSocialClick(e, socialLinks.github)}
                  className="bg-gray-700/50 text-white hover:bg-gray-600/50 hover:text-cyan-400 transition-all duration-300"
                  title="GitHub"
                >
                  <GitHub fontSize="small" />
                </IconButton>
              )}
              {socialLinks.linkedin && (
                <IconButton
                  size="small"
                  onClick={(e) => handleSocialClick(e, socialLinks.linkedin)}
                  className="bg-blue-600/50 text-white hover:bg-blue-500/50 hover:text-cyan-400 transition-all duration-300"
                  title="LinkedIn"
                >
                  <LinkedIn fontSize="small" />
                </IconButton>
              )}
              {socialLinks.portfolio && (
                <IconButton
                  size="small"
                  onClick={(e) => handleSocialClick(e, socialLinks.portfolio)}
                  className="bg-purple-600/50 text-white hover:bg-purple-500/50 hover:text-cyan-400 transition-all duration-300"
                  title="Portfolio"
                >
                  <Launch fontSize="small" />
                </IconButton>
              )}
            </div>
          </div>

          {/* Member since / Edit Profile */}
          <div className="mt-2 text-center">
            {createdAt && (
              <Typography variant="caption" className="text-white/40 text-xs">
                Alumni since {new Date(createdAt).getFullYear()}
              </Typography>
            )}
            {isOwnProfile && (
              <div className="mt-2">
                <Button
                  size="small"
                  startIcon={<Edit fontSize="small" />}
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditDialogOpen(true);
                  }}
                  className="text-cyan-400 hover:bg-cyan-400/10 text-xs"
                >
                  Edit Profile
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Edit Dialog */}
      {isOwnProfile && (
        <ProfileEditDialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          user={user}
          onProfileUpdate={(updatedUser) => {
            onProfileUpdate?.(updatedUser);
            setEditDialogOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ProfileCard;
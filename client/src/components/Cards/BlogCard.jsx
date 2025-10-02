import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Chip,
  Avatar,
  IconButton,
  Button
} from '@mui/material';
import { ThumbUp, ThumbDown, Comment, Share, MoreVert } from '@mui/icons-material';
import StarRating from '../Forms/StarRating';

const BlogCard = ({
  post,
  onVote,
  onRate,
  onComment,
  onClick,
  showActions = true,
  className = ''
}) => {
  const {
    id,
    title,
    excerpt,
    content,
    author,
    createdAt,
    updatedAt,
    votes = { up: 0, down: 0 },
    rating = { average: 0, count: 0 },
    tags = [],
    commentCount = 0,
    userVote, // 'up', 'down', or null
    userRating // 0-5
  } = post || {};

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleVote = (e, voteType) => {
    e.stopPropagation();
    onVote?.(id, voteType);
  };

  const handleRate = (e, newRating) => {
    e.stopPropagation();
    onRate?.(id, newRating);
  };

  const handleComment = (e) => {
    e.stopPropagation();
    onComment?.(id);
  };

  return (
    <Card 
      className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 hover:border-cyan-500/50 ${className}`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        {/* Header */}
        <Box className="flex justify-between items-start mb-3">
          <Box className="flex items-center space-x-3">
            <Avatar
              src={author?.avatar}
              alt={author?.name}
              sx={{ width: 40, height: 40 }}
              className="border-2 border-cyan-500/30"
            />
            <Box>
              <Typography variant="body2" className="font-medium text-white">
                {author?.name}
              </Typography>
              <Typography variant="caption" className="text-gray-400">
                {formatDate(createdAt)}
                {updatedAt && updatedAt !== createdAt && ' (edited)'}
              </Typography>
            </Box>
          </Box>
          
          {showActions && (
            <IconButton size="small" className="text-gray-400 hover:text-cyan-400 transition-colors">
              <MoreVert />
            </IconButton>
          )}
        </Box>

        {/* Title */}
        <Typography 
          variant="h6" 
          component="h3" 
          className="font-semibold mb-2 text-white group-hover:text-cyan-300 transition-colors duration-300"
        >
          {title}
        </Typography>

        {/* Excerpt/Content */}
        <Typography variant="body2" className="mb-3 line-clamp-3 text-gray-300 leading-relaxed">
          {excerpt || content?.substring(0, 200) + '...'}
        </Typography>

        {/* Tags */}
        {tags.length > 0 && (
          <Box className="flex flex-wrap gap-1 mb-3">
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors cursor-pointer"
              />
            ))}
          </Box>
        )}

        {/* Rating */}
        <Box className="flex items-center justify-between mb-3">
          <StarRating
            value={rating.average}
            readOnly
            size="small"
            showValue
            className="text-yellow-400"
          />
          <Typography variant="caption" className="text-gray-400">
            {rating.count} rating{rating.count !== 1 ? 's' : ''}
          </Typography>
        </Box>
      </CardContent>

      {/* Actions */}
      <CardActions className="px-6 pb-6 pt-0">
        <Box className="flex items-center justify-between w-full">
          {/* Vote Buttons */}
          <Box className="flex items-center space-x-2">
            <Button
              size="small"
              startIcon={<ThumbUp />}
              onClick={(e) => handleVote(e, 'up')}
              className={`min-w-0 transition-all duration-300 ${
                userVote === 'up' 
                  ? 'bg-green-500/20 border border-green-400/50 text-green-300' 
                  : 'text-gray-400 hover:text-green-400 hover:bg-green-500/10 border border-transparent hover:border-green-400/30'
              }`}
            >
              {votes.up}
            </Button>
            
            <Button
              size="small"
              startIcon={<ThumbDown />}
              onClick={(e) => handleVote(e, 'down')}
              className={`min-w-0 transition-all duration-300 ${
                userVote === 'down' 
                  ? 'bg-red-500/20 border border-red-400/50 text-red-300' 
                  : 'text-gray-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-400/30'
              }`}
            >
              {votes.down}
            </Button>
              </Box>

              {/* Comment and Share */}
              <Box className="flex items-center space-x-1">
                <Button
                  size="small"
                  startIcon={<Comment />}
                  onClick={handleComment}
                  className="min-w-0 text-white/60 hover:text-cyan-400 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-400/30 rounded-lg transition-all duration-300"
                >
                  {commentCount}
                </Button>
                
                <IconButton size="small" className="text-white/60 hover:text-purple-400 transition-colors duration-300">
                  <Share fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            {/* User Rating */}
            {showActions && (
              <Box className="w-full mt-3 pt-3 border-t border-white/10">
                <StarRating
                  value={userRating || 0}
                  onChange={(e, newValue) => handleRate(e, newValue)}
                  size="small"
                  label="Your rating:"
                  className="justify-center text-yellow-400"
                />
              </Box>
            )}
      </CardActions>
    </Card>
  );
};

export default BlogCard;
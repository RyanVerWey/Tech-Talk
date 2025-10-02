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
import { CalendarToday, Person, Edit, Delete, MoreVert } from '@mui/icons-material';

const ProjectCard = ({
  project,
  onEdit,
  onDelete,
  onClick,
  showActions = true,
  isOwner = false,
  className = ''
}) => {
  const {
    id,
    name,
    concept,
    dateRange,
    technologies = [],
    owner,
    createdAt,
    collaborators = []
  } = project || {};

  const formatDateRange = (range) => {
    if (!range) return 'No date specified';
    const { start, end } = range;
    const startDate = start ? new Date(start).toLocaleDateString() : 'TBD';
    const endDate = end ? new Date(end).toLocaleDateString() : 'TBD';
    return `${startDate} - ${endDate}`;
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit?.(id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete?.(id);
  };

  return (
    <Card 
      className={`hover:shadow-lg transition-shadow cursor-pointer ${className}`}
      onClick={onClick}
    >
      <CardContent>
        {/* Header */}
        <Box className="flex justify-between items-start mb-3">
          <Box className="flex items-center space-x-2">
            <Avatar
              src={owner?.avatar}
              alt={owner?.name}
              sx={{ width: 32, height: 32 }}
            />
            <Box>
              <Typography variant="body2" className="font-medium">
                {owner?.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(createdAt).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
          
          {showActions && isOwner && (
            <IconButton size="small" className="text-gray-400">
              <MoreVert />
            </IconButton>
          )}
        </Box>

        {/* Project Name */}
        <Typography variant="h6" component="h3" className="font-semibold mb-2">
          {name}
        </Typography>

        {/* Concept */}
        <Typography variant="body2" color="text.secondary" className="mb-3 line-clamp-3">
          {concept}
        </Typography>

        {/* Date Range */}
        <Box className="flex items-center space-x-1 mb-3">
          <CalendarToday fontSize="small" className="text-gray-500" />
          <Typography variant="body2" color="text.secondary">
            {formatDateRange(dateRange)}
          </Typography>
        </Box>

        {/* Technologies */}
        {technologies.length > 0 && (
          <Box className="mb-3">
            <Typography variant="caption" className="font-medium text-gray-600 mb-2 block">
              Technologies
            </Typography>
            <Box className="flex flex-wrap gap-1">
              {technologies.slice(0, 8).map((tech, index) => (
                <Chip
                  key={index}
                  label={tech}
                  size="small"
                  variant="outlined"
                  className="text-xs"
                  color="primary"
                />
              ))}
              {technologies.length > 8 && (
                <Chip
                  label={`+${technologies.length - 8} more`}
                  size="small"
                  variant="outlined"
                  className="text-xs text-gray-500"
                />
              )}
            </Box>
          </Box>
        )}

        {/* Collaborators */}
        {collaborators.length > 0 && (
          <Box className="flex items-center space-x-2">
            <Person fontSize="small" className="text-gray-500" />
            <Typography variant="caption" color="text.secondary">
              {collaborators.length} collaborator{collaborators.length !== 1 ? 's' : ''}
            </Typography>
            <Box className="flex -space-x-2">
              {collaborators.slice(0, 3).map((collaborator, index) => (
                <Avatar
                  key={index}
                  src={collaborator.avatar}
                  alt={collaborator.name}
                  sx={{ width: 24, height: 24 }}
                  className="border-2 border-white"
                />
              ))}
              {collaborators.length > 3 && (
                <Avatar
                  sx={{ width: 24, height: 24, fontSize: '0.7rem' }}
                  className="border-2 border-white bg-gray-500"
                >
                  +{collaborators.length - 3}
                </Avatar>
              )}
            </Box>
          </Box>
        )}
      </CardContent>

      {/* Actions */}
      {showActions && (
        <CardActions className="px-4 pb-3 pt-0">
          <Box className="flex justify-between w-full">
            <Button size="small" variant="outlined" color="primary">
              View Details
            </Button>
            
            {isOwner && (
              <Box className="flex space-x-1">
                <Button
                  size="small"
                  startIcon={<Edit />}
                  onClick={handleEdit}
                  variant="text"
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  startIcon={<Delete />}
                  onClick={handleDelete}
                  variant="text"
                  color="error"
                >
                  Delete
                </Button>
              </Box>
            )}
          </Box>
        </CardActions>
      )}
    </Card>
  );
};

export default ProjectCard;
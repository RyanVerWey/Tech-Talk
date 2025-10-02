import React from 'react';
import {
  TextField,
  Chip,
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Autocomplete,
  createFilterOptions
} from '@mui/material';

const filter = createFilterOptions();

const TechStackInput = ({
  label = 'Technologies',
  value = [],
  onChange,
  error,
  helperText,
  placeholder = 'Add technologies (e.g., React, Node.js, Python)',
  className = '',
  disabled = false,
  maxTags = 10,
  predefinedOptions = [
    // Frontend
    'React', 'Vue.js', 'Angular', 'Svelte', 'Next.js', 'Nuxt.js',
    'HTML', 'CSS', 'JavaScript', 'TypeScript', 'Sass', 'Tailwind CSS',
    
    // Backend
    'Node.js', 'Express', 'Python', 'Django', 'Flask', 'FastAPI',
    'Java', 'Spring Boot', 'C#', '.NET', 'PHP', 'Laravel',
    'Ruby', 'Ruby on Rails', 'Go', 'Rust',
    
    // Databases
    'MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'Redis', 'Firebase',
    'DynamoDB', 'Elasticsearch',
    
    // Cloud & DevOps
    'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes',
    'Heroku', 'Vercel', 'Netlify', 'GitHub Actions', 'Jenkins',
    
    // Mobile
    'React Native', 'Flutter', 'Swift', 'Kotlin', 'Ionic',
    
    // Tools & Others
    'Git', 'Webpack', 'Vite', 'GraphQL', 'REST API', 'Socket.io',
    'Jest', 'Cypress', 'Storybook', 'Figma'
  ]
}) => {
  const hasError = Boolean(error);

  const handleChange = (event, newValue) => {
    if (newValue.length <= maxTags) {
      onChange(newValue);
    }
  };

  return (
    <FormControl fullWidth error={hasError} className={className}>
      <FormLabel component="legend" className="mb-2 text-sm font-medium">
        {label}
      </FormLabel>
      
      <Autocomplete
        multiple
        id="tech-stack-input"
        value={value}
        onChange={handleChange}
        disabled={disabled}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some((option) => inputValue === option);
          if (inputValue !== '' && !isExisting) {
            filtered.push(inputValue);
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        options={predefinedOptions}
        getOptionLabel={(option) => option}
        renderOption={(props, option) => <li {...props}>{option}</li>}
        freeSolo
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
              key={index}
              size="small"
              className="m-1"
              color="primary"
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={value.length === 0 ? placeholder : ''}
            error={hasError}
            variant="outlined"
          />
        )}
        ChipProps={{
          size: 'small',
          variant: 'outlined',
        }}
      />
      
      {(error || helperText) && (
        <FormHelperText>
          {error || helperText}
        </FormHelperText>
      )}
      
      {value.length >= maxTags && (
        <FormHelperText>
          Maximum {maxTags} technologies allowed
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default TechStackInput;
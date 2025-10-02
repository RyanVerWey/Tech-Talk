# Component Library Documentation

This document provides an overview of all shared components in the Tech Talk Alumni Network application.

## Layout Components

### Layout
Main layout wrapper that includes header, footer, and main content area.
```jsx
import { Layout } from '../components';

<Layout>
  <YourPageContent />
</Layout>
```

### Header
Navigation header with responsive design, user authentication status, and navigation links.
- Handles mobile navigation
- Shows user avatar and name when authenticated
- Provides login/logout functionality

### Footer
Site footer with links, social media icons, and copyright information.
- Responsive grid layout
- Social media links
- Legal and resource links

## UI Components

### PageTitle
Consistent page title component with optional subtitle.
```jsx
<PageTitle 
  title="Page Title" 
  subtitle="Optional subtitle text"
  align="left"
  variant="h3"
/>
```

### LoadingButton
Button component with loading state and spinner.
```jsx
<LoadingButton
  loading={isSubmitting}
  loadingText="Saving..."
  onClick={handleSubmit}
>
  Save Changes
</LoadingButton>
```

### NotificationBar
Toast notification system for success/error/warning messages.
```jsx
<NotificationBar
  open={showNotification}
  type="success"
  title="Success!"
  message="Data saved successfully"
  onClose={handleClose}
/>
```

### LoadingSkeleton Components
Various skeleton loaders for different content types:
- `LoadingSkeleton` - Generic skeleton
- `CardSkeleton` - For card layouts
- `ListSkeleton` - For list items
- `TableSkeleton` - For table rows

```jsx
<CardSkeleton showAvatar lines={3} />
<ListSkeleton items={5} />
```

## Form Components

### FormField
Standardized form input field with error handling.
```jsx
<FormField
  label="Email"
  name="email"
  type="email"
  value={formData.email}
  onChange={handleChange}
  error={errors.email}
  required
/>
```

### TechStackInput
Multi-select input for technology tags with autocomplete.
```jsx
<TechStackInput
  label="Technologies"
  value={selectedTechs}
  onChange={setSelectedTechs}
  maxTags={10}
/>
```

### StarRating
Star rating component for blog posts and user ratings.
```jsx
<StarRating
  value={rating}
  onChange={handleRatingChange}
  showValue
  readOnly={false}
/>
```

## Modal Components

### Modal
Generic modal wrapper with title, content, and actions.
```jsx
<Modal
  open={isOpen}
  onClose={handleClose}
  title="Modal Title"
  maxWidth="md"
  actions={<Button>Action</Button>}
>
  Modal content here
</Modal>
```

### ConfirmDialog
Confirmation dialog for destructive actions.
```jsx
<ConfirmDialog
  open={showConfirm}
  onClose={handleClose}
  onConfirm={handleConfirm}
  title="Delete Post"
  message="Are you sure you want to delete this post?"
  variant="danger"
/>
```

## Card Components

### ProfileCard
Display user profile information in card format.
```jsx
<ProfileCard
  user={userObject}
  showActions={true}
  onClick={handleProfileClick}
/>
```

**User Object Structure:**
```javascript
{
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://...",
  bio: "Software developer...",
  portfolio: "https://johndoe.dev",
  github: "https://github.com/johndoe",
  linkedin: "https://linkedin.com/in/johndoe",
  technologies: ["React", "Node.js"],
  joinDate: "2024-01-15T00:00:00Z"
}
```

### BlogCard
Display blog post in card format with voting and rating.
```jsx
<BlogCard
  post={postObject}
  onVote={handleVote}
  onRate={handleRate}
  onComment={handleComment}
  onClick={handlePostClick}
/>
```

**Post Object Structure:**
```javascript
{
  id: 1,
  title: "Post Title",
  excerpt: "Short description...",
  content: "Full content...",
  author: { name: "Author", avatar: "..." },
  createdAt: "2024-01-15T10:00:00Z",
  votes: { up: 10, down: 2 },
  rating: { average: 4.5, count: 8 },
  tags: ["React", "JavaScript"],
  commentCount: 5,
  userVote: "up", // or "down" or null
  userRating: 4 // 0-5
}
```

### ProjectCard
Display project primer in card format.
```jsx
<ProjectCard
  project={projectObject}
  onEdit={handleEdit}
  onDelete={handleDelete}
  onClick={handleProjectClick}
  isOwner={true}
/>
```

**Project Object Structure:**
```javascript
{
  id: 1,
  name: "Project Name",
  concept: "Project description...",
  dateRange: {
    start: "2024-02-01T00:00:00Z",
    end: "2024-04-01T00:00:00Z"
  },
  technologies: ["React", "Node.js", "MongoDB"],
  owner: { name: "Owner", avatar: "..." },
  createdAt: "2024-01-15T00:00:00Z",
  collaborators: [
    { name: "Collaborator", avatar: "..." }
  ]
}
```

## Usage Examples

### Complete Form with Components
```jsx
import { FormField, TechStackInput, LoadingButton, NotificationBar } from '../components';

function ProjectForm() {
  const [formData, setFormData] = useState({
    name: '',
    concept: '',
    technologies: []
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  return (
    <form onSubmit={handleSubmit}>
      <FormField
        label="Project Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
      />
      
      <FormField
        label="Concept"
        name="concept"
        value={formData.concept}
        onChange={handleChange}
        error={errors.concept}
        multiline
        rows={4}
      />
      
      <TechStackInput
        label="Technologies"
        value={formData.technologies}
        onChange={(techs) => setFormData({...formData, technologies: techs})}
        error={errors.technologies}
      />
      
      <LoadingButton
        type="submit"
        loading={loading}
        loadingText="Creating Project..."
      >
        Create Project
      </LoadingButton>
      
      <NotificationBar
        open={!!notification}
        type={notification?.type}
        message={notification?.message}
        onClose={() => setNotification(null)}
      />
    </form>
  );
}
```

### Grid Layout with Cards
```jsx
import { Grid } from '@mui/material';
import { ProfileCard, CardSkeleton } from '../components';

function ProfileGrid({ profiles, loading }) {
  return (
    <Grid container spacing={3}>
      {loading ? (
        Array.from({ length: 6 }).map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CardSkeleton showAvatar />
          </Grid>
        ))
      ) : (
        profiles.map((profile) => (
          <Grid item xs={12} sm={6} md={4} key={profile.id}>
            <ProfileCard
              user={profile}
              onClick={() => handleProfileClick(profile)}
            />
          </Grid>
        ))
      )}
    </Grid>
  );
}
```

## Design Principles

1. **Consistency**: All components follow the same design patterns and Material UI theming
2. **Accessibility**: Components include proper ARIA labels and keyboard navigation
3. **Responsiveness**: Mobile-first design with responsive breakpoints
4. **Reusability**: Props-based configuration for maximum flexibility
5. **Performance**: Optimized rendering with React.memo where appropriate

## Theming Integration

Components are designed to work with the Material UI theme system:
- Primary color: `#0ea5e9` (blue)
- Secondary color: `#a855f7` (purple)
- Tailwind CSS utilities for spacing and layout
- Consistent border radius and shadows
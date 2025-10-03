import React from 'react';
import { Container, Paper, Button, Box } from '@mui/material';
import { Add } from '@mui/icons-material';
import { PageTitle, BlogCard, CardSkeleton } from '../components';
const mockBlogPosts = [
  {
    id: 1,
    title: 'Getting Started with React and TypeScript',
    excerpt: 'Learn how to set up a React project with TypeScript and best practices for type safety.',
    author: {
      name: 'John Doe',
      avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=JohnDoe'
    },
    createdAt: '2025-09-15T10:00:00Z',
    votes: { up: 24, down: 2 },
    rating: { average: 4.5, count: 12 },
    tags: ['React', 'TypeScript', 'JavaScript'],
    commentCount: 8,
    userVote: 'up',
    userRating: 5
  },
  {
    id: 2,
    title: 'Building Scalable APIs with Node.js and Express',
    excerpt: 'A comprehensive guide to building robust and scalable REST APIs using Node.js and Express framework.',
    author: {
      name: 'Jane Smith',
      avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=JaneSmith'
    },
    createdAt: '2025-09-12T14:30:00Z',
    votes: { up: 18, down: 1 },
    rating: { average: 4.2, count: 9 },
    tags: ['Node.js', 'Express', 'API', 'Backend'],
    commentCount: 5,
    userRating: 4
  }
];
const Blog = () => {
  const [loading] = React.useState(false); 
  const handleVote = (postId, voteType) => {
    console.log(`Vote ${voteType} for post ${postId}`);
  };
  const handleRate = (postId, rating) => {
    console.log(`Rate ${rating} for post ${postId}`);
  };
  const handleComment = (postId) => {
    console.log(`Comment on post ${postId}`);
  };
  const handlePostClick = (post) => {
    console.log('View post:', post.title);
  };
  return (
    <Container maxWidth="lg" className="py-8">
      <Box className="flex justify-between items-center mb-8">
        <PageTitle 
          title="Tech Blog" 
          subtitle="Share your knowledge and learn from the community"
        />
        <Button
          variant="contained"
          startIcon={<Add />}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105"
        >
          New Post
        </Button>
      </Box>
      {}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <CardSkeleton showAvatar lines={4} key={index} />
          ))
        ) : mockBlogPosts.length > 0 ? (
          mockBlogPosts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              onVote={handleVote}
              onRate={handleRate}
              onComment={handleComment}
              onClick={() => handlePostClick(post)}
            />
          ))
        ) : (
          <div className="col-span-full">
            <Paper className="p-8 text-center">
              <PageTitle 
                title="No Posts Yet" 
                subtitle="Be the first to share your knowledge with the community!"
                align="center"
                variant="h5"
              />
              <Button
                variant="contained"
                startIcon={<Add />}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white mt-4 rounded-lg"
              >
                Create First Post
              </Button>
            </Paper>
          </div>
        )}
      </div>
    </Container>
  );
};
export default Blog;

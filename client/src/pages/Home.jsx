import React from 'react';
import { Typography, Container, Paper, Grid, Card, CardContent, Button } from '@mui/material';
import { Article, People, Work, TrendingUp, RocketLaunch, MenuBook, FlashOn } from '@mui/icons-material';
const Home = () => {
  return (
    <Container maxWidth="lg" className="relative z-10">
      {}
      <div className="relative overflow-hidden rounded-3xl p-12 mb-16 bg-gradient-to-r from-cyan-400/10 via-blue-600/10 to-purple-600/10 backdrop-blur-xl border border-white/20">
        {}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[15%] left-[8%] w-1.5 h-1.5 bg-cyan-400/60 rounded-full animate-slow-ping" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-[25%] right-[12%] w-1 h-1 bg-orange-400/50 rounded-full animate-slow-ping" style={{animationDelay: '1.2s'}}></div>
          <div className="absolute bottom-[20%] left-[25%] w-1.5 h-1.5 bg-purple-400/55 rounded-full animate-slow-ping" style={{animationDelay: '0.7s'}}></div>
          <div className="absolute top-[40%] right-[35%] w-1 h-1 bg-cyan-400/45 rounded-full animate-slow-ping" style={{animationDelay: '2.1s'}}></div>
          <div className="absolute bottom-[35%] right-[8%] w-1.5 h-1.5 bg-orange-400/50 rounded-full animate-slow-ping" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-[60%] left-[15%] w-1 h-1 bg-purple-400/40 rounded-full animate-slow-ping" style={{animationDelay: '3.2s'}}></div>
          <div className="absolute bottom-[45%] left-[45%] w-1.5 h-1.5 bg-cyan-400/35 rounded-full animate-slow-ping" style={{animationDelay: '2.8s'}}></div>
        </div>
        <div className="relative z-10 text-center">
          <Typography 
            variant="h1" 
            component="h1" 
            gutterBottom 
            className="font-black text-5xl md:text-7xl mb-6"
            sx={{
              background: 'linear-gradient(135deg, #00D4FF 0%, #FF6B35 50%, #00D4FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              backgroundSize: '200% 200%',
              animation: 'gradientShift 3s ease-in-out infinite',
            }}
          >
            Full Sail Tech Talk
            <br />
            <span className="relative">
              Alumni Network
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-orange-400 rounded-full"></div>
            </span>
          </Typography>
          <Typography variant="h5" component="p" className="mb-8 text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Connect with fellow Full Sail developers, share real-world insights, and collaborate on projects that matter.
          </Typography>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="contained"
              size="large"
              className="bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-black font-bold px-8 py-4 rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-400/25"
              startIcon={<RocketLaunch />}
            >
              Join the Network
            </Button>
            <Button
              variant="outlined"
              size="large"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-2xl backdrop-blur-sm"
              startIcon={<MenuBook />}
            >
              View Projects
            </Button>
          </div>
        </div>
      </div>
      {}
      <Grid container spacing={6} className="mb-16">
        <Grid item xs={12} md={4}>
          <Card className="h-full bg-gradient-to-br from-cyan-400/5 to-blue-600/5 border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/20 group cursor-pointer">
            <CardContent className="text-center p-8 relative overflow-hidden">
              {}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-blue-600/0 group-hover:from-cyan-400/5 group-hover:to-blue-600/5 transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                  <Article className="text-black text-3xl" />
                </div>
                <Typography variant="h5" component="h2" gutterBottom className="font-bold text-white">
                  Tech Blog
                </Typography>
                <Typography variant="body1" className="text-gray-300 leading-relaxed">
                  Share tutorials, project breakdowns, and lessons learned. Vote on helpful content and discuss with peers.
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="h-full bg-gradient-to-br from-orange-400/5 to-pink-600/5 border border-orange-400/20 hover:border-orange-400/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-400/20 group cursor-pointer">
            <CardContent className="text-center p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/0 to-pink-600/0 group-hover:from-orange-400/5 group-hover:to-pink-600/5 transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-orange-400 to-pink-600 flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                  <People className="text-black text-3xl" />
                </div>
                <Typography variant="h5" component="h2" gutterBottom className="font-bold text-white">
                  Developer Profiles
                </Typography>
                <Typography variant="body1" className="text-gray-300 leading-relaxed">
                  Browse alumni profiles, check out their projects, and connect with developers in your stack.
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="h-full bg-gradient-to-br from-purple-400/5 to-violet-600/5 border border-purple-400/20 hover:border-purple-400/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-400/20 group cursor-pointer">
            <CardContent className="text-center p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/0 to-violet-600/0 group-hover:from-purple-400/5 group-hover:to-violet-600/5 transition-all duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-400 to-violet-600 flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                  <Work className="text-black text-3xl" />
                </div>
                <Typography variant="h5" component="h2" gutterBottom className="font-bold text-white">
                  Project Board
                </Typography>
                <Typography variant="body1" className="text-gray-300 leading-relaxed">
                  Share project ideas, find collaborators, and get feedback on your tech stack choices.
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {}
      <div className="relative rounded-3xl p-8 bg-gradient-to-r from-black/20 via-gray-900/20 to-black/20 backdrop-blur-xl border border-white/10 mb-16">
        <Typography 
          variant="h3" 
          component="h2" 
          gutterBottom 
          className="text-center mb-12 font-bold"
          sx={{
            background: 'linear-gradient(135deg, #00D4FF 0%, #FF6B35 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Community Stats
        </Typography>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} md={3}>
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <TrendingUp className="text-black text-2xl" />
              </div>
              <Typography 
                variant="h2" 
                component="div" 
                className="font-black mb-2"
                sx={{
                  background: 'linear-gradient(135deg, #00D4FF 0%, #0099CC 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                127
              </Typography>
              <Typography variant="body1" className="text-gray-400 font-medium">
                Alumni Members
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-400 to-pink-600 flex items-center justify-center">
                <Article className="text-black text-2xl" />
              </div>
              <Typography 
                variant="h2" 
                component="div" 
                className="font-black mb-2"
                sx={{
                  background: 'linear-gradient(135deg, #FF6B35 0%, #CC4522 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                89
              </Typography>
              <Typography variant="body1" className="text-gray-400 font-medium">
                Blog Posts
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-400 to-violet-600 flex items-center justify-center">
                <Work className="text-black text-2xl" />
              </div>
              <Typography 
                variant="h2" 
                component="div" 
                className="font-black mb-2"
                sx={{
                  background: 'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                43
              </Typography>
              <Typography variant="body1" className="text-gray-400 font-medium">
                Active Projects
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <div className="text-center group hover:scale-110 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center">
                <People className="text-black text-2xl" />
              </div>
              <Typography 
                variant="h2" 
                component="div" 
                className="font-black mb-2"
                sx={{
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                2.4K
              </Typography>
              <Typography variant="body1" className="text-gray-400 font-medium">
                Connections
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};
export default Home;

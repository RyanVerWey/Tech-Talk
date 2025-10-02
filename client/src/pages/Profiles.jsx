import React from 'react';
import { Typography, Container, Box, Button } from '@mui/material';
import { Add, FilterList } from '@mui/icons-material';
import { PageTitle, ProfileCard, CardSkeleton } from '../components';

// Mock alumni data
const mockAlumni = [
  {
    id: 1,
    name: 'Sarah Chen',
    avatar: 'https://via.placeholder.com/100x100?text=SC&bg=6366f1&color=white',
    bio: 'Full-stack developer passionate about React and Node.js. Currently building scalable web applications at a fintech startup.',
    portfolio: 'https://sarahchen.dev',
    github: 'https://github.com/sarahchen',
    linkedin: 'https://linkedin.com/in/sarahchen',
    technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB', 'GraphQL'],
    joinDate: '2023-06-15T00:00:00Z',
    graduation: '2023',
    location: 'San Francisco, CA'
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    avatar: 'https://via.placeholder.com/100x100?text=MJ&bg=059669&color=white',
    bio: 'Mobile app developer specializing in React Native. Love creating beautiful user experiences and solving complex problems.',
    portfolio: 'https://marcusjohnson.io',
    github: 'https://github.com/marcusj',
    linkedin: 'https://linkedin.com/in/marcusjohnson',
    technologies: ['React Native', 'Swift', 'Kotlin', 'Firebase', 'Redux'],
    joinDate: '2022-08-20T00:00:00Z',
    graduation: '2022',
    location: 'Austin, TX'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    avatar: 'https://via.placeholder.com/100x100?text=ER&bg=dc2626&color=white',
    bio: 'DevOps engineer and cloud architect. Passionate about automation, CI/CD, and building robust infrastructure.',
    portfolio: 'https://emilyrodriguez.tech',
    github: 'https://github.com/emilyrod',
    linkedin: 'https://linkedin.com/in/emilyrodriguez',
    technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Python', 'Jenkins'],
    joinDate: '2021-09-10T00:00:00Z',
    graduation: '2021',
    location: 'Seattle, WA'
  },
  {
    id: 4,
    name: 'David Kim',
    avatar: 'https://via.placeholder.com/100x100?text=DK&bg=7c3aed&color=white',
    bio: 'Data scientist and machine learning engineer. Turning data into insights and building intelligent applications.',
    portfolio: 'https://davidkim.ai',
    github: 'https://github.com/davidkim',
    linkedin: 'https://linkedin.com/in/davidkim-ml',
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'SQL', 'Pandas', 'Scikit-learn'],
    joinDate: '2020-05-25T00:00:00Z',
    graduation: '2020',
    location: 'New York, NY'
  },
  {
    id: 5,
    name: 'Jessica Park',
    avatar: 'https://via.placeholder.com/100x100?text=JP&bg=ea580c&color=white',
    bio: 'Frontend architect and UX developer. Specializing in modern frameworks and creating delightful user interfaces.',
    portfolio: 'https://jessicapark.design',
    github: 'https://github.com/jesspark',
    linkedin: 'https://linkedin.com/in/jessicapark',
    technologies: ['Vue.js', 'React', 'SCSS', 'Figma', 'TypeScript', 'Vite'],
    joinDate: '2024-01-12T00:00:00Z',
    graduation: '2024',
    location: 'Miami, FL'
  },
  {
    id: 6,
    name: 'Alex Thompson',
    avatar: 'https://via.placeholder.com/100x100?text=AT&bg=0891b2&color=white',
    bio: 'Backend engineer focused on microservices and distributed systems. Building scalable APIs that power millions of users.',
    portfolio: 'https://alexthompson.dev',
    github: 'https://github.com/alexthompson',
    linkedin: 'https://linkedin.com/in/alex-thompson-dev',
    technologies: ['Go', 'PostgreSQL', 'Redis', 'Kafka', 'Docker', 'gRPC'],
    joinDate: '2023-03-08T00:00:00Z',
    graduation: '2023',
    location: 'Denver, CO'
  },
  {
    id: 7,
    name: 'Aisha Patel',
    avatar: 'https://via.placeholder.com/100x100?text=AP&bg=be185d&color=white',
    bio: 'Cybersecurity specialist and penetration tester. Protecting digital assets and educating teams about security best practices.',
    portfolio: 'https://aishapatel.security',
    github: 'https://github.com/aishapatel',
    linkedin: 'https://linkedin.com/in/aisha-patel-security',
    technologies: ['Kali Linux', 'Metasploit', 'Wireshark', 'Python', 'Nessus', 'Burp Suite'],
    joinDate: '2022-11-03T00:00:00Z',
    graduation: '2022',
    location: 'Washington, DC'
  },
  {
    id: 8,
    name: 'Ryan Martinez',
    avatar: 'https://via.placeholder.com/100x100?text=RM&bg=059669&color=white',
    bio: 'Game developer and AR/VR enthusiast. Creating immersive experiences that blur the line between reality and digital worlds.',
    portfolio: 'https://ryanmartinez.games',
    github: 'https://github.com/ryanmartinez',
    linkedin: 'https://linkedin.com/in/ryan-martinez-gamedev',
    technologies: ['Unity', 'C#', 'Unreal Engine', 'WebXR', 'Three.js', 'Blender'],
    joinDate: '2021-04-18T00:00:00Z',
    graduation: '2021',
    location: 'Los Angeles, CA'
  },
  {
    id: 9,
    name: 'Zoe Williams',
    avatar: 'https://via.placeholder.com/100x100?text=ZW&bg=7c2d12&color=white',
    bio: 'Product manager and technical lead. Bridging the gap between business needs and engineering solutions at scale.',
    portfolio: 'https://zoewilliams.pm',
    github: 'https://github.com/zoewilliams',
    linkedin: 'https://linkedin.com/in/zoe-williams-pm',
    technologies: ['Jira', 'Figma', 'SQL', 'Analytics', 'A/B Testing', 'Scrum'],
    joinDate: '2020-07-22T00:00:00Z',
    graduation: '2020',
    location: 'Chicago, IL'
  },
  {
    id: 10,
    name: 'Jordan Lee',
    avatar: 'https://via.placeholder.com/100x100?text=JL&bg=4338ca&color=white',
    bio: 'Blockchain developer and crypto enthusiast. Building decentralized applications and smart contracts for the future.',
    portfolio: 'https://jordanlee.crypto',
    github: 'https://github.com/jordanlee',
    linkedin: 'https://linkedin.com/in/jordan-lee-blockchain',
    technologies: ['Solidity', 'Web3.js', 'Ethereum', 'IPFS', 'Hardhat', 'React'],
    joinDate: '2023-09-14T00:00:00Z',
    graduation: '2023',
    location: 'Boston, MA'
  },
  {
    id: 11,
    name: 'Carmen Silva',
    avatar: 'https://via.placeholder.com/100x100?text=CS&bg=be123c&color=white',
    bio: 'QA engineer and automation specialist. Ensuring software quality through comprehensive testing and innovative automation.',
    portfolio: 'https://carmensilva.qa',
    github: 'https://github.com/carmensilva',
    linkedin: 'https://linkedin.com/in/carmen-silva-qa',
    technologies: ['Selenium', 'Jest', 'Cypress', 'TestRail', 'Postman', 'Jenkins'],
    joinDate: '2022-02-28T00:00:00Z',
    graduation: '2022',
    location: 'Tampa, FL'
  },
  {
    id: 12,
    name: 'Michael Chang',
    avatar: 'https://via.placeholder.com/100x100?text=MC&bg=0d9488&color=white',
    bio: 'Site reliability engineer maintaining 99.9% uptime. Passionate about monitoring, alerting, and incident response.',
    portfolio: 'https://michaelchang.sre',
    github: 'https://github.com/michaelchang',
    linkedin: 'https://linkedin.com/in/michael-chang-sre',
    technologies: ['Prometheus', 'Grafana', 'Kubernetes', 'Ansible', 'Datadog', 'Bash'],
    joinDate: '2021-12-05T00:00:00Z',
    graduation: '2021',
    location: 'Portland, OR'
  },
  {
    id: 13,
    name: 'Isabella Torres',
    avatar: 'https://via.placeholder.com/100x100?text=IT&bg=9333ea&color=white',
    bio: 'AI/ML researcher focused on computer vision and natural language processing. Published author in top-tier conferences.',
    portfolio: 'https://isabellatorres.ai',
    github: 'https://github.com/isabellatorres',
    linkedin: 'https://linkedin.com/in/isabella-torres-ai',
    technologies: ['PyTorch', 'OpenCV', 'Transformers', 'CUDA', 'NumPy', 'Jupyter'],
    joinDate: '2024-05-17T00:00:00Z',
    graduation: '2024',
    location: 'Palo Alto, CA'
  },
  {
    id: 14,
    name: 'Tyler Brooks',
    avatar: 'https://via.placeholder.com/100x100?text=TB&bg=ea580c&color=white',
    bio: 'Technical writer and developer advocate. Making complex technologies accessible through clear documentation and tutorials.',
    portfolio: 'https://tylerbrooks.writes',
    github: 'https://github.com/tylerbrooks',
    linkedin: 'https://linkedin.com/in/tyler-brooks-techwriter',
    technologies: ['Markdown', 'Docusaurus', 'Git', 'APIs', 'Technical Writing', 'Video'],
    joinDate: '2023-01-19T00:00:00Z',
    graduation: '2023',
    location: 'Nashville, TN'
  },
  {
    id: 15,
    name: 'Samantha Wu',
    avatar: 'https://via.placeholder.com/100x100?text=SW&bg=dc2626&color=white',
    bio: 'Database administrator and performance optimization expert. Scaling systems to handle millions of transactions daily.',
    portfolio: 'https://samanthawu.db',
    github: 'https://github.com/samanthawu',
    linkedin: 'https://linkedin.com/in/samantha-wu-dba',
    technologies: ['PostgreSQL', 'MySQL', 'Oracle', 'Redis', 'MongoDB', 'Performance Tuning'],
    joinDate: '2020-10-12T00:00:00Z',
    graduation: '2020',
    location: 'Phoenix, AZ'
  }
];

const Profiles = () => {
  const [loading] = React.useState(false);

  const handleProfileClick = (profile) => {
    console.log('View profile:', profile.name);
    // TODO: Navigate to detailed profile view
  };



  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Subtle background particles for consistency */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[8%] left-[12%] w-1.5 h-1.5 bg-cyan-400/30 rounded-full animate-slow-ping" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-[25%] right-[8%] w-1 h-1 bg-purple-400/25 rounded-full animate-slow-ping" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-[20%] left-[15%] w-1.5 h-1.5 bg-orange-400/30 rounded-full animate-slow-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-[35%] right-[20%] w-1 h-1 bg-cyan-400/25 rounded-full animate-slow-ping" style={{animationDelay: '3s'}}></div>
      </div>

      <Container maxWidth="lg" className="relative z-10 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <PageTitle 
            title="Alumni Network" 
            subtitle="Connect with FSU tech graduates making their mark in the industry"
          />
          <div className="flex space-x-3">
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400/50"
            >
              Filter
            </Button>
            <Button
              variant="contained"
              startIcon={<Add />}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105"
            >
              Add Profile
            </Button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="backdrop-blur-xl bg-black/20 border border-white/10 rounded-xl p-4 text-center">
            <Typography variant="h4" className="font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {mockAlumni.length}
            </Typography>
            <Typography variant="body2" className="text-white/60">
              Alumni Members
            </Typography>
          </div>
          <div className="backdrop-blur-xl bg-black/20 border border-white/10 rounded-xl p-4 text-center">
            <Typography variant="h4" className="font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              25
            </Typography>
            <Typography variant="body2" className="text-white/60">
              Companies
            </Typography>
          </div>
          <div className="backdrop-blur-xl bg-black/20 border border-white/10 rounded-xl p-4 text-center">
            <Typography variant="h4" className="font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              12
            </Typography>
            <Typography variant="body2" className="text-white/60">
              Cities
            </Typography>
          </div>
          <div className="backdrop-blur-xl bg-black/20 border border-white/10 rounded-xl p-4 text-center">
            <Typography variant="h4" className="font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              5
            </Typography>
            <Typography variant="body2" className="text-white/60">
              Grad Years
            </Typography>
          </div>
        </div>

        {/* Alumni Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={index} showAvatar lines={3} />
            ))
          ) : (
            // Alumni profile cards
            mockAlumni.map((alumni) => (
              <ProfileCard
                key={alumni.id}
                user={alumni}
                onClick={() => handleProfileClick(alumni)}
              />
            ))
          )}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button
            variant="outlined"
            className="border-white/20 text-white/80 hover:bg-white/5 hover:border-white/40 px-8 py-2"
          >
            Load More Alumni
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Profiles;
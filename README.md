# Full Sail Web Development Alumni Network

**Tech Talk Alumni Network** - A comprehensive professional networking platform connecting Full Sail University Web Development graduates.

[![Live Application](https://img.shields.io/badge/Live%20App-Heroku-430098?style=for-the-badge)](https://techtalk-alumni-network-14798df9fc24.herokuapp.com/)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/RyanVerWey/Tech-Talk)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](./LICENSE)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features) 
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Overview

The Full Sail Web Development Alumni Network is a modern, full-stack web application designed to foster professional connections among Full Sail University Web Development graduates. The platform provides a comprehensive suite of networking tools including user authentication, profile management, project showcasing, and community engagement features.

### Live Application
**Production URL:** [https://techtalk-alumni-network-14798df9fc24.herokuapp.com/](https://techtalk-alumni-network-14798df9fc24.herokuapp.com/)

### Project Status
- **Current Version:** 1.0.0
- **Status:** Production Ready
- **Last Updated:** October 2025
- **Deployment:** Heroku (v50)

---

## Features

### Core Functionality

**User Authentication & Authorization**
- Google OAuth 2.0 integration with secure JWT token management
- Role-based access control with user permissions
- Automated token refresh and session management
- Secure cookie handling for production environments

**Alumni Profile Management**
- Comprehensive user profiles with graduation year, location, and bio
- Social media integration (GitHub, LinkedIn, Portfolio)
- Tech stack showcase with skill validation
- Profile image upload and management
- Network membership controls

**Community Features**
- Blog post creation with rich content support
- Voting and rating system for community content  
- Project showcase and collaboration tools
- Real-time alumni directory with search and filtering
- Responsive design optimized for all devices

**Administrative Tools**
- Health monitoring and system status dashboard
- Database connection validation
- Error logging and monitoring
- Performance metrics and analytics

---

## Technology Stack

### Frontend Architecture
```
React 19.0          - Modern component-based UI framework
Vite 7.1            - Next-generation build tool and dev server  
Tailwind CSS 3.4    - Utility-first CSS framework
Material UI 6.1     - React component library
React Router 6.0    - Declarative routing for React
Axios 1.7           - HTTP client for API communication
```

### Backend Architecture  
```
Node.js 20.x        - JavaScript runtime environment
Express.js 4.21     - Web application framework
MongoDB Atlas       - Cloud-hosted NoSQL database
Mongoose 8.7        - MongoDB object modeling library
Passport.js 0.7     - Authentication middleware
JWT Tokens          - Secure stateless authentication
Helmet 8.0          - Security middleware suite
```

### Development & Deployment
```
ESLint 9.12         - Code quality and style enforcement  
Prettier            - Code formatting and consistency
Concurrently        - Parallel script execution
Heroku              - Cloud platform deployment
Git/GitHub          - Version control and collaboration
```

---

## Architecture

### System Design

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client App    │    │   API Server    │    │   Database      │
│                 │    │                 │    │                 │
│  React + Vite   │◄──►│  Express.js     │◄──►│  MongoDB Atlas  │
│  Tailwind CSS   │    │  Passport.js    │    │  Mongoose ODM   │
│  Material UI    │    │  JWT Auth       │    │  User Profiles  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Security Architecture
- **Authentication:** Google OAuth 2.0 with JWT tokens
- **Authorization:** Role-based access control (RBAC)
- **Data Protection:** Helmet security headers and CORS configuration
- **Session Management:** HTTP-only cookies with secure flags
- **Input Validation:** Server-side validation and sanitization

---

## Installation

### Prerequisites

Ensure the following software is installed on your development machine:

```bash
Node.js (v20.x or higher)  - https://nodejs.org/
Git (latest version)       - https://git-scm.com/
MongoDB (optional local)   - https://mongodb.com/
```

### Local Development Setup

**1. Clone Repository**
```bash
git clone https://github.com/RyanVerWey/Tech-Talk.git
cd Tech-Talk

# Install project dependencies
npm install

# Install client dependencies
cd client && npm install

# Install server dependencies  
cd ../server && npm install

# Return to project root
cd ..
```

**2. Environment Configuration**
```bash
# Create environment files from templates
cp server/.env.example server/.env
cp client/.env.example client/.env
```

**3. Configure Server Environment** (`server/.env`)
```bash
# Application Configuration
NODE_ENV=development
PORT=3002
CLIENT_URL=http://localhost:5173

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/alumni-network
# OR use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/alumni-network

# Authentication Configuration
JWT_SECRET=your_secure_jwt_secret_minimum_32_characters
SESSION_SECRET=your_secure_session_secret_minimum_32_characters

# Google OAuth Credentials (Required - See Configuration Section)
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret

# Security Configuration
COOKIE_DOMAIN=localhost
```

**4. Configure Client Environment** (`client/.env`)
```bash
# API Configuration
VITE_API_URL=http://localhost:3002
```

**5. Start Development Servers**
```bash
# Start both client and server concurrently
npm run dev

# Or start individually:
npm run client    # Runs on http://localhost:5173
npm run server    # Runs on http://localhost:3002
```

---

## Configuration

### Google OAuth 2.0 Setup

**Step 1: Create Google Cloud Project**
1. Navigate to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project: "Full Sail Alumni Network"
3. Enable Google+ API and Google Auth API

**Step 2: Configure OAuth Consent Screen**
1. Navigate to "APIs & Services" → "OAuth consent screen"
2. Select "External" user type
3. Configure application details:
   - App name: "Full Sail Web Dev Alumni Network"
   - User support email: your email
   - Developer contact information: your email

**Step 3: Create OAuth Credentials**
1. Navigate to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
2. Application type: "Web application"
3. Authorized redirect URIs:
   - Development: `http://localhost:3002/api/auth/google/callback`
   - Production: `https://your-app-name.herokuapp.com/api/auth/google/callback`

### Database Configuration

**Option A: Local MongoDB**
```bash
# Install MongoDB locally
brew install mongodb/brew/mongodb-community  # macOS
# OR download from https://www.mongodb.com/try/download/community

# Start MongoDB service
brew services start mongodb/brew/mongodb-community
# OR mongod --dbpath /path/to/your/db
```

**Option B: MongoDB Atlas (Recommended)**
1. Create free account at [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create new cluster
3. Configure database user and network access
4. Get connection string and update `MONGODB_URI` in `.env`

---

## Deployment

### Heroku Deployment

**Prerequisites**
- Heroku CLI installed
- Heroku account created
- Git repository initialized

**Deployment Steps**

```bash
# Login to Heroku
heroku login

# Create Heroku application
heroku create your-app-name

# Configure environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_production_jwt_secret
heroku config:set SESSION_SECRET=your_production_session_secret
heroku config:set MONGODB_URI=your_production_mongodb_uri
heroku config:set GOOGLE_CLIENT_ID=your_google_client_id
heroku config:set GOOGLE_CLIENT_SECRET=your_google_client_secret
heroku config:set CLIENT_URL=https://your-app-name.herokuapp.com

# Deploy to Heroku
git add .
git commit -m "Deploy to production"
git push heroku main

# Open deployed application
heroku open
```

### Environment Variables Reference

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `NODE_ENV` | Application environment | Yes | `production` |
| `PORT` | Server port | No | `3002` |
| `CLIENT_URL` | Frontend URL | Yes | `https://app.herokuapp.com` |
| `MONGODB_URI` | Database connection string | Yes | `mongodb+srv://...` |
| `JWT_SECRET` | JWT token encryption key | Yes | `32+ character string` |
| `SESSION_SECRET` | Session encryption key | Yes | `32+ character string` |
| `GOOGLE_CLIENT_ID` | OAuth client identifier | Yes | `google_client_id` |
| `GOOGLE_CLIENT_SECRET` | OAuth client secret | Yes | `google_client_secret` |

---

## API Documentation

### Authentication Endpoints

```
POST   /api/auth/google              - Initiate Google OAuth flow
GET    /api/auth/google/callback     - Handle OAuth callback
GET    /api/auth/me                  - Get current user profile  
POST   /api/auth/refresh             - Refresh access token
POST   /api/auth/logout              - Logout and revoke tokens
```

### Profile Management Endpoints

```
GET    /api/profiles/all             - Get all alumni profiles
GET    /api/profiles/me              - Get current user profile
PUT    /api/profiles/me              - Update current user profile
POST   /api/profiles/join            - Join alumni network
DELETE /api/profiles/leave           - Leave alumni network
```

### System Endpoints

```
GET    /api/health                   - System health check
GET    /api/health/detailed          - Detailed system status
```

### Response Format

All API responses follow this consistent format:

```json
{
  "success": boolean,
  "data": object | array | null,
  "message": string,
  "error": string | null
}
```

---

## Security

### Security Measures Implemented

**Authentication & Authorization**
- Google OAuth 2.0 with JWT token management
- HTTP-only cookies for secure token storage  
- Role-based access control (RBAC)
- Automated token refresh and expiration handling

**Data Protection**
- Helmet.js security headers
- CORS configuration with origin validation
- Input validation and sanitization
- MongoDB injection protection via Mongoose

**Production Security**
- Environment variable protection
- Secure cookie configuration
- Rate limiting on authentication endpoints
- Error message sanitization

**Security Best Practices**
- No sensitive data in client-side code
- Regular dependency updates and vulnerability scanning
- Secure deployment configuration
- Database connection encryption

---

## Contributing

### Development Workflow

**1. Fork and Clone**
```bash
# Fork the repository on GitHub
git clone https://github.com/your-username/Tech-Talk.git
cd Tech-Talk
```

**2. Create Feature Branch**
```bash
git checkout -b feature/your-feature-name
```

**3. Development Guidelines**
- Follow existing code style and conventions
- Write comprehensive commit messages
- Test all functionality before committing
- Update documentation for new features

**4. Code Quality Standards**
```bash
# Run linting
npm run lint

# Run tests (when available)
npm run test

# Build for production
npm run build
```

**5. Submit Pull Request**
- Provide detailed description of changes
- Include screenshots for UI changes
- Reference any related issues

### Project Structure

```
Tech-Talk/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route-level components  
│   │   ├── contexts/       # React context providers
│   │   └── assets/         # Static assets
│   ├── public/             # Public static files
│   └── package.json        # Client dependencies
├── server/                 # Express.js backend
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── models/         # Mongoose database models
│   │   ├── middleware/     # Express middleware
│   │   ├── config/         # Configuration files
│   │   └── utils/          # Utility functions
│   └── package.json        # Server dependencies
├── package.json            # Root package configuration
├── Procfile               # Heroku deployment configuration
└── README.md              # Project documentation
```

---

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## Contact

**Project Maintainer:** Ryan VerWey  
**Email:** ryan.w.verwey@gmail.com  
**GitHub:** [@RyanVerWey](https://github.com/RyanVerWey)  
**LinkedIn:** [Ryan VerWey](https://www.linkedin.com/in/ryan-verwey/)

**Project Repository:** [https://github.com/RyanVerWey/Tech-Talk](https://github.com/RyanVerWey/Tech-Talk)  
**Live Application:** [https://techtalk-alumni-network-14798df9fc24.herokuapp.com/](https://techtalk-alumni-network-14798df9fc24.herokuapp.com/)

---

**Full Sail University Web Development Alumni Network** - Connecting graduates, fostering collaboration, building careers.

*Built with modern web technologies and deployed on enterprise-grade infrastructure.*
1. In the left sidebar, go to "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click on it and press "Enable"

#### 3.3 Configure OAuth Consent Screen
1. Go to "APIs & Services" → "OAuth consent screen"
2. Select "External" (unless you have G Suite)
3. Fill required fields:
   - **App name**: Tech Talk Alumni Network
   - **User support email**: Your email
   - **Developer contact**: Your email
4. Click "Save and Continue"
5. Skip "Scopes" screen (click "Save and Continue")
6. Add test users (your email addresses) if in testing mode
7. Click "Save and Continue"

#### 3.4 Create OAuth Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client IDs"
3. Select "Web application"
4. Name: "Tech Talk Alumni Auth"
5. **Authorized JavaScript origins**:
   - `http://localhost:5173` (React dev server)
   - `http://localhost:5000` (Express server)
6. **Authorized redirect URIs**:
   - `http://localhost:5000/api/auth/google/callback`
7. Click "Create"
8. **COPY the Client ID and Client Secret** to your `server/.env` file

### Step 4: Database Setup (Windows)

#### Option A: Local MongoDB (Easier for development)

1. **Download MongoDB Community Server**:
   - Go to [MongoDB Community Server Download](https://www.mongodb.com/try/download/community)
   - Select "Windows" platform
   - Choose "msi" package format
   - Click "Download"

2. **Install MongoDB**:
   - Run the downloaded `.msi` file as Administrator
   - Choose "Complete" installation
   - **Important**: Check "Install MongoDB as a Service"
   - **Important**: Check "Run service as Network Service user"
   - Install MongoDB Compass (GUI) - optional but recommended
   - Click "Install"

3. **Verify Installation**:
   - MongoDB should auto-start as a Windows service
   - Open Command Prompt or PowerShell and test:
   ```bash
   # Test if MongoDB is running
   mongosh
   # Should connect to mongodb://127.0.0.1:27017
   # Type 'exit' to close the shell
   ```

4. **If MongoDB doesn't start automatically**:
   ```bash
   # Start MongoDB service manually
   net start MongoDB
   
   # To stop (if needed)
   net stop MongoDB
   ```

#### Option B: MongoDB Atlas (Cloud - Better for production)

1. **Create Atlas Account**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up with your Google account
   - Select "Shared" (Free tier)

2. **Create Cluster**:
   - Choose "AWS" provider
   - Select closest region
   - Cluster name: "alumni-network-cluster"
   - Click "Create Cluster" (takes 3-5 minutes)

3. **Setup Database Access**:
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Username: `admin`
   - Password: Generate secure password (save it!)
   - Role: "Atlas Admin"
   - Click "Add User"

4. **Setup Network Access**:
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**:
   - Go to "Databases" tab
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Update `MONGODB_URI` in `server/.env`

### Step 5: Start Development

```bash
# From the project root, start both servers
npm run dev
```

This will start:
- **Frontend (React)**: http://localhost:5173
- **Backend (Express)**: http://localhost:5000

### Step 6: Verify Setup

1. **Check Frontend**: Open http://localhost:5173
   - Should see the Alumni Network homepage
   - Navigation should work

2. **Check Backend**: Open http://localhost:5000/api/health
   - Should see: `{"success": true, "message": "API is healthy", ...}`

3. **Check Database Connection**: Look at server terminal
   - Should see: "MongoDB Connected: ..."

4. **Test Google Login**: 
   - Click "Login" button
   - Should redirect to Google OAuth (will fail until backend auth is implemented)

## Troubleshooting

### Common Issues & Solutions

#### "Cannot find module 'concurrently'"
```bash
# Install root dependencies
npm install
```

#### "MongoDB connection failed"
```bash
# Start MongoDB service on Windows
net start MongoDB

# Or check if service is running
services.msc
# Look for "MongoDB" service and ensure it's "Running"

# Or check Atlas connection string format if using cloud
```

#### "Google OAuth Error"
- Verify redirect URIs in Google Console exactly match
- Check that APIs are enabled
- Ensure OAuth consent screen is configured

#### "Port already in use"
```bash
# Kill processes on ports 5000 or 5173
npx kill-port 5000
npx kill-port 5173
```

#### "Module not found" errors
```bash
# Reinstall dependencies (Windows)
rmdir /s node_modules client\node_modules server\node_modules
npm run install:all

# Or using PowerShell
Remove-Item -Recurse -Force node_modules, client\node_modules, server\node_modules
npm run install:all
```

### Getting Help

1. **Check server terminal** for detailed error messages
2. **Check browser console** for client-side errors (F12 → Console tab)
3. **Verify environment variables** are set correctly
4. **Run as Administrator** if you get permission errors
5. **Check Windows Defender/Antivirus** - may block MongoDB or Node.js

## Important Security Notes

- **Never commit `.env` files** to Git (they're in `.gitignore`)
- **Use strong JWT secrets** (minimum 32 characters)
- **Keep Google OAuth secrets private**
- **Use HTTPS in production**

## Project Structure

```
Tech-Talk/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
├── server/                # Node.js backend
│   ├── src/
│   │   ├── config/        # Database & app config
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   └── index.js       # Server entry point
│   └── package.json
└── package.json           # Root package.json
```

## Development Milestones

### Milestone 1: Bootstrap & Architecture (Days 1-2) - COMPLETED
- [x] Monorepo setup with client/server
- [x] React + Vite + Tailwind + MUI integration
- [x] Basic routing and layout
- [x] Express server with health endpoint
- [x] Shared UI components foundation

### Milestone 2: Auth & Data Layer (Days 3-4) - IN PROGRESS
- [ ] MongoDB Atlas integration
- [ ] User model and JWT authentication
- [ ] Google OAuth 2.0 flow
- [ ] Auth middleware and /api/me endpoint
- [ ] Frontend auth context and guards

### Milestone 3: Profiles & Blog MVP (Days 5-7) - PLANNED
- [ ] User profile schema and API
- [ ] Profile UI (view/edit)
- [ ] Blog post model and CRUD API
- [ ] Voting and rating system
- [ ] Blog UI with create/read/vote functionality

### Milestone 4: Project Primers (Days 8-10) - PLANNED
- [ ] Project primer model and API
- [ ] Frontend form for creating primers
- [ ] Technology stack management
- [ ] Integration with user profiles

### Milestone 5: Deployment & Open Source (Days 11-14) - PLANNED
- [ ] Heroku deployment setup
- [ ] MongoDB Atlas add-on configuration
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Security audit and performance optimization
- [ ] Open source documentation and contribution guidelines

## Testing

```bash
# Run all tests
npm run test

# Run client tests
npm run client:test

# Run server tests
npm run server:test
```

## Production Deployment

### Heroku Deployment

1. **Create Heroku Apps**
   ```bash
   heroku create alumni-network-api
   heroku create alumni-network-web
   ```

2. **Configure Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production --app alumni-network-api
   heroku config:set MONGODB_URI=<your-atlas-connection-string> --app alumni-network-api
   # ... other environment variables
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributors

- Tech Talk Community

## Acknowledgments

- Material UI team for the excellent component library
- Tailwind CSS for the utility-first CSS framework
- The entire open-source community

---

**Built by the Tech Talk Community**
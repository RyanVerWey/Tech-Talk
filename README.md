# Tech Talk Alumni Network

A comprehensive alumni networking platform built with React, Vite, Tailwind CSS, Material UI, Node.js, Express, and MongoDB.

## Features

- **Authentication**: Google OAuth 2.0 integration
- **Blog System**: Create, read, vote, and rate blog posts
- **Alumni Profiles**: Showcase portfolio, GitHub, and LinkedIn profiles
- **Project Primers**: Share and collaborate on project ideas
- **Responsive Design**: Mobile-first approach with Tailwind CSS and Material UI

## Tech Stack

### Frontend
- React 19
- Vite 7
- Tailwind CSS 3
- Material UI 6
- React Router 6
- React Query 5
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Passport.js (Google OAuth)
- JWT Authentication
- Helmet & Security middleware

## Prerequisites

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/downloads)
- **MongoDB** (local installation OR Atlas account)
- **Google Account** for OAuth credentials
- **Heroku Account** for deployment (when ready)

## Complete Setup Guide

### Step 1: Clone Repository & Install Dependencies

```bash
# Clone the repository (replace with your actual repo URL)
git clone https://github.com/RyanVerWey/Tech-Talk.git
cd Tech-Talk

# Install root dependencies (concurrently, etc.)
npm install

# Install all project dependencies (client + server)
npm run install:all
```

### Step 2: Environment Configuration

```bash
# Copy environment template files
cp server/.env.example server/.env
cp client/.env.example client/.env
```

**Edit `server/.env`** with these values:
```bash
# Environment
NODE_ENV=development

# Server
PORT=5000
CLIENT_URL=http://localhost:5173

# Database (see Step 4 for MongoDB setup)
MONGODB_URI=mongodb://localhost:27017/alumni-network

# JWT (generate a random string)
JWT_SECRET=your_super_long_random_jwt_secret_key_here_make_it_at_least_32_characters

# Google OAuth (see Step 3 for setup)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# Cookies
COOKIE_DOMAIN=localhost
```

**Edit `client/.env`**:
```bash
# API URL for development
VITE_API_URL=http://localhost:5000
```

### Step 3: Google OAuth Setup (REQUIRED)

#### 3.1 Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a Project" → "New Project"
3. Enter project name: "Tech Talk Alumni Network"
4. Click "Create"

#### 3.2 Enable APIs
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
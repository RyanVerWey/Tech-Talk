import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import session from 'express-session';
import { connectDB } from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';
import passport from './config/passport.js';
import { cleanupExpiredTokens } from './utils/auth.js';

import authRoutes from './routes/auth.js';
import healthRoutes from './routes/health.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.set('trust proxy', 1);

connectDB();
app.use(helmet());
app.use(morgan('combined'));
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(process.cwd(), '../client/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), '../client/dist', 'index.html'));
  });
}

app.use(errorHandler);
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Client URL: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
  console.log(`Database: ${process.env.NODE_ENV === 'production' ? 'MongoDB Atlas' : 'Local MongoDB'}`);
  console.log(`Google OAuth: ${process.env.GOOGLE_CLIENT_ID ? 'Configured' : 'Not configured'}`);
  
  setInterval(() => {
    cleanupExpiredTokens();
  }, 60 * 60 * 1000);
});
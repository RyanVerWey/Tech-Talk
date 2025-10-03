import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import RefreshToken from '../models/RefreshToken.js';

export const generateTokens = async (userId) => {
  try {
    const payload = {
      userId,
      type: 'access'
    };

    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      {
        userId,
        type: 'refresh'
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    await RefreshToken.create({
      token: refreshToken,
      user: userId,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: 15 * 60
    };
  } catch (error) {
    throw new Error('Token generation failed');
  }
};

export const refreshAccessToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    
    const storedToken = await RefreshToken.findOne({
      token: refreshToken,
      user: decoded.userId
    });

    if (!storedToken || !storedToken.isActive) {
      throw new Error('Invalid refresh token');
    }

    const user = await User.findById(decoded.userId);
    if (!user || !user.isActive) {
      throw new Error('User not found or inactive');
    }

    const newAccessToken = jwt.sign(
      {
        userId: decoded.userId,
        type: 'access'
      },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    return {
      accessToken: newAccessToken,
      expiresIn: 15 * 60
    };
  } catch (error) {
    throw new Error('Token refresh failed');
  }
};

export const revokeRefreshToken = async (refreshToken) => {
  try {
    await RefreshToken.findOneAndUpdate(
      { token: refreshToken },
      { isActive: false },
      { new: true }
    );
  } catch (error) {
    throw new Error('Token revocation failed');
  }
};

export const cleanupExpiredTokens = async () => {
  try {
    const result = await RefreshToken.deleteMany({
      $or: [
        { expiresAt: { $lt: new Date() } },
        { isActive: false }
      ]
    });
    
    if (result.deletedCount > 0) {
      console.log(`Cleaned up ${result.deletedCount} expired refresh tokens`);
    }
  } catch (error) {
    console.error('Token cleanup error:', error);
  }
};
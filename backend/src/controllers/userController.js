const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

exports.getProfile = async (req, res, next) => {
  try {
    // TODO: Get user from req.user (set by auth middleware)
    res.status(200).json({ message: 'Get profile (Stub)' });
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    // TODO: Update user details
    res.status(200).json({ message: 'Update profile (Stub)' });
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    // Admin only
    res.status(200).json({ message: 'Get all users (Stub)' });
  } catch (error) {
    next(error);
  }
};

const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

exports.applyLeave = async (req, res, next) => {
  try {
    // TODO: Create leave request
    res.status(201).json({ message: 'Leave requested successfully (Stub)' });
  } catch (error) {
    next(error);
  }
};

exports.getLeaves = async (req, res, next) => {
  try {
    // TODO: Get leaves for user or all leaves if Admin
    res.status(200).json({ message: 'Get leaves (Stub)' });
  } catch (error) {
    next(error);
  }
};

exports.updateLeaveStatus = async (req, res, next) => {
  try {
    // Admin only
    res.status(200).json({ message: 'Leave status updated (Stub)' });
  } catch (error) {
    next(error);
  }
};

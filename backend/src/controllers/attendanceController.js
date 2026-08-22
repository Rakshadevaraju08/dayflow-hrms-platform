const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// Helper to get start of day
const getStartOfDay = () => {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  return d;
};

exports.checkIn = async (req, res, next) => {
  try {
    const today = getStartOfDay();
    
    // Check for existing check-in today
    const existing = await prisma.attendance.findUnique({
      where: {
        employeeId_date: {
          employeeId: req.user.id,
          date: today
        }
      }
    });

    if (existing) {
      return res.status(409).json({ success: false, message: 'Already checked in today' });
    }

    const attendance = await prisma.attendance.create({
      data: {
        employeeId: req.user.id,
        date: today,
        checkIn: new Date(),
        status: 'PRESENT'
      }
    });

    res.status(201).json({
      success: true,
      message: 'Checked in successfully',
      attendance: {
        date: attendance.date.toISOString().split('T')[0],
        checkIn: attendance.checkIn,
        status: attendance.status
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.checkOut = async (req, res, next) => {
  try {
    const today = getStartOfDay();

    const existing = await prisma.attendance.findUnique({
      where: {
        employeeId_date: {
          employeeId: req.user.id,
          date: today
        }
      }
    });

    if (!existing) {
      return res.status(400).json({ success: false, message: 'Cannot check out without checking in first' });
    }

    if (existing.checkOut) {
      return res.status(409).json({ success: false, message: 'Already checked out today' });
    }

    const attendance = await prisma.attendance.update({
      where: { id: existing.id },
      data: {
        checkOut: new Date()
      }
    });

    res.status(200).json({
      success: true,
      message: 'Checked out successfully',
      attendance: {
        date: attendance.date.toISOString().split('T')[0],
        checkIn: attendance.checkIn,
        checkOut: attendance.checkOut,
        status: attendance.status
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const { from, to } = req.query;
    let where = { employeeId: req.user.id };

    if (from || to) {
      where.date = {};
      if (from) where.date.gte = new Date(from);
      if (to) {
        const toDate = new Date(to);
        toDate.setUTCHours(23, 59, 59, 999);
        where.date.lte = toDate;
      }
    }

    const attendances = await prisma.attendance.findMany({
      where,
      orderBy: { date: 'desc' }
    });

    res.status(200).json({
      success: true,
      data: attendances
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllAttendance = async (req, res, next) => {
  try {
    const { from, to, employeeId, status } = req.query;
    let where = {};

    if (employeeId) {
      where.employeeId = employeeId;
    }
    
    if (status) {
      where.status = status;
    }

    if (from || to) {
      where.date = {};
      if (from) where.date.gte = new Date(from);
      if (to) {
        const toDate = new Date(to);
        toDate.setUTCHours(23, 59, 59, 999);
        where.date.lte = toDate;
      }
    }

    const attendances = await prisma.attendance.findMany({
      where,
      orderBy: { date: 'desc' },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    res.status(200).json({
      success: true,
      data: attendances
    });
  } catch (error) {
    next(error);
  }
};

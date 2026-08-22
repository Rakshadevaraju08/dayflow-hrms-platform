const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { successResponse, errorResponse } = require('../utils/responseFormatter');

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const LEAVE_TYPES = ['PAID', 'SICK', 'UNPAID'];
const LEAVE_STATUSES = ['PENDING', 'APPROVED', 'REJECTED'];

const getCurrentUserId = (req) => req.user && req.user.id;

const userSelect = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  role: true,
  profile: {
    select: {
      employeeId: true,
      department: true,
      designation: true
    }
  }
};

const leaveInclude = {
  user: {
    select: userSelect
  }
};

const createHttpError = (message, statusCode = 500, errors = {}) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.errors = errors;
  return error;
};

const isValidUuid = (value) => (
  typeof value === 'string'
  && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
);

const parseDate = (value) => {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const normalizeLeave = (leave) => ({
  id: leave.id,
  userId: leave.userId,
  employee: leave.user,
  leaveType: leave.type,
  startDate: leave.startDate,
  endDate: leave.endDate,
  remarks: leave.reason,
  status: leave.status,
  adminComment: leave.remarks,
  createdAt: leave.createdAt,
  updatedAt: leave.updatedAt
});

const normalizeLeaves = (leaves) => leaves.map(normalizeLeave);

const getCurrentUser = async (req) => {
  const userId = getCurrentUserId(req);

  if (!userId) {
    throw createHttpError('Authentication required', 401);
  }

  if (!isValidUuid(userId)) {
    throw createHttpError('Invalid userId query parameter', 400);
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: userSelect
  });

  if (!user) {
    throw createHttpError('User not found', 404);
  }

  return user;
};

const requireHr = (user) => {
  if (user.role !== 'HR') {
    throw createHttpError('Only HR can perform this action', 403);
  }
};

const validateApplyLeaveBody = (body = {}) => {
  const errors = {};
  const leaveType = body.leaveType;
  const startDate = parseDate(body.startDate);
  const endDate = parseDate(body.endDate);

  if (!leaveType) {
    errors.leaveType = 'leaveType is required';
  } else if (!LEAVE_TYPES.includes(leaveType)) {
    errors.leaveType = 'leaveType must be one of PAID, SICK, UNPAID';
  }

  if (!body.startDate) {
    errors.startDate = 'startDate is required';
  } else if (!startDate) {
    errors.startDate = 'startDate must be a valid date';
  }

  if (!body.endDate) {
    errors.endDate = 'endDate is required';
  } else if (!endDate) {
    errors.endDate = 'endDate must be a valid date';
  }

  if (startDate && endDate && endDate < startDate) {
    errors.endDate = 'endDate cannot be before startDate';
  }

  if (body.remarks !== undefined && body.remarks !== null && typeof body.remarks !== 'string') {
    errors.remarks = 'remarks must be a string';
  }

  if (Object.keys(errors).length > 0) {
    throw createHttpError('Validation failed', 400, errors);
  }

  return {
    leaveType,
    startDate,
    endDate,
    remarks: body.remarks ? body.remarks.trim() : null
  };
};

const validateFilters = (query, allowEmployeeId = false) => {
  const where = {};
  const errors = {};

  if (query.status) {
    if (!LEAVE_STATUSES.includes(query.status)) {
      errors.status = 'status must be one of PENDING, APPROVED, REJECTED';
    } else {
      where.status = query.status;
    }
  }

  if (query.leaveType) {
    if (!LEAVE_TYPES.includes(query.leaveType)) {
      errors.leaveType = 'leaveType must be one of PAID, SICK, UNPAID';
    } else {
      where.type = query.leaveType;
    }
  }

  if (allowEmployeeId && query.employeeId) {
    if (!isValidUuid(query.employeeId)) {
      errors.employeeId = 'employeeId must be a valid user id';
    } else {
      where.userId = query.employeeId;
    }
  }

  const from = parseDate(query.from);
  const to = parseDate(query.to);

  if (query.from && !from) {
    errors.from = 'from must be a valid date';
  }

  if (query.to && !to) {
    errors.to = 'to must be a valid date';
  }

  if (from && to && to < from) {
    errors.to = 'to cannot be before from';
  }

  if (from || to) {
    where.AND = [];

    if (from) {
      where.AND.push({
        endDate: {
          gte: from
        }
      });
    }

    if (to) {
      where.AND.push({
        startDate: {
          lte: to
        }
      });
    }
  }

  if (Object.keys(errors).length > 0) {
    throw createHttpError('Validation failed', 400, errors);
  }

  return where;
};

const validateAdminComment = (body = {}) => {
  if (body.adminComment === undefined || body.adminComment === null) {
    return null;
  }

  if (typeof body.adminComment !== 'string') {
    throw createHttpError('Validation failed', 400, {
      adminComment: 'adminComment must be a string'
    });
  }

  return body.adminComment.trim() || null;
};

const ensureNoOverlappingLeave = async (userId, startDate, endDate) => {
  const overlappingLeave = await prisma.leaveRequest.findFirst({
    where: {
      userId,
      status: {
        in: ['PENDING', 'APPROVED']
      },
      startDate: {
        lte: endDate
      },
      endDate: {
        gte: startDate
      }
    }
  });

  if (overlappingLeave) {
    throw createHttpError('Leave request overlaps with an existing pending or approved leave', 409);
  }
};

exports.applyLeave = async (req, res, next) => {
  try {
    const user = await getCurrentUser(req);
    const leaveData = validateApplyLeaveBody(req.body);

    await ensureNoOverlappingLeave(user.id, leaveData.startDate, leaveData.endDate);

    const leave = await prisma.leaveRequest.create({
      data: {
        userId: user.id,
        type: leaveData.leaveType,
        startDate: leaveData.startDate,
        endDate: leaveData.endDate,
        reason: leaveData.remarks,
        status: 'PENDING'
      },
      include: leaveInclude
    });

    return successResponse(res, 'Leave request created successfully', normalizeLeave(leave), 201);
  } catch (error) {
    next(error);
  }
};

exports.getMyLeaves = async (req, res, next) => {
  try {
    const user = await getCurrentUser(req);
    const where = validateFilters(req.query);

    const leaves = await prisma.leaveRequest.findMany({
      where: {
        ...where,
        userId: user.id
      },
      include: leaveInclude,
      orderBy: {
        createdAt: 'desc'
      }
    });

    return successResponse(res, 'Leave requests fetched successfully', normalizeLeaves(leaves));
  } catch (error) {
    next(error);
  }
};

exports.getLeaves = async (req, res, next) => {
  try {
    const user = await getCurrentUser(req);
    requireHr(user);

    const where = validateFilters(req.query, true);
    const leaves = await prisma.leaveRequest.findMany({
      where,
      include: leaveInclude,
      orderBy: {
        createdAt: 'desc'
      }
    });

    return successResponse(res, 'Leave requests fetched successfully', normalizeLeaves(leaves));
  } catch (error) {
    next(error);
  }
};

const updateLeaveDecision = async (req, res, next, status) => {
  try {
    const user = await getCurrentUser(req);
    requireHr(user);

    const { id } = req.params;
    if (!isValidUuid(id)) {
      return errorResponse(res, 'Invalid leave request id', {}, 400);
    }

    const adminComment = validateAdminComment(req.body);
    const leave = await prisma.leaveRequest.findUnique({
      where: {
        id
      }
    });

    if (!leave) {
      return errorResponse(res, 'Leave request not found', {}, 404);
    }

    if (leave.status !== 'PENDING') {
      return errorResponse(res, `Only pending leave requests can be ${status.toLowerCase()}`, {}, 409);
    }

    const updatedLeave = await prisma.leaveRequest.update({
      where: {
        id
      },
      data: {
        status,
        remarks: adminComment
      },
      include: leaveInclude
    });

    return successResponse(res, `Leave request ${status.toLowerCase()} successfully`, normalizeLeave(updatedLeave));
  } catch (error) {
    next(error);
  }
};

exports.approveLeave = async (req, res, next) => {
  return updateLeaveDecision(req, res, next, 'APPROVED');
};

exports.rejectLeave = async (req, res, next) => {
  return updateLeaveDecision(req, res, next, 'REJECTED');
};

const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { successResponse, errorResponse } = require('../utils/responseFormatter');

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({ adapter });

// Temporary user ID for testing
// Pass ?userId=<User.id> to GET/PUT /api/employees/me.
// Replace this with req.user.id once authentication middleware is ready.
const getUserId = (req) => req.query.userId;

const employeeInclude = {
  user: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true
    }
  },
  documents: true
};

const profileFields = [
  'phone',
  'address',
  'city',
  'state',
  'dateOfBirth',
  'gender',
  'profilePicture',
  'employeeId',
  'department',
  'designation',
  'joiningDate',
  'employmentType',
  'manager',
  'basicSalary',
  'allowances',
  'deductions'
];

const dateFields = ['dateOfBirth', 'joiningDate'];
const numberFields = ['basicSalary', 'allowances', 'deductions'];
const documentFields = ['documentType', 'fileName', 'fileUrl'];

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

const buildProfileData = (body) => {
  const data = {};
  const errors = {};
  const allowedFields = [...profileFields, 'documents'];

  Object.keys(body).forEach((field) => {
    if (!allowedFields.includes(field)) {
      errors[field] = 'This field cannot be updated';
    }
  });

  profileFields.forEach((field) => {
    if (!(field in body)) {
      return;
    }

    const value = body[field];

    if (value === null || value === '') {
      data[field] = null;
      return;
    }

    if (dateFields.includes(field)) {
      const parsedDate = new Date(value);
      if (Number.isNaN(parsedDate.getTime())) {
        errors[field] = 'Must be a valid date';
        return;
      }
      data[field] = parsedDate;
      return;
    }

    if (numberFields.includes(field)) {
      const parsedNumber = Number(value);
      if (!Number.isFinite(parsedNumber) || parsedNumber < 0) {
        errors[field] = 'Must be a non-negative number';
        return;
      }
      data[field] = parsedNumber;
      return;
    }

    if (typeof value !== 'string') {
      errors[field] = 'Must be a string';
      return;
    }

    data[field] = value.trim();
  });

  if (Object.keys(errors).length > 0) {
    throw createHttpError('Validation failed', 400, errors);
  }

  return data;
};

const buildDocumentData = (documents) => {
  if (documents === undefined) {
    return undefined;
  }

  if (!Array.isArray(documents)) {
    throw createHttpError('Validation failed', 400, {
      documents: 'Must be an array'
    });
  }

  const errors = {};

  const documentData = documents.map((document, index) => {
    if (!document || typeof document !== 'object' || Array.isArray(document)) {
      errors[`documents.${index}`] = 'Must be an object';
      return null;
    }

    Object.keys(document).forEach((field) => {
      if (!documentFields.includes(field)) {
        errors[`documents.${index}.${field}`] = 'This field cannot be updated';
      }
    });

    const preparedDocument = {};

    documentFields.forEach((field) => {
      if (typeof document[field] !== 'string' || document[field].trim() === '') {
        errors[`documents.${index}.${field}`] = 'Must be a non-empty string';
        return;
      }

      preparedDocument[field] = document[field].trim();
    });

    return preparedDocument;
  });

  if (Object.keys(errors).length > 0) {
    throw createHttpError('Validation failed', 400, errors);
  }

  return documentData;
};

const updateDocumentsIfProvided = async (tx, profileId, documents) => {
  if (documents === undefined) {
    return;
  }

  await tx.document.deleteMany({
    where: {
      profileId
    }
  });

  if (documents.length > 0) {
    await tx.document.createMany({
      data: documents.map((document) => ({
        ...document,
        profileId
      }))
    });
  }
};

const handlePrismaError = (error, next) => {
  if (error.code === 'P2002') {
    return next(createHttpError('Employee profile already exists with this unique value', 409, {
      fields: error.meta && error.meta.target ? error.meta.target : []
    }));
  }

  return next(error);
};

// GET /api/employees/me
exports.getMyProfile = async (req, res, next) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return errorResponse(res, 'userId query parameter is required', {}, 400);
    }

    const employee = await prisma.employeeProfile.findUnique({
      where: {
        userId
      },
      include: employeeInclude
    });

    if (!employee) {
      return errorResponse(res, 'Employee profile not found', {}, 404);
    }

    return successResponse(res, 'Employee profile fetched successfully', employee);
  } catch (error) {
    next(error);
  }
};

// PUT /api/employees/me
exports.updateMyProfile = async (req, res, next) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return errorResponse(res, 'userId query parameter is required', {}, 400);
    }

    const body = req.body || {};
    const profileData = buildProfileData(body);
    const documentData = buildDocumentData(body.documents);

    if (Object.keys(profileData).length === 0 && documentData === undefined) {
      return errorResponse(res, 'No valid employee profile fields provided', {}, 400);
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        id: true
      }
    });

    if (!user) {
      return errorResponse(res, 'User not found', {}, 404);
    }

    const employee = await prisma.$transaction(async (tx) => {
      const profile = await tx.employeeProfile.upsert({
        where: {
          userId
        },
        update: profileData,
        create: {
          ...profileData,
          userId
        }
      });

      await updateDocumentsIfProvided(tx, profile.id, documentData);

      return tx.employeeProfile.findUnique({
        where: {
          id: profile.id
        },
        include: employeeInclude
      });
    });

    return successResponse(res, 'Employee profile updated successfully', employee);
  } catch (error) {
    handlePrismaError(error, next);
  }
};

// GET /api/employees
exports.getAllEmployees = async (req, res, next) => {
  try {
    const employees = await prisma.employeeProfile.findMany({
      include: employeeInclude,
      orderBy: {
        createdAt: 'desc'
      }
    });

    return successResponse(res, 'Employees fetched successfully', employees);
  } catch (error) {
    next(error);
  }
};

// GET /api/employees/:id
exports.getEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidUuid(id)) {
      return errorResponse(res, 'Invalid employee profile id', {}, 400);
    }

    const employee = await prisma.employeeProfile.findUnique({
      where: {
        id
      },
      include: employeeInclude
    });

    if (!employee) {
      return errorResponse(res, 'Employee profile not found', {}, 404);
    }

    return successResponse(res, 'Employee profile fetched successfully', employee);
  } catch (error) {
    next(error);
  }
};

// PUT /api/employees/:id
exports.updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidUuid(id)) {
      return errorResponse(res, 'Invalid employee profile id', {}, 400);
    }

    const body = req.body || {};
    const profileData = buildProfileData(body);
    const documentData = buildDocumentData(body.documents);

    if (Object.keys(profileData).length === 0 && documentData === undefined) {
      return errorResponse(res, 'No valid employee profile fields provided', {}, 400);
    }

    const existingEmployee = await prisma.employeeProfile.findUnique({
      where: {
        id
      },
      select: {
        id: true
      }
    });

    if (!existingEmployee) {
      return errorResponse(res, 'Employee profile not found', {}, 404);
    }

    const employee = await prisma.$transaction(async (tx) => {
      await tx.employeeProfile.update({
        where: {
          id
        },
        data: profileData
      });

      await updateDocumentsIfProvided(tx, id, documentData);

      return tx.employeeProfile.findUnique({
        where: {
          id
        },
        include: employeeInclude
      });
    });

    return successResponse(res, 'Employee profile updated successfully', employee);

  } catch (error) {
    handlePrismaError(error, next);
  }
};

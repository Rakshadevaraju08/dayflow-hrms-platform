const { query } = require('express-validator');

exports.dateFilterValidator = [
  query('from')
    .optional()
    .isISO8601()
    .withMessage('from must be a valid ISO8601 date (e.g., YYYY-MM-DD)'),
  query('to')
    .optional()
    .isISO8601()
    .withMessage('to must be a valid ISO8601 date (e.g., YYYY-MM-DD)')
];

exports.hrFilterValidator = [
  ...exports.dateFilterValidator,
  query('employeeId')
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage('employeeId must be a valid string'),
  query('status')
    .optional()
    .isIn(['PRESENT', 'ABSENT', 'HALF_DAY', 'LEAVE'])
    .withMessage('Invalid status')
];

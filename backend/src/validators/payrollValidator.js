const { body, param } = require('express-validator');

exports.updatePayrollValidator = [
  param('employeeId')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('employeeId is required'),
  body('basicSalary')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('basicSalary must be a non-negative number'),
  body('allowances')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('allowances must be a non-negative number'),
  body('deductions')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('deductions must be a non-negative number'),
  body('salaryEffectiveDate')
    .optional()
    .isISO8601()
    .withMessage('salaryEffectiveDate must be a valid ISO8601 date')
];

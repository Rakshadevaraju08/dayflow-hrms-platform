const { errorResponse } = require('../utils/responseFormatter');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  return errorResponse(res, message, err.errors || {}, statusCode);
};

module.exports = errorHandler;

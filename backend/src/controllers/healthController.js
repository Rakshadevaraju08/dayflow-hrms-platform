const { successResponse } = require('../utils/responseFormatter');

exports.checkHealth = (req, res) => {
  return successResponse(res, 'API is running');
};

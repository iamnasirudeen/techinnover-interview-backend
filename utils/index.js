const response = (res, statusCode = 200, status, message, data = {}) => {
  res.status(statusCode).json({
    status,
    message,
    data,
  });
};

module.exports = response;

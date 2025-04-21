const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).json({
    message: statusCode === 500 ? "Interal Server Error" : message,
  });
};
module.exports = errorHandler;

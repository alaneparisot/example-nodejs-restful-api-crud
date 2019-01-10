exports.catch = (err, req, res, next) => {
  const { message, statusCode, errors } = err;

  res
    .status(statusCode || 500)
    .json({ error: { message, errors } });
};

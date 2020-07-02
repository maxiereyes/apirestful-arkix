const jwt = require("jsonwebtoken");
const { ErrorHandler } = require("../helpers/errorsHelpers");
const { config } = require("../config/config");

const ensureAuthenticate = (req, res, next) => {
  if (!req.headers.authorization) {
    throw new ErrorHandler(403, "Not set headers authorization");
  }

  const token = req.headers.authorization.split(" ")[1];
  try {
    const payload = jwt.verify(token, config.JWT_SECRET_KEY);
    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  ensureAuthenticate,
};

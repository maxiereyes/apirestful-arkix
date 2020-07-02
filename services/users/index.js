const { ErrorHandler } = require("../../helpers/errorsHelpers");
const User = require("../../models/Users");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { config } = require("../../config/config");
const { isEmpty, size } = require("lodash");

const createUser = async (user) => {
  const { username, email, password } = user;
  const hashPassword = await bcrypt.hashSync(password, saltRounds);
  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });
  return await newUser.save();
};

const getUser = async (user) => {
  const { email, password } = user;
  const findUser = await User.findOne({ email });
  if (isEmpty(findUser)) {
    throw new ErrorHandler(404, "User not found");
  }
  const comparePass = await bcrypt.compareSync(password, findUser.password);
  if (!comparePass) {
    throw new ErrorHandler(404, "Email or Password incorrect. Try again");
  }

  const token = jwt.sign(
    { id: findUser._id, email: findUser.email },
    config.JWT_SECRET_KEY,
    { expiresIn: 60 * 60 }
  );
  return {
    message: "",
    token,
  };
};

const verifyExistEmailOrUserName = async (email, username) => {
  const userExist = await User.find({ $or: [{ email }, { username }] });
  if (size(userExist) !== 0) {
    throw new ErrorHandler(404, "Username or Email already taken");
  }

  return;
};

module.exports = {
  createUser,
  getUser,
  verifyExistEmailOrUserName,
};

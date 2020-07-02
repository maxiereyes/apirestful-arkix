const {
  createUser,
  getUser,
  verifyExistEmailOrUserName,
} = require("../../services/users");

const createUsers = async (req, res, next) => {
  const user = req.body;
  try {
    await verifyExistEmailOrUserName(user.email, user.username);
    const resp = await createUser(user);
    res.status(201).json({
      message: "User created successfully",
      data: resp,
    });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  const user = req.body;
  try {
    const { message, token } = await getUser(user);
    res.status(200).json({
      message: "User login successfully",
      access_token: token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUsers,
  getUsers,
};

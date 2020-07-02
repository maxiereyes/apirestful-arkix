const mongoose = require("mongoose");
const { config } = require("../config/config");

const MongoDbConnect = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://${config.DB_USER_NAME}:${config.DB_PASSWORD}${config.DB_HOST}/${config.DB_NAME}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("MongoDB connected!");

    return conn;
  } catch (error) {
    throw error;
  }
};

module.exports = { MongoDbConnect };

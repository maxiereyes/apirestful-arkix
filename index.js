const express = require("express");
const app = express();
const morgan = require("morgan");
const { config } = require("./config/config");
const bodyParser = require("body-parser");
const { MongoDbConnect } = require("./db");
const { handleError } = require("./helpers/errorsHelpers");
const UserRoutes = require("./routes/users.routes");
const PostsRoutes = require("./routes/posts.routes");
const { ensureAuthenticate } = require("./middlewares/ensureAuthenticate");

MongoDbConnect();

app.use(morgan(":method :url"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/users", UserRoutes);
app.use("/posts", ensureAuthenticate, PostsRoutes);
app.use((err, req, res, next) => {
  handleError(err, res);
});

app.listen(3000, () => {
  console.log(`Listening on port ${config.PORT}`);
});

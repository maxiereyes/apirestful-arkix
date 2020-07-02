const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostsSchema = new Schema({
  idUser: Schema.Types.ObjectId,
  image: { type: String, required: false },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

const PostsModel = mongoose.model("Posts", PostsSchema);

module.exports = PostsModel;

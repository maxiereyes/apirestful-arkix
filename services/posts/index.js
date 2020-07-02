const { ErrorHandler } = require("../../helpers/errorsHelpers");
const Posts = require("../../models/Posts");
const { isEmpty, size, get } = require("lodash");

const createNewPosts = async (posts) => {
  const newPosts = new Posts({
    ...posts,
  });
  return await newPosts.save();
};

const findAllPosts = async (id, page, query) => {
  const titleFilter = get(query, "title", "");
  const contentFilter = get(query, "content", "");
  const perPage = 10;
  const skipPage = (page - 1) * perPage;
  const countPages = await Posts.find({
    idUser: id,
    title: { $regex: titleFilter, $options: "i" },
    content: { $regex: contentFilter, $options: "i" },
  }).count();
  const numPages = countPages / perPage;
  const posts = await Posts.find({
    idUser: id,
    title: { $regex: titleFilter, $options: "i" },
    content: { $regex: contentFilter, $options: "i" },
  })
    .skip(skipPage)
    .limit(perPage)
    .lean();
  return {
    posts,
    currentPage: page,
    totalPages: Math.ceil(numPages),
  };
};

const deleteOnePost = async (idPost) => {
  const resp = await Posts.deleteOne({ _id: idPost });
  if (resp.deletedCount === 0) {
    throw new ErrorHandler(404, "Posts not found");
  }
  return resp;
};

module.exports = {
  createNewPosts,
  findAllPosts,
  deleteOnePost,
};

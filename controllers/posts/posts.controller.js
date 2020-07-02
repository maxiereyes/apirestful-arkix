const {
  createNewPosts,
  findAllPosts,
  deleteOnePost,
} = require("../../services/posts");

const getAllPosts = async (req, res, next) => {
  const { id } = req.user;
  const { page } = req.query;
  try {
    const resp = await findAllPosts(id, page, { ...req.query });
    res.status(200).json({
      data: resp,
    });
  } catch (error) {
    next(error);
  }
};

const createPosts = async (req, res, next) => {
  const posts = req.body;
  try {
    const resp = await createNewPosts(posts);
    res.status(201).json({
      message: "Posts created successfully",
      data: resp,
    });
  } catch (error) {
    next(error);
  }
};

const deletePosts = async (req, res, next) => {
  const { id } = req.params;
  try {
    const resp = await deleteOnePost(id);
    res.status(200).json({
      message: "Posts deleted successfully",
      data: resp,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPosts,
  createPosts,
  deletePosts,
};

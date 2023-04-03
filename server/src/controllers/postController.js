import * as postService from "../services/post";

export const getPosts = async (req, res) => {
  try {
    const response = await postService.getPostsService();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at category controller:" + error,
    });
  }
};

export const getPostsPaginate = async (req, res) => {
  const { page, ...query } = req.query;

  try {
    const response = await postService.getPostPaginatesService(page, query);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at category controller:" + error,
    });
  }
};

export const getNewPosts = async (req, res) => {
  try {
    const response = await postService.getNewPostService();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at category controller:" + error,
    });
  }
};

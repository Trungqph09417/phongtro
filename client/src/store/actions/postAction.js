import actionTypes from "./actionTypes";
import {
  apiGetNewPost,
  apiGetPost,
  apiGetPostPageNate,
} from "../../services/post";

export const getPosts = () => async (dispatch) => {
  try {
    const response = await apiGetPost();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_POSTS,
        posts: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_POSTS,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_POSTS,
      post: null,
    });
  }
};

export const getPostsPage = (query) => async (dispatch) => {
  try {
    const response = await apiGetPostPageNate(query);

    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_POSTS_PAGE,
        posts: response.data.response?.rows,
        count: response.data.response?.count,
      });
    } else {
      dispatch({
        type: actionTypes.GET_POSTS_PAGE,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_POSTS_PAGE,
      post: null,
    });
  }
};

export const getNewPosts = (query) => async (dispatch) => {
  try {
    const response = await apiGetNewPost();

    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_NEW_POSTS,
        newPosts: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_NEW_POSTS_FAIL,
        msg: response.data.msg,
        newPosts: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_NEW_POSTS_FAIL,
      newPosts: null,
    });
  }
};

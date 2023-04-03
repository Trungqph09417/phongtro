import actionTypes from "../actions/actionTypes";

const initState = {
  posts: [],
  msg: "",
  count: 0,
  newPosts: [],
};
const postReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_POSTS:
    case actionTypes.GET_POSTS_PAGE:
      return {
        ...state,
        posts: action.posts || [],
        msg: action.msg || "",
        count: action.count || 0,
      };

    case actionTypes.GET_NEW_POSTS:
      return {
        ...state,
        msg: action.msg || "",
        newPosts: action.newPosts || [],
      };

    default:
      return state;
  }
};
export default postReducer;
import {
  COMMENTS_FETCH_THREAD,
  COMMENTS_FETCH_THREAD_SUCCESS,
} from './actionTypes';

const initialState = {
  threadId: null,
  loading: true,
  comments: {},
  userData: {},
};

function commentsReducer(state = initialState, action) {
  if (action.type === COMMENTS_FETCH_THREAD) {
    const loading = action.payload.showLoader && state.threadId !== action.payload.threadId
    return {
      ...state,
      threadId: action.payload.threadId,
      loading,
    };
  }
  if (action.type === COMMENTS_FETCH_THREAD_SUCCESS) {
    const objComments = action.payload.comments;
    const comments = Object.keys(objComments).map(key => ({
      key,
      ...objComments[key],
    }));
    console.log(comments);
    return {
      ...state,
      loading: false,
      comments,
      userData: action.payload.userData,
    };
  }
  return state;
}

export default commentsReducer;

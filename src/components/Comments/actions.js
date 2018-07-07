import {
  COMMENTS_FETCH_THREAD,
  COMMENTS_FETCH_THREAD_SUCCESS,
  COMMENTS_FETCH_THREAD_CANCEL,
  COMMENTS_FETCH_THREAD_ERROR,
} from './actionTypes';

export function fetchCommentsThread(threadId, showLoader) {
  return {
    type: COMMENTS_FETCH_THREAD,
    payload: {
      threadId,
      showLoader,
    },
    meta: {
      ajax: true,
    },
  };
}
export function fetchCommentsThreadSuccess(payload) {
  return {
    type: COMMENTS_FETCH_THREAD_SUCCESS,
    payload,
  };
}
export function fetchCommnetsThreadError(payload) {
  return {
    type: COMMENTS_FETCH_THREAD_ERROR,
    payload,
  };
}
export function fetchCommentsThreadCancel() {
  return {
    type: COMMENTS_FETCH_THREAD_CANCEL,
  };
}


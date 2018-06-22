import {
  EVENT_FETCH_EVENT_DATA,
  EVENT_FETCH_EVENT_DATA_CANCEL,
  EVENT_FETCH_EVENT_DATA_FINISHED,
} from './actionTypes';

const initialState = {
  data: {},
  imageURLS: [],
  isLoading: true,
};

function fetchEventDataReducer(state = initialState, action) {
  if (action.type === EVENT_FETCH_EVENT_DATA && action.payload.shouldRefresh) {
    return initialState;
  }
  if (action.type === EVENT_FETCH_EVENT_DATA_FINISHED) {
    const { payload } = action;
    if (!payload.title) {
      return state;
    }
    return {
      ...state,
      data: payload,
      isLoading: false,
    };
  }


  return state;
}

export default fetchEventDataReducer;

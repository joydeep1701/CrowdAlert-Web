import {
  EVENT_PREVIEW_OPEN,
  EVENT_PREVIEW_CLOSE,
} from './actionTypes';

const initialState = {
  isOpen: false,
  event: null,
};

export default function eventPreviewReducer(state = initialState, action) {
  switch (action.type) {
    case EVENT_PREVIEW_OPEN:
      return {
        ...state,
        isOpen: true,
        event: action.payload,
      };
    case EVENT_PREVIEW_CLOSE:
      return initialState;
    default:
      break;
  }
  return state;
}

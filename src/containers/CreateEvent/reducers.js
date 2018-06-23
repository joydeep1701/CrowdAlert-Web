import { combineReducers } from 'redux';
import {
  CREATE_EVENTS_FORM_TAB_CHANGE,
  CREATE_EVENTS_FORM_TAB_CHANGE_VALIDATION,
} from './actionTypes';


const tabInitialState = {
  activeTab: 0,
  isValid: {
    location: false,
    details: false,
    images: false,
  },
};
function switchTabReducer(state = tabInitialState, action) {
  if (action.type === CREATE_EVENTS_FORM_TAB_CHANGE) {
    return {
      ...state,
      activeTab: action.payload.tab,
    };
  }
  if (action.type === CREATE_EVENTS_FORM_TAB_CHANGE_VALIDATION) {
    return {
      ...state,
      isValid: {
        ...state.isValid,
        [action.payload.tab]: action.payload.isValid,
      },
    };
  }
  return state;
}


const createEventsReducer = combineReducers({
  tabs: switchTabReducer,
});

export default createEventsReducer;

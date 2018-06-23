import {
  CREATE_EVENTS_FORM_TAB_CHANGE,
  CREATE_EVENTS_FORM_TAB_CHANGE_VALIDATION,
} from './actionTypes';

export function changeTabCreateEventsForm(tabIndex) {
  return {
    type: CREATE_EVENTS_FORM_TAB_CHANGE,
    payload: {
      tab: tabIndex,
    },
  };
}
export function changeTabValidationCreateEventsForm(tab, isValid) {
  return {
    type: CREATE_EVENTS_FORM_TAB_CHANGE_VALIDATION,
    payload: {
      tab,
      isValid,
    },
  };
}

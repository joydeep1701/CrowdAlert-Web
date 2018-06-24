import {
  CREATE_EVENTS_FORM_TAB_CHANGE,
  CREATE_EVENTS_FORM_TAB_CHANGE_VALIDATION,
  CREATE_EVENTS_FORM_UPDATE_LOCATION_TEXT,
  CREATE_EVENTS_FORM_SAVE_LOCATION,
  CREATE_EVENTS_FORMS_UPDATE_EVENT_DETAILS,
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
export function createEventsUpdateLocationText(text) {
  return {
    type: CREATE_EVENTS_FORM_UPDATE_LOCATION_TEXT,
    payload: {
      text,
    },
  };
}
export function saveLocationCreateEvents() {
  return {
    type: CREATE_EVENTS_FORM_SAVE_LOCATION,
  };
}
export function updateEventDetailsCreateEvents(event) {
  const { target } = event;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const { name } = target;
  return {
    type: CREATE_EVENTS_FORMS_UPDATE_EVENT_DETAILS,
    payload: {
      name,
      value,
    },
  };
}

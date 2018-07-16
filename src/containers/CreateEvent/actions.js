import {
  CREATE_EVENTS_FORM_TAB_CHANGE,
  CREATE_EVENTS_FORM_TAB_CHANGE_VALIDATION,
  CREATE_EVENTS_FORM_UPDATE_LOCATION_TEXT,
  CREATE_EVENTS_FORM_SAVE_LOCATION,
  CREATE_EVENTS_FORMS_UPDATE_EVENT_DETAILS,
  CREATE_EVENTS_FORM_VALIDATE_FORM,
  CREATE_EVENTS_FORM_VALIDATION_ERRORS,
  CREATE_EVENTS_FORM_VALIDATION_SUCCESS,
  CREATE_EVENTS_FORM_SUBMIT,
  CREATE_EVENTS_FORM_SUBMIT_SUCCESS,
  CREATE_EVENTS_FORM_SUBMIT_ERROR,
  CREATE_EVENTS_FORM_TOGGLE_UPLOADING,
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
export function formValidationErrorsCreateEvents(payload = {}) {
  return {
    type: CREATE_EVENTS_FORM_VALIDATION_ERRORS,
    payload,
  };
}
export function validateFormCreateEvents(payload = {}) {
  return {
    type: CREATE_EVENTS_FORM_VALIDATE_FORM,
    payload,
  };
}
export function acceptFormCreateEvents(payload = {}) {
  return {
    type: CREATE_EVENTS_FORM_VALIDATION_SUCCESS,
    payload,
  };
}
export function submitFormCreateEvents({ location, details }) {
  const eventData = {
    category: details.eventType,
    description: details.description,
    local_assistance: details.help,
    title: details.title,
    public: {
      view: details.public,
      share: details.help,
    },
    anonymous: details.anonymous,
    location: {
      coords: {
        latitude: location.mapCenter.lat,
        longitude: location.mapCenter.lng,
      },
    },
  };
  return {
    type: CREATE_EVENTS_FORM_SUBMIT,
    payload: {
      eventData,
    },
  };
}
export function submitFormSuccessCreateEvents({ response }) {
  return {
    type: CREATE_EVENTS_FORM_SUBMIT_SUCCESS,
    payload: response,
  };
}
export function submitFormErrorCreateEvents(error = {}) {
  // if (error.status >= 400) {
  return {
    type: CREATE_EVENTS_FORM_SUBMIT_ERROR,
    payload: {
      message: {
        header: 'Unable to process your request',
        body: error.response.detail,
      },
    },
  };
}
export function toggleImageUpload() {
  return {
    type: CREATE_EVENTS_FORM_TOGGLE_UPLOADING,
  };
}

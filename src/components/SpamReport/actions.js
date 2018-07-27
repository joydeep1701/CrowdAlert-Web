import {
  SPAM_REPORT_REPORT_SPAM_START,
  SPAM_REPORT_REPORT_SPAM_SUCCESS,
  SPAM_REPORT_REPORT_SPAM_ERROR,
  SPAM_REPORT_REPORT_SPAM_CANCEL,
} from './actionTypes';

export function reportSpamStart(uuid) {
  return {
    type: SPAM_REPORT_REPORT_SPAM_START,
    payload: {
      uuid,
    },
  };
}
export function reportSpamSuccess({ response }) {
  return {
    type: SPAM_REPORT_REPORT_SPAM_SUCCESS,
    payload: {
      response,
    },
  };
}
export function reportSpamError(message) {
  return {
    type: SPAM_REPORT_REPORT_SPAM_ERROR,
    payload: {
      message,
    },
  };
}
export function reportSpamCancel() {
  return {
    type: SPAM_REPORT_REPORT_SPAM_CANCEL,
  };
}

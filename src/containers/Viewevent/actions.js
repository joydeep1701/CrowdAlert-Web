import {
  EVENT_FETCH_EVENT_DATA,
  EVENT_FETCH_EVENT_DATA_CANCEL,
  EVENT_FETCH_EVENT_DATA_FINISHED,
} from './actionTypes';

export function fetchEventData(payload = {}) {
  return {
    type: EVENT_FETCH_EVENT_DATA,
    payload,
  };
}
export function fetchEventDataFinished(payload = {}) {
  return {
    type: EVENT_FETCH_EVENT_DATA_FINISHED,
    payload,
  };
}
export function fetchEventDataCanceled(payload = {}) {
  return {
    type: EVENT_FETCH_EVENT_DATA_CANCEL,
    payload,
  };
}

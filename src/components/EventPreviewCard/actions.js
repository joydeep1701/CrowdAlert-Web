import {
  EVENT_PREVIEW_OPEN,
  EVENT_PREVIEW_CLOSE,
} from './actionTypes';

export function openEventPreview(payload = {}) {
  return {
    type: EVENT_PREVIEW_OPEN,
    payload,
  };
}

export function closeEventPreview(payload = {}) {
  return {
    type: EVENT_PREVIEW_CLOSE,
    payload,
  };
}

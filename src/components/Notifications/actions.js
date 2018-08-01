import {
  NOTIFICATIONS_RECIEVIED_NEW_MESSAGE,
  NOTIFICATIONS_SHOW_NOTIFICATIONS_PERMISSION_INIT,
  NOTIFICATIONS_SHOW_NOTIFICATIONS_PERMISSION_ASK,
  NOTIFICATIONS_SHOW_NOTIFICATIONS_PERMISSION_GRANTED,
  NOTIFICATIONS_SHOW_NOTIFICATIONS_PERMISSION_DENIED,
  NOTIFICATIONS_SHOW_NOTIFICATIONS_CLOSE,
} from './actionTypes';

export function receivedNewNotification({ data }) {
  return {
    type: NOTIFICATIONS_RECIEVIED_NEW_MESSAGE,
    payload: {
      data,
    },
  };
}
export function showNotificationPermissionInit() {
  return {
    type: NOTIFICATIONS_SHOW_NOTIFICATIONS_PERMISSION_INIT,
  };
}
export function showNotificationPermissionAsk() {
  return {
    type: NOTIFICATIONS_SHOW_NOTIFICATIONS_PERMISSION_ASK,
  };
}
export function showNotificationPermissionGranted() {
  return {
    type: NOTIFICATIONS_SHOW_NOTIFICATIONS_PERMISSION_GRANTED,
  };
}
export function showNotificationPermissionDenied() {
  return {
    type: NOTIFICATIONS_SHOW_NOTIFICATIONS_PERMISSION_DENIED,
  };
}
export function showNotificationPermissionClose() {
  return {
    type: NOTIFICATIONS_SHOW_NOTIFICATIONS_CLOSE,
  };
}

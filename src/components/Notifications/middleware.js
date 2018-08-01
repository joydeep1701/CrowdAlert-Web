import {
  NOTIFICATIONS_RECIEVIED_NEW_MESSAGE,
  NOTIFICATIONS_SHOW_NOTIFICATIONS_PERMISSION_ASK,
} from './actionTypes';
import {
  AUTH_CHECK_USER_STATUS,
} from '../../containers/Auth/actionTypes';
import {
  showNotificationPermissionInit,
  showNotificationPermissionGranted,
  showNotificationPermissionDenied,
  showNotificationPermissionClose,
} from './actions';

import { messaging } from '../../utils/firebase';

const notificationsMiddleware = ({ dispatch }) => next => (action) => {
  if (action.type === AUTH_CHECK_USER_STATUS) {
    console.log("Struck Here")

    // Check if fcm token is not present
    if (!window.localStorage.getItem('fcmtoken')) {
      // Show modal to promt the user to subscribe to notificaitons
      dispatch(showNotificationPermissionInit());
    }
  }
  if (action.type === NOTIFICATIONS_SHOW_NOTIFICATIONS_PERMISSION_ASK) {
    // Continue to the next middleware
    next(action);
    messaging.requestPermission()
      .then(() => {
        console.log('Permission Granted');
        // If permission is granted, close the modal
        dispatch(showNotificationPermissionClose());
        return messaging.getToken();
      })
      .then((token) => {
        // Save the token
        window.localStorage.setItem('fcmtoken', token);
        // Send the new token to server
        dispatch(showNotificationPermissionGranted(token));
        console.log(token);
      })
      .catch((err) => {
        // Show error prompt
        dispatch(showNotificationPermissionDenied());
        console.log('Error', err);
      });
  }
  next(action);

};

export default notificationsMiddleware;

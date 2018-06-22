import {
  EVENT_PREVIEW_OPEN,
  EVENT_PREVIEW_CLOSE,
} from './actionTypes';
import { updateMapCenter } from '../../components/Map/actions';
import { fetchEventData } from '../../containers/Viewevent/actions';

const eventPreviewMiddleware = ({ dispatch }) => next => (action) => {
  if (action.type === EVENT_PREVIEW_OPEN) {
    dispatch(updateMapCenter({
      fetch: false,
      lat: action.payload.lat,
      lng: action.payload.long,
    }));
    dispatch(fetchEventData({
      eventid: action.payload.key,
    }));
  }
  next(action);
};

export default eventPreviewMiddleware;
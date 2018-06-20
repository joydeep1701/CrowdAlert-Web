import { FEED_FETCH_USER_LOCATION_FINISHED } from './actionTypes';
import distanceCoordinates from '../../utils/gps';
import { updateMapCenter, updateMapZoom } from '../../components/Map/actions';
import { fetchEventsByLocation } from './actions';

const updateLocationMiddleware = ({ dispatch }) => next => (action) => {
  if (action.type === FEED_FETCH_USER_LOCATION_FINISHED) {
    const lat = parseFloat(action.payload.lat);
    const lng = parseFloat(action.payload.lng);
    const oldLat = parseFloat(action.payload.oldLat);
    const oldLng = parseFloat(action.payload.oldLng);
    const distance = distanceCoordinates(lat, lng, oldLat, oldLng);
    // console.log(distance);
    const zoom = 12;
    if (distance > 500) {
      // Make sure that if the target location is somewhat near to the current
      // location, don't update location
      dispatch(updateMapCenter({ lat, lng }));
      dispatch(updateMapZoom({ zoom }));
    }
    dispatch(fetchEventsByLocation({ lat, lng, zoom }));
  }
  next(action);
};

export default updateLocationMiddleware;

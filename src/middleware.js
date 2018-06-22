import { updateLocationMiddleware, fetchEventsOnMapUpdateMiddleware } from './containers/Feed/middleware';
import fetchEventDataMiddleware from './containers/Viewevent/middleware';
import eventPreviewMiddleware from './components/EventPreviewCard/middleware';
import geoLocationMiddleware from './components/Geolocator/middleware';

const middlewares = [
  updateLocationMiddleware,
  fetchEventsOnMapUpdateMiddleware,
  fetchEventDataMiddleware,
  eventPreviewMiddleware,
  geoLocationMiddleware,
];

export default middlewares;

import { updateLocationMiddleware, fetchEventsOnMapUpdateMiddleware } from './containers/Feed/middleware';
import fetchEventDataMiddleware from './containers/Viewevent/middleware';
import eventPreviewMiddleware from './components/EventPreviewCard/middleware';

const middlewares = [
  updateLocationMiddleware,
  fetchEventsOnMapUpdateMiddleware,
  fetchEventDataMiddleware,
  eventPreviewMiddleware,
];

export default middlewares;

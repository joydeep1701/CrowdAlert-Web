import { MAP_ONCLICK } from '../../components/Map/actionTypes';
import {
  updateMapCenter
} from '../../components/Map/actions';
import {
  changeTabCreateEventsForm,
  changeTabValidationCreateEventsForm,
} from './actions';
import {
  CREATE_EVENTS_FORM_SAVE_LOCATION,
  CREATE_EVENTS_FORM_UPDATE_LOCATION_TEXT,
} from './actionTypes';

const createEventsMiddleware = store => next => (action) => {
  const { dispatch } = store;
  if (action.type === MAP_ONCLICK) {
    const state = store.getState();
    const { lat } = action.payload;
    const { lng } = action.payload;
    // If form is freezed, don't allow to update.
    if (!state.createEvents.form.isFreezed) {
      console.log(state.createEvents.form.isFreezed)
      dispatch(updateMapCenter({
        lat,
        lng,
        fetch: false,
      }));
      dispatch(changeTabValidationCreateEventsForm('location', false));
    } else {
      return null;
    }
  }
  if (action.type === CREATE_EVENTS_FORM_UPDATE_LOCATION_TEXT) {
    const state = store.getState();
    if (state.createEvents.form.isFreezed) {
      return null;
    }
  }
  if (action.type === CREATE_EVENTS_FORM_SAVE_LOCATION) {
    dispatch(changeTabCreateEventsForm(1));
    dispatch(changeTabValidationCreateEventsForm('location', true));
  }
  next(action);
};

export default createEventsMiddleware;

import { ajax } from 'rxjs/observable/dom/ajax';
import { ofType, combineEpics } from 'redux-observable';
import { mergeMap, map, takeUntil, debounceTime } from 'rxjs/operators';
import { REVERSE_GEOCODE } from '../../utils/apipaths';
import { MAP_ONCLICK } from '../../components/Map/actionTypes';
import { createEventsUpdateLocationText } from './actions';

const fetchReverseGeocodeEpic = action$ =>
  action$.pipe(
    ofType(MAP_ONCLICK),
    mergeMap((action) => {
      const { lat } = action.payload;
      const { lng } = action.payload;
      const apiUrl = `${REVERSE_GEOCODE}?lat=${lat}&long=${lng}&accuracy=high`;
      return ajax
        .getJSON(apiUrl)
        .pipe(
          map(response => createEventsUpdateLocationText(response[0].formatted_address))
        )
    })
  )

const epics = combineEpics(fetchReverseGeocodeEpic);

export default epics;

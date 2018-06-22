import { ajax } from 'rxjs/observable/dom/ajax';
import { ofType, combineEpics } from 'redux-observable';
import { mergeMap, map, takeUntil, debounceTime } from 'rxjs/operators';
import {
  fetchEventDataFinished,
} from './actions';

import {
  GET_EVENT_BY_ID,
  REVERSE_GEOCODE,
} from '../../utils/apipaths';

import {
  EVENT_FETCH_EVENT_DATA,
  EVENT_FETCH_EVENT_DATA_CANCEL,
} from './actionTypes';

const fetchEventDataEpic = action$ =>
  action$.pipe(
    ofType(EVENT_FETCH_EVENT_DATA),
    mergeMap((action) => {
      const { payload } = action;
      const apiUrl = `${GET_EVENT_BY_ID}?id=${payload.eventid}`;
      return ajax
        .getJSON(apiUrl)
        .pipe(
          map(response => fetchEventDataFinished({ ...payload, ...response })),
          takeUntil(action$.pipe(ofType(EVENT_FETCH_EVENT_DATA_CANCEL))),
        );
    }),
  );

const epics = combineEpics(fetchEventDataEpic);

export default epics;

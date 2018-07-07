import { ajax } from 'rxjs/observable/dom/ajax';
import { of } from 'rxjs/observable/of';
import { ofType, combineEpics } from 'redux-observable';
import { mergeMap, map, takeUntil, catchError } from 'rxjs/operators';
import {
  COMMENTS_FETCH_THREAD,
  COMMENTS_FETCH_THREAD_CANCEL,
} from './actionTypes';
import {
  fetchCommentsThreadSuccess,
  fetchCommnetsThreadError,
} from './actions';
import { COMMENTS } from '../../utils/apipaths';


const fetchCommentsThread = action$ =>
  action$.pipe(
    ofType(COMMENTS_FETCH_THREAD),
    mergeMap((action) => {
      const { threadId } = action.payload;
      const apiUrl = `${COMMENTS}?thread=${threadId}`;
      return ajax
        .getJSON(apiUrl)
        .pipe(
          map(response => fetchCommentsThreadSuccess(response)),
          catchError(error => of(fetchCommnetsThreadError(error))),
          takeUntil(action$.pipe(ofType(COMMENTS_FETCH_THREAD_CANCEL))),
        );
    }),
  );

const epics = combineEpics(fetchCommentsThread);

export default epics;

import { combineEpics } from 'redux-observable';

// Import epics and combine
import feedEpic from './containers/Feed/epic';

const rootEpic = combineEpics(
  feedEpic,
);

export default rootEpic;

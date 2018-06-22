import { combineEpics } from 'redux-observable';

// Import epics and combine
import feedEpic from './containers/Feed/epic';
import eventEpic from './containers/Viewevent/epics';


const rootEpic = combineEpics(
  feedEpic,
  eventEpic,
);

export default rootEpic;

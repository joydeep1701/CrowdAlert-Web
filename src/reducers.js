import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import sidebarReducer from './components/Sidebar/reducers';
import mapReducer from './components/Map/reducers';
import feedReducer from './containers/Feed/reducers';

const rootReducer = combineReducers({
  router: routerReducer,
  sidebar: sidebarReducer,
  map: mapReducer,
  feed: feedReducer,
});

export default rootReducer;

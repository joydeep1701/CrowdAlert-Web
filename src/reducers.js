import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import sidebarReducer from './components/Sidebar/reducers';
import mapReducer from './components/Map/reducers';

const rootReducer = combineReducers({
  router: routerReducer,
  sidebar: sidebarReducer,
  map: mapReducer,
});

export default rootReducer;

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import sidebarReducer from './components/Sidebar/reducers';

const rootReducer = combineReducers({
  router: routerReducer,
  sidebar: sidebarReducer,
});

export default rootReducer;

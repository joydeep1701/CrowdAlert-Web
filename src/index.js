/**
 * CrowdAlert
 * index.js: main entry point of the app
 */


import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import registerServiceWorker from './registerServiceWorker';

import configureStore from './configureStore';

import App from './containers/App'

const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);
const ROOT_NODE = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        {/* <ConnectedRouter history={history}> */}
            <App />
        {/* </ConnectedRouter> */}
    </Provider>,    
     ROOT_NODE
);
registerServiceWorker();

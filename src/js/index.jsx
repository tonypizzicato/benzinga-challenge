import { fromJS } from 'immutable';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

/** Redux utils and middlewares. Check out {@link http://rackt.org/redux/docs/advanced/Middleware.html Middleware} */
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from './utils/createLogger';
import fetchMiddleware from './middlewares/fetchMiddleware';

/** Main application reducer. Check out {@link http://rackt.org/redux/docs/basics/Reducers.html Reducers} */
import reducer from './reducer';
import INITIAL_STATE from '../../config/state.json';

/** onTouchTap workaround. See {@link https://github.com/zilverline/react-tap-event-plugin} */
import injectTapEventPlugin from 'react-tap-event-plugin';

import ApplicationContainer from './app-container.jsx';

import DevTools from './components/DevTools.jsx';

injectTapEventPlugin();

/** Creating store factory with middlewares */
const storeFactoryWithMiddlewares = compose(
    applyMiddleware(thunkMiddleware, fetchMiddleware, loggerMiddleware),
    DevTools.instrument()
)(createStore);

/** Instantiating store with all applied middlewares */
const store = storeFactoryWithMiddlewares(reducer, fromJS(INITIAL_STATE));

/**
 * Rendering our root React component to html element
 *
 * Provider wrapper component provides store context property passing down through children components if needed
 */
render(
    <Provider store={store}>
        <div className="app__container">
            <ApplicationContainer/>
            <DevTools/>
        </div>
    </Provider>,
    document.getElementById("app")
);
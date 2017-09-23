// React imports
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { HashRouter, Route } from 'react-router-dom';

// Redux imports
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

// Quokka imports
import Application from './containers/application';
import RootReducer from './reducers';

// Example of a stateless function component, argument is ALWAYS props
const Router = (props) => (
  <Provider store={props.store}>
    <HashRouter>
      <Route path="/" component={Application} />
    </HashRouter>
  </Provider>
);

Router.propTypes = {
  store: PropTypes.object.isRequired
};

const reduxStore = (preloadedState = {}) => (createStore(RootReducer, preloadedState, applyMiddleware(thunk, logger)));

document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = { session: { currentUser: window.currentUser } };
    store = reduxStore(preloadedState);
    delete window.currentUser;
  } else {
    store = reduxStore();
  }
  ReactDOM.render(<Router store={store} />, document.getElementById('react-application'));
});

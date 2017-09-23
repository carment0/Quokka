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

document.addEventListener('DOMContentLoaded', () => {
  const preloadedState = {};

  if (window.currentUser) {
    preloadedState.session = { currentUser: window.currentUser };
    delete window.currentUser;
  }

  const ReduxStore = createStore(RootReducer, preloadedState, applyMiddleware(thunk, logger));
  ReactDOM.render(<Router store={ReduxStore} />, document.getElementById('react-application'));
});

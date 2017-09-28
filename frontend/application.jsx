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

// Material themes
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// Routes
import ProtectedRoute from './routes/protected_route';
import AuthRoute from './routes/auth_route';

// Quokka imports
import Welcome from './containers/welcome';
import Management from './containers/management';
import RootReducer from './reducers';

const customizedTheme = {
  palette: {
    primary1Color: '#F7882F',
    accent1Color: '#F7C331',
  }
};

console.log(lightBaseTheme);

class Application extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.history.location.pathname === '/') {
      this.props.history.push('/welcome');
    }
  }

  componentDidMount() {
    if (this.props.history.location.pathname === '/') {
      this.props.history.push('/welcome');
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(customizedTheme)}>
        <div>
          <AuthRoute exact path="/welcome" component={Welcome} />
          <ProtectedRoute exact path="/management" component={Management} />
        </div>
      </MuiThemeProvider>
    );
  }
}

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
    preloadedState.sessions = { currentUser: window.currentUser };
    delete window.currentUser;
  }

  const ReduxStore = createStore(RootReducer, preloadedState, applyMiddleware(thunk, logger));
  ReactDOM.render(<Router store={ReduxStore} />, document.getElementById('react-application'));
});

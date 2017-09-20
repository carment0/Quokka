// React import
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { HashRouter, Route } from 'react-router-dom';
import { connect, Provider } from 'react-redux';

// Material themes
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// Material component
import DatePicker from 'material-ui/DatePicker';

// Quokka import
import ReduxStore from './store';

// Actions
import { signup } from './actions/session_actions';

// testing APIs functions
// import * as API from './util/session_api_util';
// window.login = API.login;
// window.signup = API.signup;
// window.logout = API.logout;

class Application extends React.Component {
  state = {
    date: ''
  };

  static propTypes = {
    dispatchSignup: PropTypes.func.isRequired
  };

  componentDidMount() {
    // Purposely put nothing inside
    this.props.dispatchSignup({ username: '', password: '' });
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  // prop arrow fn no need to bind
  handlePickDate = (e, value) => {
    this.setState({ date: value.toString() });
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
          <DatePicker hintText="Pick a date" mode="landscape" onChange={this.handlePickDate} />
          <p>{this.state.date}</p>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStoreStateToProps = (storeState) => ({
  session: storeState.session,
  errors: storeState.errors
});

const mapDispatchToProps = (dispatch) => ({
  dispatchSignup: (userInfo) => dispatch(signup(userInfo))
});

// Example of a stateless function component, argument is ALWAYS props
const Router = (props) => (
  <Provider store={props.store}>
    <HashRouter>
      <Route path="/" component={connect(mapStoreStateToProps, mapDispatchToProps)(Application)} />
    </HashRouter>
  </Provider>
);

Router.propTypes = {
  store: PropTypes.object.isRequired
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Router store={ReduxStore} />, document.getElementById('react-application'));
});

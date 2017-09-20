// React imports
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

// Material themes
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

// Actions
import { signup } from '../actions/session_actions';

// Other containers
import SignupPage from './signup_page';
import HomePage from './home_page';

class Application extends React.Component {
  static propTypes = {
    session: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    dispatchSignup: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.history.push('/signup');
    this.props.dispatchSignup({ username: 'hello', password: '12' });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.session.currentUser !== null) {
      this.props.history.push('/home');
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
          <AppBar title="Welcome to Quokka" />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/home" component={HomePage} />
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

export default connect(mapStoreStateToProps, mapDispatchToProps)(Application);

// React imports
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Material themes
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// Custom routes
import ProtectedRoute from '../routes/protected_route';
import AuthRoute from '../routes/auth_route';

// Actions
import { signup } from '../actions/session_actions';

// Primary containers
import Welcome from './welcome';
import Management from './management';


class Application extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.history.location.pathname === '/') {
      this.props.history.push('/welcome');
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
          <AuthRoute exact path="/welcome" component={Welcome} />
          <ProtectedRoute exact path="/management" component={Management} />
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStoreStateToProps = (storeState) => ({
  errors: storeState.errors
});

const mapDispatchToProps = (dispatch) => ({
  dispatchSignup: (userInfo) => dispatch(signup(userInfo))
});

export default connect(mapStoreStateToProps, mapDispatchToProps)(Application);

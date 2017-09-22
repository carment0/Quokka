// React imports
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

// Material themes
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import AppBar from 'material-ui/AppBar';

// Actions
import { signup } from '../actions/session_actions';

// Other containers
import Welcome from './welcome';
import Management from './management';

class Application extends React.Component {
  static propTypes = {
    session: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const pathName = this.props.history.location.pathname;
    if (pathName !== '/welcome') {
      this.props.history.push('/welcome');
    // this.props.dispatchSignup({ username: 'hello', password: '12' });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      (nextProps.session.currentUser !== null)
      && (nextProps.location.pathname !== '/management')
    ) { this.props.history.push('/management'); }
  }

  render() {
    // <AppBar title="Welcome to Quokka" />
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
          <Route exact path="/welcome" component={Welcome} />
          <Route exact path="/management" component={Management} />
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

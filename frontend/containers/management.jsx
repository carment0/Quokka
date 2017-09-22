import React from 'react';
import PropTypes from 'prop-types';

// Material themes
import AppBar from 'material-ui/AppBar';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';// import IconButton from 'material-ui/IconButton';
// import IconMenu from 'material-ui/IconMenu';
// import MenuItem from 'material-ui/MenuItem';
// import FlatButton from 'material-ui/FlatButton';
// import Toggle from 'material-ui/Toggle';
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
// import NavigationClose from 'material-ui/svg-icons/navigation/close';

import { connect } from 'react-redux';
import { logout } from '../actions/session_actions';

class Management extends React.Component {
  static propTypes = {
    dispatchLogout: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired
  };

  componentWillMount() {
    // Redirect user if no one is currently signed in
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
          <AppBar
            title="Welcome to Quokka" />
          <hgroup className="header-group">
            <h2 className="header-name">Hi, {this.props.currentUser.username}!</h2>
            <button className="header-button" onClick={() => this.props.dispatchLogout()}>Log Out</button>
          </hgroup>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = ({ session }) => ({
  currentUser: session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  dispatchLogout: () => dispatch(logout())
});


export default connect(mapStateToProps, mapDispatchToProps)(Management);

import React from 'react';
import PropTypes from 'prop-types';


// Material themes
import AppBar from 'material-ui/AppBar';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import IconButton from 'material-ui/IconButton';
// import MenuItem from 'material-ui/MenuItem';
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
// import IconMenu from 'material-ui/IconMenu';

import { connect } from 'react-redux';
import { logout } from '../actions/session_actions';

// Quokka imports
import Project_Index from './project_index';
import Task_Index from './task_index';

// Routes
import ProtectedRoute from '../routes/protected_route';

class Management extends React.Component {
  static propTypes = {
    dispatchLogout: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired
  };

  componentWillMount() {
    // Redirect user if no one is currently signed in
  }

  // const Menu = () => (
  //   <IconMenu
  //     iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
  //     anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
  //     targetOrigin={{ horizontal: 'left', vertical: 'top' }}>
  //       <MenuItem primaryText="Profile" />
  //       <MenuItem primaryText="Settings" />
  //       <MenuItem primaryText="Sign out" />
  //   </IconMenu>
  // );

  // Menu.muiName = 'IconMenu';

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div className="management-page">
          <AppBar title="welcome back" />
          <div className="management-main">
            <div className="left-sidebar">
              <div className="user-project-sidebar">
                <ul>
                  <h3>My Projects</h3>
                  <li>sdfgsdfg</li>
                  <li>sdfgsdfg</li>
                  <li>sdfgsdfg</li>
                </ul>
              </div>
              <div className="user-notification-sidebar">my notifications</div>
            </div>
            <div className="right-container">
              <ProtectedRoute path="/projects" component={Project_Index} />
              <ProtectedRoute path="/tasks" component={Task_Index} />
              <h2 className="header-name">Hi, {this.props.currentUser.username}!</h2>
              <button className="header-button" onClick={() => this.props.dispatchLogout()}>Log Out</button>
            </div>
          </div>
          <div className="management-footer">
            <div className="my-connection"><h4>djfghlksdjf</h4></div>
            <div className="icons" id="1">github icon</div>
            <div className="icons" id="2">linkedin icon</div>
          </div>
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

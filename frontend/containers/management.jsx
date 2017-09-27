import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';

// Actions
import { logout } from '../actions/session_actions';

// Quokka imports
import AdministratedProjectIndex from './administrated_project_index';
import AssignedProjectIndex from './assigned_project_index';


class Management extends React.Component {
  state = {
    sidebarOpen: false
  };

  static propTypes = {
    dispatchLogout: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired
  };

  handleSidebarOpen = () => {
    this.setState({
      sidebarOpen: !this.state.sidebarOpen
    });
  }

  handleLogout = () => {
    this.props.dispatchLogout();
  }

  get managementMainContentClassName() {
    if (this.state.sidebarOpen) {
      return 'main-content content-with-menu-open';
    }

    return 'main-content';
  }

  get sidebarClassName() {
    if (this.state.sidebarOpen) {
      return 'left-side-bar left-side-bar-with-menu-open';
    }

    return 'left-side-bar';
  }

  render() {
    return (
      <div className="management">
        <div className={this.sidebarClassName}>
          <Drawer open={this.state.sidebarOpen} swipeAreaWidth={50}>
            <MenuItem>Menu Item</MenuItem>
            <MenuItem>Menu Item 2</MenuItem>
          </Drawer>
        </div>
        <div className={this.managementMainContentClassName}>
          <h2 className="header-name">Hi, {this.props.currentUser.username}!</h2>
          <RaisedButton label="Log out" onClick={this.handleLogout} />
          <RaisedButton label="Menu" onClick={this.handleSidebarOpen} />
          <AdministratedProjectIndex />
          <AssignedProjectIndex />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ sessions }) => ({
  currentUser: sessions.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  dispatchLogout: () => dispatch(logout())
});


export default connect(mapStateToProps, mapDispatchToProps)(Management);

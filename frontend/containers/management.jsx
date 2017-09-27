import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { logout } from '../actions/session_actions';

// Quokka imports
import AdministratedProjectIndex from './administrated_project_index';
import AssignedProjectIndex from './assigned_project_index';

// Routes

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
      <div className="management">
        <div className="management-main">
          <div className="left-sidebar">
            <div className="user-project-sidebar">Project Sidebar</div>
            <div className="user-notification-sidebar">My Notifications</div>
          </div>
          <div className="right-container">
            <h2 className="header-name">Hi, {this.props.currentUser.username}!</h2>
            <button className="header-button" onClick={() => this.props.dispatchLogout()}>Log out</button>
            <AdministratedProjectIndex />
            <AssignedProjectIndex />
          </div>
        </div>
        <div className="management-footer">
          <div className="icons" id="1">github icon</div>
          <div className="icons" id="2">linkedin icon</div>
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

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

// Material UI
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';

// Actions
import { logout } from '../actions/session_actions';

// Components
import ProjectsOverview from './projects_overview';
import TasksOverview from './tasks_overview';
import Calendar from './calendar';


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
          <div className="nav-bar">
            <div className="left-container">
              <RaisedButton label="Menu" onClick={this.handleSidebarOpen} />
            </div>
            <div className="right-container">
              <h2 className="header-name">Hi, {this.props.currentUser.username}!</h2>
              <RaisedButton label="Log out" onClick={this.handleLogout} />
            </div>
          </div>

          <div className="content-body">
            <Paper zDepth={1} className="dash-board">
              <Switch>
                <Route exact path="/management/" component={ProjectsOverview} />
                <Route path="/management/projects" component={ProjectsOverview} />
                <Route path="/management/tasks" component={TasksOverview} />
                <Route path="/management/calendar" component={Calendar} />
              </Switch>
            </Paper>
          </div>
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

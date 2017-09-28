import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

// Material UI
import Drawer from 'material-ui/Drawer';
import { Tabs, Tab } from 'material-ui/Tabs';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import AssignmentIcon from 'material-ui/svg-icons/action/assignment';
import ListIcon from 'material-ui/svg-icons/action/list';
import DateIcon from 'material-ui/svg-icons/action/date-range';

// Actions
import { logout } from '../actions/session_actions';

// Components
import ProjectsOverview from './projects_overview';
import TasksOverview from './tasks_overview';
import Calendar from './calendar';

// Style
import Colors from '../shared/colors';

class Management extends React.Component {
  state = {
    sidebarOpen: false
  };

  static propTypes = {
    dispatchLogout: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
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

  get iconElementLeft() {
    if (this.state.sidebarOpen) {
      return (
        <IconButton onClick={this.handleSidebarOpen}>
          <NavigationClose />
        </IconButton>
      );
    }

    return (
      <IconButton onClick={this.handleSidebarOpen}>
        <NavigationMenu />
      </IconButton>
    );
  }

  get iconElementRight() {
    return (
      <FlatButton label="Log out"
        onClick={this.handleLogout}
        labelStyle={{ color: 'white', fontWeight: '900' }} />
    );
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
            <AppBar
              iconElementLeft={this.iconElementLeft}
              iconElementRight={this.iconElementRight} />
          </div>

          <div className="content-body">
            <Tabs>
              <Tab
                style={{ backgroundColor: Colors.DARK_APPLE_CORE }}
                icon={<AssignmentIcon />}
                label="Projects"
                onActive={() => { this.props.history.push('/management/projects'); }} />
              <Tab
                style={{ backgroundColor: Colors.DARK_APPLE_CORE }}
                icon={<ListIcon />}
                label="Tasks"
                onActive={() => { this.props.history.push('/management/tasks'); }} />
              <Tab
                style={{ backgroundColor: Colors.DARK_APPLE_CORE }}
                icon={<DateIcon />}
                label="Calendar"
                onActive={() => { this.props.history.push('/management/calendar'); }} />
            </Tabs>
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

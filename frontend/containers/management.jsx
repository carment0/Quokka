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
import ProjectDetail from './project_detail';

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

  /**
   * Returns the appropriate class name of the management main content section
   * @returns {string}
   */
  get managementMainContentClassName() {
    if (this.state.sidebarOpen) {
      return 'main-content content-with-menu-open';
    }

    return 'main-content';
  }

  /**
   * Returns the appropriate class name of the sidebar section
   * @returns {string}
   */
  get sidebarClassName() {
    if (this.state.sidebarOpen) {
      return 'left-side-bar left-side-bar-with-menu-open';
    }

    return 'left-side-bar';
  }

  /**
   * Returns the icon element that sits on the left side of the app bar
   * @returns {React.Element}
   */
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

  /**
   * Returns the icon element that sits on the right side of the app bar
   * @returns {React.Element}
   */
  get iconElementRight() {
    return (
      <FlatButton label="Log out"
        onClick={this.handleLogout}
        labelStyle={{ color: 'white', fontWeight: '900' }} />
    );
  }

  render() {
    return (
      <management className="management">
        <section className={this.sidebarClassName}>
          <Drawer open={this.state.sidebarOpen} swipeAreaWidth={50}>
            <h2>Quokka</h2>
            <MenuItem>Create New Project</MenuItem>
            <MenuItem>Create New Team</MenuItem>
          </Drawer>
        </section>
        <section className={this.managementMainContentClassName}>
          <nav className="nav-bar">
            <AppBar
              iconElementLeft={this.iconElementLeft}
              iconElementRight={this.iconElementRight} />
          </nav>
          <content className="content-body">
            <Tabs className="tabs-controller">
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
            <Paper zDepth={1} className="content-component">
              <Switch>
                <Route exact path="/management/" component={ProjectsOverview} />
                <Route exact path="/management/projects" component={ProjectsOverview} />
                <Route path="/management/projects/:id" component={ProjectDetail} />
                <Route path="/management/tasks" component={TasksOverview} />
                <Route path="/management/calendar" component={Calendar} />
              </Switch>
            </Paper>
          </content>
        </section>
      </management>
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

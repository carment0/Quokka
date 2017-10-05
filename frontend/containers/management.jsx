// React
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

// Material UI
import { Tabs, Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Divider from 'material-ui/Divider';

// Icons
import ListIcon from 'material-ui/svg-icons/action/list';
import DateIcon from 'material-ui/svg-icons/action/date-range';
import AssignmentIcon from 'material-ui/svg-icons/action/assignment';
import PeopleOutline from 'material-ui/svg-icons/social/people-outline';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';

// Actions
import { logout } from '../actions/session_actions';
import { createProject } from '../actions/project_actions';

// Other Containers
import ProjectDetail from './projects/project_detail';
import ProjectOverview from './projects/project_overview';
import ProjectCreator from './projects/project_creator';
import TaskOverview from './tasks/task_overview';
import CalendarOverview from './calendars/calendar_overview';

// Style
import Colors from '../shared/colors';


class Management extends React.Component {
  state = { sidebarOpen: false, dialogOpen: false };

  static propTypes = {
    dispatchLogout: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  toggleSidebarExpand = () => {
    this.setState({
      sidebarOpen: !this.state.sidebarOpen
    });
  };

  handleLogout = () => {
    this.props.dispatchLogout();
  };

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
        <IconButton onClick={this.toggleSidebarExpand}>
          <NavigationClose />
        </IconButton>
      );
    }

    return (
      <IconButton onClick={this.toggleSidebarExpand}>
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
        labelStyle={{ color: 'white', fontWeight: '900', marginRight: '2rem' }} />
    );
  }

  render() {
    return (
      <management className="management">
        <section className={this.sidebarClassName}>
          <Drawer open={this.state.sidebarOpen} swipeAreaWidth={50}>
            <MenuItem
              onClick={() => this.props.history.push('/management/create_project')}
              rightIcon={<AddCircleOutline />}>
              Create New Project
            </MenuItem>
            <MenuItem rightIcon={<PeopleOutline />}>
              Create New Team
            </MenuItem>
            <Divider />
            <MenuItem rightIcon={<AccountCircle />}>
              My Profile
            </MenuItem>
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
                onActive={() => this.props.history.push('/management/projects')} />
              <Tab
                style={{ backgroundColor: Colors.DARK_APPLE_CORE }}
                icon={<ListIcon />}
                label="Tasks"
                onActive={() => this.props.history.push('/management/tasks')} />
              <Tab
                style={{ backgroundColor: Colors.DARK_APPLE_CORE }}
                icon={<DateIcon />}
                label="Calendar"
                onActive={() => this.props.history.push('/management/calendar')} />
            </Tabs>
            <Paper zDepth={1} className="content-component" rounded={false}>
              <Switch>
                <Route exact path="/management/" component={ProjectOverview} />
                <Route exact path="/management/projects" component={ProjectOverview} />
                <Route path="/management/projects/:id" component={ProjectDetail} />
                <Route path="/management/tasks" component={TaskOverview} />
                <Route path="/management/calendar" component={CalendarOverview} />
                <Route path="/management/create_project" component={ProjectCreator} />
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
  dispatchLogout: () => dispatch(logout()),
  dispatchCreateProject: (project) => dispatch(createProject(project))
});

export default connect(mapStateToProps, mapDispatchToProps)(Management);

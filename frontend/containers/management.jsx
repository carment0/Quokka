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
import ListIcon from 'material-ui/svg-icons/action/list';
import DateIcon from 'material-ui/svg-icons/action/date-range';
import AssignmentIcon from 'material-ui/svg-icons/action/assignment';
import Dialog from 'material-ui/Dialog';

// Actions
import { logout } from '../actions/session_actions';
import { createProject } from '../actions/project_actions';

// Other Containers
import ProjectDetail from './projects/project_detail';
import ProjectOverview from './projects/project_overview';
import TaskOverview from './tasks/task_overview';
import CalendarOverview from './calendars/calendar_overview';

// One component
import CreateProject from '../components/projects/create_project';

// Style
import Colors from '../shared/colors';

// Dialog content is the white box that pops up during on click
const dialogContentStyle = {
  width: '70%',
  minWidth: '500px',
  maxWidth: '980px'
};

// Dialog title is the title section inside content body
const dialogTitleStyle = {
  fontWeight: '100',
  fontSize: '2rem',
  display: 'flex',
  justifyContent: 'flex-start',
};


class Management extends React.Component {
  state = {
    sidebarOpen: false,
    dialogOpen: false
  };

  static propTypes = {
    dispatchLogout: PropTypes.func.isRequired,
    dispatchCreateProject: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  handleSidebarOpen = () => {
    this.setState({
      sidebarOpen: !this.state.sidebarOpen
    });
  }

  handleDialogOpen = () => {
    this.setState({
      dialogOpen: true
    });
  }

  handleDialogClose = () => {
    this.setState({
      dialogOpen: false
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
        labelStyle={{ color: 'white', fontWeight: '900', marginRight: '2rem' }} />
    );
  }

  render() {
    return (
      <management className="management">
        <section className={this.sidebarClassName}>
          <Drawer open={this.state.sidebarOpen} swipeAreaWidth={50}>
            <MenuItem onClick={this.handleDialogOpen}>Create New Project</MenuItem>
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
              </Switch>
            </Paper>
          </content>
          <Dialog
            titleStyle={dialogTitleStyle}
            contentStyle={dialogContentStyle}
            title={'Create New Project'}
            modal={false}
            open={this.state.dialogOpen}
            onRequestClose={this.handleDialogClose}>
            <CreateProject
              handleDialogClose={this.handleDialogClose}
              dispatchCreateProject={this.props.dispatchCreateProject} />
          </Dialog>
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

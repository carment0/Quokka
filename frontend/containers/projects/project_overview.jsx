import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';

// Components
import AdminProjectIndex from '../../components/projects//admin_project_index';
import AssignedProjectIndex from '../../components/projects/assigned_project_index';
import ProjectEditor from '../../components/projects/project_editor';

// Actions
import {
  fetchAssignedProjects,
  fetchAdministratedProjects,
  updateProject,
  deleteProject
} from '../../actions/project_actions';

// Dialog content is the white box that pops up during on click
const dialogContentStyle = {
  width: '70%',
  minWidth: '500px',
  maxWidth: '980px'
};

// Dialog title is the title section inside content body
const dialogTitleStyle = {
  display: 'flex',
  justifyContent: 'flex-start',
  fontWeight: '100',
  fontSize: '2rem'
};

class ProjectOverview extends React.Component {
  state = { dialogOpen: false };

  static propTypes = {
    history: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    assignedProjects: PropTypes.object.isRequired,
    adminProjects: PropTypes.object.isRequired,
    dispatchDeleteProject: PropTypes.func.isRequired,
    dispatchUpdateProject: PropTypes.func.isRequired,
    dispatchFetchAdministratedProjects: PropTypes.func.isRequired,
    dispatchFetchAssignedProjects: PropTypes.func.isRequired
  };

  handleDialogOpen = (projectId) => {
    this.setState({
      selectedProject: this.props.adminProjects[projectId],
      dialogOpen: true
    });
  };

  handleDialogClose = () => {
    this.setState({
      dialogOpen: false
    });
  };

  componentDidMount() {
    this.props.dispatchFetchAdministratedProjects(this.props.currentUser.id);
    this.props.dispatchFetchAssignedProjects(this.props.currentUser.id);
  }

  render() {
    return (
      <div className="project-overview">
        <h1>Project Overview</h1>
        <AdminProjectIndex
          history={this.props.history}
          adminProjects={this.props.adminProjects}
          handleDialogOpen={this.handleDialogOpen}
          dispatchDeleteProject={this.props.dispatchDeleteProject} />
        <AssignedProjectIndex assignedProjects={this.props.assignedProjects} history={this.props.history} />
        <Dialog
          titleStyle={dialogTitleStyle}
          contentStyle={dialogContentStyle}
          title={'Create New Project'}
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.handleDialogClose}>
          <ProjectEditor
            selectedProject={this.state.selectedProject}
            handleDialogClose={this.handleDialogClose}
            dispatchUpdateProject={this.props.dispatchUpdateProject} />
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.sessions.currentUser,
  assignedProjects: state.projects.assigned,
  adminProjects: state.projects.administrated
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchAssignedProjects: (userId) => dispatch(fetchAssignedProjects(userId)),
  dispatchFetchAdministratedProjects: (userId) => dispatch(fetchAdministratedProjects(userId)),
  dispatchUpdateProject: (project) => dispatch(updateProject(project)),
  dispatchDeleteProject: (projectId) => dispatch(deleteProject(projectId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectOverview);

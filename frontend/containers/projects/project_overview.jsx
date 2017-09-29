import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import AdminProjectIndex from '../../components/projects//admin_project_index';
import AssignedProjectIndex from '../../components/projects/assigned_project_index';

// Actions
import {
  fetchAssignedProjects,
  fetchAdministratedProjects,
  deleteProject
} from '../../actions/project_actions';


class ProjectOverview extends React.Component {
  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    dispatchFetchAssignedProjects: PropTypes.func.isRequired,
    dispatchFetchAdministratedProjects: PropTypes.func.isRequired,
    dispatchDeleteProject: PropTypes.func.isRequired,
    assignedProjects: PropTypes.object.isRequired,
    adminProjects: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.dispatchFetchAdministratedProjects(this.props.currentUser.id);
    this.props.dispatchFetchAssignedProjects(this.props.currentUser.id);
  }

  render() {
    return (
      <div className="project-overview">
        <h1>Project Overview</h1>
        <AdminProjectIndex
          adminProjects={this.props.adminProjects}
          history={this.props.history}
          dispatchDeleteProject={this.props.dispatchDeleteProject} />
        <AssignedProjectIndex assignedProjects={this.props.assignedProjects} history={this.props.history} />
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
  dispatchDeleteProject: (projectId) => dispatch(deleteProject(projectId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectOverview);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import AdministratedProjectIndex from '../../components/projects//administrated_project_index';
import AssignedProjectIndex from '../../components/projects/assigned_project_index';

// Actions
import { fetchAssignedProjects, fetchAdministratedProjects } from '../../actions/project_actions';


class ProjectOverview extends React.Component {
  static propTypes = {
    dispatchFetchAssignedProjects: PropTypes.func.isRequired,
    dispatchFetchAdministratedProjects: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
    assignedProjects: PropTypes.object.isRequired,
    administratedProjects: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.dispatchFetchAdministratedProjects(this.props.currentUser.id);
    this.props.dispatchFetchAssignedProjects(this.props.currentUser.id);
  }

  render() {
    return (
      <div>
        <h1>Project Overview</h1>
        <AdministratedProjectIndex administratedProjects={this.props.administratedProjects} />
        <AssignedProjectIndex assignedProjects={this.props.assignedProjects} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.sessions.currentUser,
  assignedProjects: state.projects.assigned,
  administratedProjects: state.projects.administrated
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchAssignedProjects: (userId) => dispatch(fetchAssignedProjects(userId)),
  dispatchFetchAdministratedProjects: (userId) => dispatch(fetchAdministratedProjects(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectOverview);

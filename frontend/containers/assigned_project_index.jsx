import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAssignedProjects } from '../actions/project_actions';

class AssignedProjectIndex extends React.Component {
  static propTypes = {
    dispatchFetchAssignedProjects: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
    assignedProjects: PropTypes.object.isRequired
  }

  componentWillMount() {
    this.props.dispatchFetchAssignedProjects(this.props.currentUser.id);
  }

  get projects() {
    if (Object.keys(this.props.assignedProjects).length === 0) {
      return <div />;
    }

    return Object.keys(this.props.assignedProjects).map((projectId) => {
      const project = this.props.assignedProjects[projectId];
      return <li key={project.name}>{project.name}</li>;
    });
  }

  render() {
    return (
      <div>
        <h1>Your assigned projects</h1>
        <ul>{this.projects}</ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.sessions.currentUser,
  assignedProjects: state.projects.assigned
});


const mapDispatchToProps = (dispatch) => ({
  dispatchFetchAssignedProjects: (userId) => dispatch(fetchAssignedProjects(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(AssignedProjectIndex);

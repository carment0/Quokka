import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAdministratedProjects } from '../actions/project_actions';

class AdministratedProjectIndex extends React.Component {
  static propTypes = {
    dispatchFetchAdministratedProjects: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
    administratedProjects: PropTypes.object.isRequired
  }

  componentWillMount() {
    this.props.dispatchFetchAdministratedProjects(this.props.currentUser.id);
  }

  get projects() {
    if (Object.keys(this.props.administratedProjects).length === 0) {
      return <div />;
    }

    return Object.keys(this.props.administratedProjects).map((projectId) => {
      const project = this.props.administratedProjects[projectId];
      return <li key={project.name}>{project.name}</li>;
    });
  }

  render() {
    return (
      <div>
        <h1>Your administrated projects</h1>
        <ul>{this.projects}</ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.sessions.currentUser,
  administratedProjects: state.projects.administrated
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchAdministratedProjects: (userId) => dispatch(fetchAdministratedProjects(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdministratedProjectIndex);

import React from 'react';
import PropTypes from 'prop-types';


class AssignedProjectIndex extends React.Component {
  static propTypes = {
    assignedProjects: PropTypes.object.isRequired
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

export default AssignedProjectIndex;

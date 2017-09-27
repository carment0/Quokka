import React from 'react';
import PropTypes from 'prop-types';


class AdministratedProjectIndex extends React.Component {
  static propTypes = {
    administratedProjects: PropTypes.object.isRequired
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

export default AdministratedProjectIndex;

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
      return (
        <li key={project.name}>
          <div className="project-summary">
            <Link to={`/management/projects/${project.id}`}
              className="project-link"
              style={{ textDecoration: 'none', color: 'black' }}>
              <div className="project-detail-1">
                <name style={{ textDecoration: 'underline' }}> {project.name} </name>
                <deadline> Deadline: {project.deadline} </deadline>
              </div>
              <div className="project-detail-2">
                <description> {project.description} </description>
              </div>
            </Link>
          </div>
          <div className="graph-summary">
              graph coming soon
          </div>
        </li>);
    });
  }

  render() {
    return (
      <div className="admin-projects">
        <h4>Your Administrated Projects</h4>
        <ul className="admin-projects-list">{this.projects}</ul>
      </div>
    );
  }
}

export default AdministratedProjectIndex;

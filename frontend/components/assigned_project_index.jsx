import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
      return (
        <li key={project.name}>
          <div className="project-summary">
            <Link to={`/projects/${project.id}`}
              className="project-link"
              style={{ textDecoration: 'none', color: 'black' }}>
              <div className="project-detail-1">
                <name> {project.name} </name>
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
      <div className="assigned-projects">
        <h4>Your Assigned Projects</h4>
        <ul className="assigned-projects-list">{this.projects}</ul>
      </div>
    );
  }
}

export default AssignedProjectIndex;

// React
import React from 'react';
import PropTypes from 'prop-types';
// Material UI
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


class AdminProjectIndex extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    adminProjects: PropTypes.object.isRequired,
    handleDialogOpen: PropTypes.func.isRequired,
    dispatchDeleteProject: PropTypes.func.isRequired
  }

  createViewProjectHandler(projectId) {
    return (e) => {
      e.preventDefault();
      this.props.history.push(`/management/projects/${projectId}`);
    };
  }

  createDeleteProjectHandler(projectId) {
    return (e) => {
      e.preventDefault();
      this.props.dispatchDeleteProject(projectId);
    };
  }

  createEditProjectHandler(projectId) {
    return (e) => {
      e.preventDefault();
      this.props.handleDialogOpen(projectId);
    };
  }

  get projectCardList() {
    const projectIds = Object.keys(this.props.adminProjects);

    if (projectIds.length === 0) {
      return;
    }

    const items = projectIds.map((projectId) => {
      const project = this.props.adminProjects[projectId];

      return (
        <Card key={project.id}>
          <CardHeader
            title={project.name}
            subtitle={'Deadline: ' + project.deadline}
            actAsExpander={true}
            showExpandableButton={true}
            style={{ fontWeight: '900', padding: '0.5rem' }} />
          <CardActions
            style={{ display: 'flex', justifyContent: 'flex-end', padding: '0.5rem' }}>
            <FlatButton label="View" primary={true} onClick={this.createViewProjectHandler(project.id)} />
            <FlatButton label="Edit" onClick={this.createEditProjectHandler(project.id)} />
            <FlatButton label="Delete" secondary={true} onClick={this.createDeleteProjectHandler(project.id)} />
          </CardActions>
          <CardText expandable={true}>{project.description}</CardText>
        </Card>
      );
    });

    return (
      <div className="project-card-list">
        {items}
      </div>
    );
  }

  render() {
    return (
      <div className="admin-projects">
        <h2>Your Administrated Projects</h2>
        {this.projectCardList}
      </div>
    );
  }
}

export default AdminProjectIndex;

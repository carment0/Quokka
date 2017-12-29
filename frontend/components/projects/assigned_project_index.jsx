// React
import React from 'react';
import PropTypes from 'prop-types';
// Material UI
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


class AssignedProjectIndex extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    assignedProjects: PropTypes.object.isRequired
  }

  createViewProjectHandler(projectId) {
    return (e) => {
      e.preventDefault();
      this.props.history.push(`/management/projects/${projectId}`);
    };
  }

  get projectCardList() {
    const projectIds = Object.keys(this.props.assignedProjects);

    if (projectIds.length === 0) {
      return;
    }

    const items = projectIds.map((projectId) => {
      const project = this.props.assignedProjects[projectId];

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
          </CardActions>
          <CardText expandable={true}>
            <div dangerouslySetInnerHTML={{ __html: project.description }} />
          </CardText>
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
        <h2>Your Assigned Projects</h2>
        {this.projectCardList}
      </div>
    );
  }
}

export default AssignedProjectIndex;

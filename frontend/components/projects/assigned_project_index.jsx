// React
import React from 'react';
import PropTypes from 'prop-types';
// Material UI
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


class AssignedProjectIndex extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    assignedProjects: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired
  }

  createViewProjectHandler(projectId) {
    return (e) => {
      e.preventDefault();
      this.props.history.push(`/management/projects/${projectId}`);
    };
  }

  isOverDue = (project) => {
    let now = new Date();
    now = new Date(now.getTime() - (now.getTimezoneOffset() * 60000));
    if (project.completed) {
      return 'completed';
    } else if (new Date(project.deadline).getTime() >= now) {
      return 'progress';
    }
    return 'due';
  };

  subtitleColor = (project) => {
    switch (this.isOverDue(project)) {
      case 'completed':
        return 'green';
      case 'progress':
        return 'gray';
      case 'due':
        return 'red';
    }
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
            subtitle={project.completed ? 'Project Completed' : 'Deadline: ' + project.deadline}
            actAsExpander={true}
            showExpandableButton={true}
            subtitleColor={this.subtitleColor(project)}
            style={{ fontWeight: '500', padding: '0.5rem' }} />
          <CardText expandable={true} color={'#6B7A8F'}>
            <p>Project Summary:</p>
            <div dangerouslySetInnerHTML={{ __html: project.description }} />
          </CardText>
          <CardActions
            style={{ display: 'flex', justifyContent: 'flex-end', padding: '0.5rem' }}>
            <FlatButton label="View" primary={true} onClick={this.createViewProjectHandler(project.id)} />
          </CardActions>
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
      <div className="assigned-projects">
        <div className="title">
          <h2>{this.props.currentUser.first_name + ' ' + this.props.currentUser.last_name + "'s"} Assigned Projects</h2>
        </div>
        {this.projectCardList}
      </div>
    );
  }
}

export default AssignedProjectIndex;

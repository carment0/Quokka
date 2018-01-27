// React
import React from 'react';
import PropTypes from 'prop-types';
// Material UI
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
// Enums
// Dialog content is the white box that pops up during on click
const dialogContentStyle = {
  width: '70%',
  minWidth: '500px',
  maxWidth: '980px'
};
// Dialog title is the title section inside content body
const dialogTitleStyle = {
  display: 'flex',
  justifyContent: 'flex-start',
  fontWeight: '100',
  fontSize: '2rem'
};

class AdminProjectIndex extends React.Component {
  state = {
    dialogOpen: false
  }

  static propTypes = {
    history: PropTypes.object.isRequired,
    adminProjects: PropTypes.object.isRequired,
    dispatchDeleteProject: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired
  }

  createViewProjectHandler(projectId) {
    return (e) => {
      e.preventDefault();
      this.props.history.push(`/management/projects/${projectId}`);
    };
  }

  createDeleteProjectHandler() {
    return (e) => {
      e.preventDefault();
      this.props.dispatchDeleteProject(this.state.projectSelected);
      this.setState({
        dialogOpen: false
      });
    };
  }

  handleDialogOpen(projectId) {
    return (e) => {
      e.preventDefault();
      this.setState({
        dialogOpen: true,
        projectSelected: projectId
      });
    };
  }

  handleDialogClose = () => {
    this.setState({
      dialogOpen: false,
      projectSelected: ''
    });
  };

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
            <FlatButton label="Delete" secondary={true} onClick={this.handleDialogOpen(project.id)} />
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
      <div className="admin-projects">
        <div className="title">
          <h2>{this.props.currentUser.first_name + ' ' + this.props.currentUser.last_name + "'s"} Administrated Projects</h2>
        </div>
        {this.projectCardList}
        <Dialog
          titleStyle={dialogTitleStyle}
          contentStyle={dialogContentStyle}
          modal={false}
          title={'Are you sure you want to delete this project?'}
          open={this.state.dialogOpen}
          onRequestClose={this.handleDialogClose}>
          <div>
            <FlatButton
              type="delete"
              label="Confirm Delete"
              primary={true}
              keyboardFocused={true}
              onClick={this.createDeleteProjectHandler()} />
            <FlatButton label="Cancel"
              primary={true}
              onClick={this.handleDialogClose} />
          </div>
        </Dialog>
      </div>
    );
  }
}

export default AdminProjectIndex;

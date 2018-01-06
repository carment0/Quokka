// React
import React from 'react';
import PropTypes from 'prop-types';
// Material UI
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

class ProjectTaskItem extends React.Component {
  static propTypes = {
    task: PropTypes.object.isRequired,
    projectId: PropTypes.number.isRequired,
    deleteTask: PropTypes.func.isRequired
  }

  handleDeleteTask(projectId, taskId) {
    return (e) => {
      e.preventDefault();
      this.props.deleteTask(projectId, taskId);
    };
  }

  get taskControls() {
    return (
      <div>
        <FlatButton label="Delete" secondary={true} onClick={this.handleDeleteTask(this.props.projectId, this.props.task.id)} />
        <FlatButton label="Edit" secondary={true}  />
      </div>
    );
  }

  render() {
    return (
      <Paper className="project-task-item" zDepth={1} rounded={false}>
        <p>{this.props.task.name}</p>
        <p>{this.props.task.description}</p>
        <p>{this.props.task.due_date}</p>
        <p>{this.props.task.completed ? 'Completed' : 'In progress'}</p>
        {this.taskControls}
      </Paper>
    );
  }
}

export default ProjectTaskItem;

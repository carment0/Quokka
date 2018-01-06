// React
import React from 'react';
import PropTypes from 'prop-types';
// Material UI
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
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

class ProjectTaskItem extends React.Component {
  state = {
    dialogOpen: false,
    task: {
      project_id: this.props.task.project_id,
      name: this.props.task.name,
      description: this.props.task.description,
      completed: this.props.task.completed,
      due_date: this.props.task.due_date,
      assignees: this.props.task.assignees
    }
  }

  static propTypes = {
    task: PropTypes.object.isRequired,
    projectId: PropTypes.number.isRequired,
    deleteTask: PropTypes.func.isRequired,
    editTask: PropTypes.func.isRequired,
    staff: PropTypes.func.isRequired
  }

  handleDeleteTask(projectId, taskId) {
    return (e) => {
      e.preventDefault();
      this.props.deleteTask(projectId, taskId);
    };
  }

  handleEditTask = (e) => {
    e.preventDefault();
    this.setState({ dialogOpen: true });
    console.log("editing");
  }


  handleDialogClose = () => {
    this.setState({
      dialogOpen: false
    });
  };

  handleEditSubmission() {
  }

  get assigeeNames() {
    const names = new Set();
    this.props.task.assignees.forEach((person) => {
      names.add(person.first_name[0].concat('. ' + person.last_name));
    });

    const chips = Array.from(names).map((name) => (
      <Chip
        style={{ marginLeft: '0.1rem', marginRight: '0.1rem' }}
        className="chip"
        key={name}
        onClick={this.handleToggleUserProfile}>
        {name}
      </Chip>
    ));

    return (
      <div>
        <div className="assignee-chips">{chips}</div>
      </div>
    );
  }

  get taskControls() {
    return (
      <div>
        <FlatButton label="Delete" secondary={true} onClick={this.handleDeleteTask(this.props.projectId, this.props.task.id)} />
        <FlatButton label="Edit" secondary={true}  onClick={this.handleEditTask()}/>
      </div>
    );
  }

  render() {
    return (
      <Paper className="project-task-item" zDepth={1} rounded={false}>
        <h3>{this.props.task.name}</h3>
        <p>{this.props.task.description}</p>
        <p>{this.props.task.due_date}</p>
        <div>
          <p>{this.props.task.completed ? 'Completed' : 'In progress'} by</p>
          {this.props.task.assignees[0] ? this.assigeeNames : 'not assigned'}
        </div>
        {this.taskControls}
        <Dialog
          titleStyle={dialogTitleStyle}
          contentStyle={dialogContentStyle}
          title={'Edit a task'}
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.handleDialogClose}>
          <form className="task-edit-form" onSubmit={this.handleEditSubmission}>
            <div className="form-box">
              <TextField hintText={'Task name'} fullWidth={true} onChange={this.update('name')} />
            </div>
            <div className="form-box">
              <TextField hintText={'Description'} fullWidth={true} onChange={this.update('description')} />
            </div>
            <div className="form-box">
              <DatePicker
                hintText="Deadline"
                value={new Date(this.state.deadline)}
                container="inline"
                mode="landscape"
                onChange={this.handlePickDate} />
            </div>
            <FlatButton
              type="submit"
              label="Submit"
              primary={true}
              keyboardFocused={true} />
            <FlatButton label="Cancel"
              primary={true}
              onClick={this.handleDialogClose} />
          </form>
        </Dialog>
      </Paper>
    );
  }
}

export default ProjectTaskItem;

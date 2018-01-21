// React
import React from 'react';
import PropTypes from 'prop-types';
// creates keys for mapping
import uuid from 'uuid/v1';
// Material UI
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import AddCircle from 'material-ui/svg-icons/content/add-circle-outline';

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
  fontSize: '2rem',
  color: '#F7882F'
};

const style = {
  margin: 12,
  color: '#F7882F'
};

class CreateTask extends React.Component {
  state = {
    dialogOpen: false,
    task: {
      project_id: this.props.projectId,
      name: '',
      description: '',
      completed: false,
      due_date: '',
      assignees: []
    }
  }

  static propTypes = {
    errors: PropTypes.array.isRequired,
    projectId: PropTypes.number.isRequired,
    clearErrors: PropTypes.func.isRequired,
    createTask: PropTypes.func.isRequired,
  };

  handleTaskForm = (e) => {
    e.preventDefault();
    this.setState({ dialogOpen: true });
  }

  handleFormSubmission = (e) => {
    e.preventDefault();
    this.props.createTask(this.props.projectId, this.state.task).then(() => this.props.clearErrors()).then(() =>
      this.handleDialogClose()
    );
  };

  update(field) {
    return (e) => {
      const task = Object.assign({}, this.state.task);
      task[field] = e.currentTarget.value;
      this.setState({ task });
    };
  }

  handlePickDate = (nullVal, date) => {
    const task = Object.assign({}, this.state.task);
    task.due_date = date;
    this.setState({ task });
  };

  handleDialogClose = () => {
    this.props.clearErrors();
    this.setState({
      dialogOpen: false
    });
  };

  get renderErrors() {
    return (
      <ul className="session-errors">
        {this.props.errors.map((error) => (
          <li key={uuid()} >
            {error}
          </li>
        ))}
      </ul>
    );
  }

  get taskForm() {
    if (this.state.taskFormOpen === false) {
      return;
    }

    return (
      <div>
        <Dialog
          titleStyle={dialogTitleStyle}
          contentStyle={dialogContentStyle}
          title={'Add a Task'}
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.handleDialogClose}>
          <form className="project-form" onSubmit={this.handleFormSubmission}>
            {this.renderErrors}
            <div className="form-box">
              <TextField hintText={'Task name'} fullWidth={true} onChange={this.update('name')} />
            </div>
            <div className="form-box">
              <TextField hintText={'Description'} fullWidth={true} onChange={this.update('description')} />
            </div>
            <div className="form-box">
              <DatePicker hintText="Deadline" container="inline" mode="landscape" onChange={this.handlePickDate} />
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
      </div>
    );
  }

  render() {
    return (
      <div className="task-creator">
        <div className="title">
          <h1>Tasks</h1>
          <FlatButton icon={<AddCircle />}
            style={style}
            onClick={this.handleTaskForm} />
        </div>
        {this.taskForm}
      </div>
    );
  }
}

export default CreateTask;

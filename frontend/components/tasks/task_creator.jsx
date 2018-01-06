// React
import React from 'react';
import PropTypes from 'prop-types';
// Material UI
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
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

  componentDidMount() {
    this.props.clearErrors();
  }

  handleTaskForm = (e) => {
    e.preventDefault();
    this.setState({ dialogOpen: true });
  }

  handleFormSubmission = (e) => {
    e.preventDefault();
    this.props.createTask(this.props.projectId, this.state.task).then(() =>
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
    this.setState({
      dialogOpen: false
    });
  };

  get renderErrors() {
    return (
      <ul className="session-errors">
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`} >
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
          title={'Edit Project'}
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.handleDialogClose}>
          <form className="project-form" onSubmit={this.handleFormSubmission}>
            {this.renderErrors}
            <div className="form-box">
              <h2>Task Name</h2>
              <TextField hintText={'Task name'} onChange={this.update('name')} />
            </div>
            <div className="form-box">
              <h2>Description</h2>
              <TextField hintText={'Description'} onChange={this.update('description')} />
            </div>
            <div className="form-box">
              <h2>Deadline</h2>
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
      <div>
        <FlatButton label="Add A Task" primary={true} onClick={this.handleTaskForm} />
        {this.taskForm}
      </div>
    );
  }
}

export default CreateTask;

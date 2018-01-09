// React
import React from 'react';
import PropTypes from 'prop-types';
// Material UI
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
// React-select
import Select from 'react-select';
// Enums
// Dialog content is the white box that pops up during on click
const dialogContentStyle = {
  width: '70%',
  minWidth: '500px',
  maxWidth: '980px',
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
      deadline: this.props.task.due_date,
      assignees: this.props.task.assignees
    }
  };

  static propTypes = {
    task: PropTypes.object.isRequired,
    projectId: PropTypes.number.isRequired,
    deleteTask: PropTypes.func.isRequired,
    // editTask: PropTypes.func.isRequired,
    companyUsers: PropTypes.object.isRequired,
  };

  handlePickDate = (nullVal, date) => {
    const task = Object.assign({}, this.state.task);
    task.due_date = date;
    this.setState({ task });
  };

  handleDeleteTask(projectId, taskId) {
    return (e) => {
      e.preventDefault();
      this.props.deleteTask(projectId, taskId);
    };
  }

  handleEditTask = (e) => {
    e.preventDefault();
    this.setState({ dialogOpen: true });
  };


  handleDialogClose = () => {
    this.setState({
      dialogOpen: false
    });
  };

  handleEditSubmission = () => {
    console.log("submit");
  };

  handleSelectChange = (e) => {
    const arrayOfNames = e.split(',');
    const newAssignees = arrayOfNames.map((user) => {
      const name = user.split(' ');
      return { first_name: name[0], last_name: name[1] };
    });
    const task = Object.assign({}, this.state.task);
    task.assignees = newAssignees;
    this.setState({ task });
  };

  componentDidUpdate() {
    console.log(this.state);
  }

  update(field) {
    return (e) => {
      const task = Object.assign({}, this.state.task);
      task[field] = e.currentTarget.value;
      this.setState({ task });
    };
  }

  arrayOfUsers = () => {
    const userIds = Object.keys(this.props.companyUsers);

    if (userIds.length === 0) {
      return;
    }

    const users = userIds.map((id) => {
      const name = this.props.companyUsers[id].first_name + ' ' + this.props.companyUsers[id].last_name;
      return { label: `${name}`, value: `${name}` };
    });
    return users;
  };

  arrayOfAssigned = () => {
    const users = this.state.task.assignees.map((user) => {
      return user.first_name + ' ' + user.last_name;
    });
    return users;
  };

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
        <FlatButton label="Edit" secondary={true}  onClick={this.handleEditTask} />
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
          autoScrollBodyContent={true}
          onRequestClose={this.handleDialogClose}>
          <form className="task-edit-form" onSubmit={this.handleEditSubmission}>
            <div className="form-box">
              <h3>Task Name</h3>
              <TextField
                hintText={'Task name'}
                value={this.state.task.name}
                fullWidth={true}
                onChange={this.update('name')} />
            </div>
            <div className="form-box">
              <h3>Description</h3>
              <TextField
                hintText={'Description'}
                fullWidth={true}
                value={this.state.task.description}
                onChange={this.update('description')} />
            </div>
            <div className="form-box">
              <h3>Deadline</h3>
              <DatePicker
                hintText="Deadline"
                value={new Date(this.state.task.deadline)}
                container="inline"
                mode="landscape"
                onChange={this.handlePickDate} />
            </div>
            <h3>Assignee(s)</h3>
            <Select multi
              simpleValue
              closeOnSelect={false}
              onChange={this.handleSelectChange}
              options={this.arrayOfUsers()}
              value={this.arrayOfAssigned()}
              removeSelected={true} />
            <div className="buttons">
              <FlatButton
                type="submit"
                label="Submit"
                primary={true}
                keyboardFocused={true} />
              <FlatButton label="Cancel"
                primary={true}
                onClick={this.handleDialogClose} />
            </div>
          </form>
        </Dialog>
      </Paper>
    );
  }
}

export default ProjectTaskItem;

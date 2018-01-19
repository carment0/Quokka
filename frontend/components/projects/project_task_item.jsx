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
import Divider from 'material-ui/Divider';
// React-select
import Select from 'react-select';

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
  fontSize: '2rem',
  color: '#F7882F'
};

class ProjectTaskItem extends React.Component {
  state = {
    dialogOpen: false,
    task: {
      id: this.props.task.id,
      project_id: this.props.projectId,
      name: this.props.task.name,
      description: this.props.task.description,
      completed: this.props.task.completed,
      due_date: this.props.task.due_date,
    },
    assignees: this.props.task.assignees
  };

  static propTypes = {
    dispatchFetchProjectDetail: PropTypes.func.isRequired,
    task: PropTypes.object.isRequired,
    projectId: PropTypes.number.isRequired,
    deleteTask: PropTypes.func.isRequired,
    companyUsers: PropTypes.object.isRequired,
    updateTask: PropTypes.func.isRequired
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
      dialogOpen: false,
      assignees: this.props.task.assignees
    });
  };

  handleEditSubmission = () => {
    const prev = this.props.task.assignees.map((user) => { return parseInt(user.id, 10); });
    const current = this.state.assignees.map((user) => { return parseInt(user.id, 10); });
    const deleteId = [];
    const addId = [];

    current.forEach((id) => {
      if (!prev.includes(parseInt(id, 10))) {
        addId.push(parseInt(id, 10));
      }
    });

    prev.forEach((id) => {
      if (!current.includes(parseInt(id, 10))) {
        deleteId.push(parseInt(id, 10));
      }
    });

    const promiseList = [];

    addId.forEach((id) => {
      const userId = parseInt(id, 10);
      const taskId = parseInt(this.props.task.id, 10);
      const requestParams = {
        method: 'POST',
        url: '/api/task_assignments',
        data: {
          task_assignment: {
            user_id: userId,
            task_id: taskId
          }
        }
      };

      promiseList.push(new Promise((resolve, reject) => {
        $.ajax(requestParams).then(resolve).fail(reject);
      }));
    });

    deleteId.forEach((id) => {
      const userId = parseInt(id, 10);
      const taskId = parseInt(this.props.task.id, 10);
      const requestParams = {
        method: 'DELETE',
        url: '/api/task_assignments',
        data: {
          task_assignment: {
            user_id: userId,
            task_id: taskId
          }
        }
      };
      promiseList.push(new Promise((resolve, reject) => {
        $.ajax(requestParams).then(() => console.log('Delete is done')).then(resolve).fail(reject);
      }));
    });

    // promiseList.push(new Promise(() => {
    //   this.props.updateTask(this.state.task);
    // }));

    Promise.all(promiseList).then(() => {
      setTimeout(() => {
        console.log('Now fetching');
        this.props.dispatchFetchProjectDetail(this.props.projectId);
        this.handleDialogClose();
      }, 0);
    });
  };

  handleSelectChange = (e) => {
    const userIds = e.split(',');
    const newAssignees = userIds.map((id) => {
      return {
        id: id,
        first_name: this.props.companyUsers[id].first_name,
        last_name: this.props.companyUsers[id].last_name
      };
    });
    this.setState({ assignees: newAssignees });
  };

  update(field) {
    return (e) => {
      const task = Object.assign({}, this.state.task);
      task[field] = e.currentTarget.value;
      this.setState({ task });
    };
  }

  arrayOfUsers = () => {
    const userIds = Object.keys(this.props.companyUsers);
    const assignedIds = this.props.task.assignees.map((user) => {
      return user.id;
    });
    if (userIds.length === 0) {
      return;
    }
    const users = [];

    userIds.forEach((id) => {
      const num = parseInt(id, 10);
      if (!assignedIds.includes(num)) {
        const name = this.props.companyUsers[id].first_name + ' ' + this.props.companyUsers[id].last_name;
        const position =  this.props.companyUsers[id].position;
        users.push({ label: `${name} (${position})`, value: `${id}` });
      }
    });
    return users;
  };

  arrayOfAssigned = () => {
    const users = this.state.assignees.map((user) => {
      return {
        label: this.props.companyUsers[user.id].first_name + ' ' + this.props.companyUsers[user.id].last_name,
        value: user.id
      };
    });
    return users;
  };

  get assigeeNames() {
    const names = new Set();
    this.props.task.assignees.forEach((person) => {
      names.add(person.first_name[0].concat('. ' + person.last_name));
    });

    const chips = Array.from(names).map((name) => (
      <div className="chips" key={name}>
        <Chip
          style={{ marginLeft: '0.1rem', marginRight: '0.1rem' }}
          className="chip"
          onClick={this.handleToggleUserProfile}>
          {name}
        </Chip>
      </div>
    ));

    return (
      <div className="assignee-chips">{chips}</div>
    );
  }

  get taskControls() {
    return (
      <div className="buttons">
        <FlatButton
          label="Add Assignee to Task"
          secondary={true}
          onClick={this.handleEditTask} />
        <FlatButton
          label="Delete"
          secondary={true}
          onClick={this.handleDeleteTask(this.props.projectId, this.props.task.id)} />
      </div>
    );
  }

  render() {
    return (
      <Paper className="project-task-item" zDepth={1} rounded={false}>
        <div className="title">
          <h3>{this.props.task.name}</h3>
          {this.taskControls}
        </div>
        <Divider />
        <div className="task-detail">
          <p className="description">{this.props.task.description}</p>
          <p>Deadline: {this.props.task.due_date ? this.props.task.due_date : 'N/A' }</p>
        </div>
        <div className="task-completion">
          <h4>{this.props.task.completed ? 'Task completed' : 'Task in progress'} by</h4>
          {this.props.task.assignees[0] ? this.assigeeNames : 'not assigned'}
        </div>
        <Dialog
          titleStyle={dialogTitleStyle}
          contentStyle={dialogContentStyle}
          title={'Add Assignee'}
          modal={false}
          open={this.state.dialogOpen}
          autoScrollBodyContent={true}
          onRequestClose={this.handleDialogClose}>
          <form className="task-edit-form" onSubmit={this.handleEditSubmission}>
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

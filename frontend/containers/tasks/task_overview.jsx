import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import AssignedTaskIndex from '../../components/tasks/assigned_task_index';

// Actions
import { fetchAssignedTaskList, updateAssignedTask } from '../../actions/task_actions';


class TaskOverview extends React.Component {
  static propTypes = {
    dispatchFetchAssignedTaskList: PropTypes.func.isRequired,
    dispatchUpdateAssignedTask: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
    assignedTasks: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.dispatchFetchAssignedTaskList(this.props.currentUser.id);
  }

  render() {
    return (
      <div className="task-overview">
        <h1>Task Overview</h1>
        <AssignedTaskIndex
          assignedTasks={this.props.assignedTasks}
          dispatchUpdateAssignedTask={this.props.dispatchUpdateAssignedTask} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.sessions.currentUser,
  assignedTasks: state.tasks.assigned
});

const mapDispatchToProps = (dispatch) => ({
  dispatchUpdateAssignedTask: (task) => dispatch(updateAssignedTask(task)), // TODO: change task action accepted arguments
  dispatchFetchAssignedTaskList: (userId) => dispatch(fetchAssignedTaskList(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskOverview);

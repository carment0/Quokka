import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import AssignedTaskIndex from '../../components/tasks/assigned_task_index';

// Actions
import { fetchAssignedTasks, updateTask } from '../../actions/task_actions';

// This component should be connected just like what we did in ProjectsOverview

class TaskOverview extends React.Component {
  static propTypes = {
    dispatchFetchAssignedTasks: PropTypes.func.isRequired,
    dispatchUpdateTask: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
    assignedTasks: PropTypes.array.isRequired
  }

  componentDidMount() {
    console.log('TaskOverview is mounted, now fetching assigned tasks for user');
    this.props.dispatchFetchAssignedTasks(this.props.currentUser.id);
  }

  render() {
    return (
      <div>
        <h1>My Task Overview</h1>
        <AssignedTaskIndex
          assignedTasks={this.props.assignedTasks}
          dispatchUpdateTask={this.props.dispatchUpdateTask} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.sessions.currentUser,
  assignedTasks: state.tasks.assigned
});

const mapDispatchToProps = (dispatch) => ({
  dispatchUpdateTask: (task) => dispatch(updateTask(task)), // TODO: change task action accepted arguments
  dispatchFetchAssignedTasks: (userId) => dispatch(fetchAssignedTasks(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskOverview);

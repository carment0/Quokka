import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import AssignedTaskIndex from '../../components/tasks/assigned_task_index';

// Actions
import { fetchAssignedTasks } from '../../actions/task_actions';

// This component should be connected just like what we did in ProjectsOverview

class TasksOverview extends React.Component {
  static propTypes = {
    dispatchFetchAssignedTasks: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
    assignedTasks: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.dispatchFetchAssignedTasks(this.props.currentUser.id);
  }

  render() {
    return (
      <div>
        <h1>My Task Overview</h1>
        <AssignedTaskIndex assignedTasks={this.props.assignedTasks} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.sessions.currentUser,
  assignedTasks: state.tasks.assigned
});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchAssignedTasks: (userId) => dispatch(fetchAssignedTasks(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(TasksOverview);

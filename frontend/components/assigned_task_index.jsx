import React from 'react';
import PropTypes from 'prop-types';

class AssignedTaskIndex extends React.Component {
  static propTypes = {
    assignedTasks: PropTypes.object.isRequired
  }

  get tasks() {
    if (Object.keys(this.props.assignedTasks).length === 0) {
      return <div />;
    }

    return Object.keys(this.props.assignedTasks).map((projectId) => {
      const project = this.props.assignedTasks[projectId];
      return (
        <li key={project.name}>{project.name}</li>);
    });
  }

  render() {
    return (
      <div className="assigned-tasks">
        <ul className="assigned-tasks-list">{this.tasks}</ul>
      </div>
    );
  }
}
export default AssignedTaskIndex;

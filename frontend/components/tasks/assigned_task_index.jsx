import React from 'react';
import PropTypes from 'prop-types';

class AssignedTaskIndex extends React.Component {
  static propTypes = {
    assignedTasks: PropTypes.object.isRequired
  }

  get project() {
    if (Object.keys(this.props.assignedTasks).length === 0) {
      return <div />;
    }

    return Object.keys(this.props.assignedTasks).map((projectId) => {
      const project = this.props.assignedTasks[projectId];
      console.log(project.tasks);
      return project.tasks.map((task) => {
        return (
          <ul key={task.name}>
            <h4>Project: {project.name}</h4>
            <li>
              <div className="task-details" style={task.completed ? { color: 'green' } : { color: 'red' }}>
                <tname>{task.name} : {task.description}</tname>
                <tduedate>{task.due_date}</tduedate>
              </div>
            </li>
          </ul>
        );
      });
    });
  }


  render() {
    return (
      <div className="assigned-tasks">
        <div className="assigned-tasks-list">{this.project}</div>
      </div>
    );
  }
}
export default AssignedTaskIndex;

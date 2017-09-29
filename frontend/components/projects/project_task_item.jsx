import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';


const ProjectTaskItem = ({ task }) => (
  <Paper className="project-task-item" zDepth={1} rounded={false}>
    <p>{task.name}</p>
    <p>{task.description}</p>
  </Paper>
);

ProjectTaskItem.propTypes = {
  task: PropTypes.object.isRequired
};

export default ProjectTaskItem;

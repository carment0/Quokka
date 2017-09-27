import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Quokka imports
import AdministratedProjectIndex from './administrated_project_index';
import AssignedProjectIndex from './assigned_project_index';

// This component should be connected, not AdministratedProjectIndex, not AssignedProjectIndex
// We simply pass down the necessary props to the index pages
class ProjectsOverview extends React.Component {
  render() {
    return (
      <div>
        <h1>Project Overview</h1>
        <AdministratedProjectIndex />
        <AssignedProjectIndex />
      </div>
    );
  }
}

export default ProjectsOverview;

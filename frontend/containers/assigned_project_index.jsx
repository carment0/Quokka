import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAssignedProjects } from '../actions/project_actions';

class AssignedProject extends React.Component {
  static propTypes = {
    dispatchfetchAssignedProjects: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
    assigned: PropTypes.object.isRequired
  }

  componentWillMount() {
    this.props.dispatchfetchAssignedProjects(this.props.currentUser.id);
  }

  render() {
    const { assigned } = this.props;
    return (
      <div className="administrated-index">
        <h3>Projects you are assigned to:</h3>
        <ul>
          {assigned.map((project) =>  project)}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ state }) => ({
  currentUser: state.sessions.currentUser,
  assigned: state.projects.assigned
});


const mapDispatchToProps = (dispatch) => ({
  dispatchfetchAssignedProjects: (userId) => dispatch(fetchAssignedProjects(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(AssignedProject);

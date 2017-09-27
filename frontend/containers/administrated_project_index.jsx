import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAdministratedProjects } from '../actions/project_actions';

class AdministratedProject extends React.Component {
  static propTypes = {
    dispatchfetchAdministratedProjects: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
    administrated: PropTypes.object.isRequired
  }

  componentWillMount() {
    this.props.dispatchfetchAdministratedProjects(this.props.currentUser.id);
  }

  render() {
    const { administrated } = this.props;
    return (
      <div className="administrated-index">
        <h3>Your projects:</h3>
        <ul>
          {administrated.map((project) =>  project)}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ state }) => ({
  currentUser: state.sessions.currentUser,
  administrated: state.projects.administrated
});


const mapDispatchToProps = (dispatch) => ({
  dispatchfetchAdministratedProjects: (userId) => dispatch(fetchAdministratedProjects(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdministratedProject);

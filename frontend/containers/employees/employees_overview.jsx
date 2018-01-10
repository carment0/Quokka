// React
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// creates keys for mapping
import uuid from 'uuid/v1';
// Material UI
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
// Actions
import { fetchUsersFromCompany } from '../../actions/users_by_company_actions';
// Enums
const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 700,
    overflowY: 'auto',
  },
};

class EmployeesOverview extends React.Component {
  static propTypes = {
    dispatchUsersByCompany: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
    users: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.dispatchUsersByCompany(this.props.currentUser.company);
  }

  get employees() {
    console.log(window.logoSrc);
    const employees = Object.keys(this.props.users).map((id) => (
      <GridTile
        key={uuid()}
        title={this.props.users[id].first_name.concat(' ' + this.props.users[id].last_name)}
        subtitle={
          <div>
            <div>Position: <b>{this.props.users[id].position}</b></div>
            <div>Email: <b>{this.props.users[id].email}</b></div>
          </div>}>
        <img src="/assets/doraemon.svg" alt="profile" />
      </GridTile>
    ));

    return (
      <GridList
        cellHeight={200}
        style={styles.gridList}>
        <Subheader>Biology Department</Subheader>
        {employees}
      </GridList>
    );
  }

  render() {
    return (
      <div>
        <h1>EmployeesOverview </h1>
        <div style={styles.root}>
          {this.employees}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.sessions.currentUser,
  users: state.users,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchUsersByCompany: (companyName) => dispatch(fetchUsersFromCompany(companyName))
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesOverview);

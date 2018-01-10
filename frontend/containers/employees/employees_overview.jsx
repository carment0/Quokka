// React
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// creates keys for mapping
import uuid from 'uuid/v1';
// Material UI
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import LinearProgress from 'material-ui/LinearProgress';

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
    const employees = Object.keys(this.props.users).map((id) => (
      <GridTile
        key={uuid()}
        title={this.props.users[id].first_name.concat(' ' + this.props.users[id].last_name)}
        subtitle={<span>Position: <b>{this.props.users[id].position}</b></span>} >
        <img src="https://image.flaticon.com/icons/png/512/201/201555.png" />
      </GridTile>
    ));

    return (
      <GridList
        cellHeight={180}
        style={styles.gridList}>
        <Subheader>Biology Team</Subheader>
        {employees}
      </GridList>
    );
  }

  render() {
    return (
      <div>
        <h1>EmployeesOverview </h1>
        <div style={styles.root}>
          <GridList
            style={styles.gridList}
            cellHeight={'auto'}>
            {this.employees}
          </GridList>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.sessions.currentUser,
  users: state.users
});

const mapDispatchToProps = (dispatch) => ({
  dispatchUsersByCompany: (companyName) => dispatch(fetchUsersFromCompany(companyName))
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesOverview);

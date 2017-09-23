import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';


const AuthRoute = ({ component: Component, path, isAuthenticated }) => (
  <Route path={path}
    render={(props) => (
      isAuthenticated ? <Redirect to="/management" /> : <Component {...props} />
    )} />
);

AuthRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return { isAuthenticated: Boolean(state.session.currentUser) };
};

export default withRouter(connect(mapStateToProps, null)(AuthRoute));

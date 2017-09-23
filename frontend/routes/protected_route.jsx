import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';


const ProtectedRoute = ({ component: Component, path, isAuthenticated }) => (
  <Route path={path}
    render={(props) => (
      isAuthenticated ? <Component {...props} /> : <Redirect to="/welcome" />
    )} />
);

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return { isAuthenticated: Boolean(state.session.currentUser) };
};

export default withRouter(connect(mapStateToProps, null)(ProtectedRoute));

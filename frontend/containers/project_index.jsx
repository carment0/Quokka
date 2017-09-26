import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProjects } from '../actions/project_actions';

const mapStateToProps = () => ({

});

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchProject: () => dispatch(fetchProjects())
});

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import { login, signup } from '../actions/session_actions';
import Login from '../components/login';
import Signup from '../components/signup';

// import Signup from '../components/signup';

// Enum
const FormTypes = {
  SIGN_UP: 'SIGN_UP',
  LOG_IN: 'LOG_IN'
};

class Welcome extends React.Component {
  state = {
    openModal: false,
    type: ''
  };

  static propTypes = {
    dispatchLogin: PropTypes.func.isRequired,
    dispatchSignup: PropTypes.func.isRequired
  };

  openForm = (formType) => {
    this.setState({
      openModal: true,
      formType
    });
  }

  handleOpenSignup = () => {
    this.setState({ openModal: true, type: 'SIGN_UP' });
  };

  handleOpenLogin = () => {
    this.setState({ openModal: true, type: 'LOG_IN' });
  };

  handleModalClose = () => {
    this.setState({ openModal: false, type: '' });
  };

  get form() {
    if (this.state.type === FormTypes.SIGN_UP) {
      return (
        <Signup
          dispatchSignup={this.props.dispatchSignup}
          handleModalClose={this.handleModalClose} />
      );
    }
    return (
      <Login
        dispatchLogin={this.props.dispatchLogin}
        handleModalClose={this.handleModalClose} />
    );
  }

  render() {
    return (
      <section className="welcome-page">
        <Paper zDepth={2} className="nav-bar">
          <section className="left-container">
            <div className="logo" />
            <div className="text">
              <p>Blah blah blah</p>
            </div>
          </section>
          <section className="right-container">
            <div className="button-container">
              <FlatButton label="Login"
                className="login-button"
                secondary={true}
                onClick={this.handleOpenLogin} />
              <FlatButton label="Sign up"
                className="signup-button"
                primary={true}
                onClick={this.handleOpenSignup} />
            </div>
          </section>
        </Paper>
        <section className="content">
          <div className="dick" />
        </section>
        <Dialog
          title="Dialog With Actions"
          modal={false}
          open={this.state.openModal}
          onRequestClose={this.handleClose}>
          {this.form}
        </Dialog>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: Boolean(state.session.currentUser),
  errors: state.errors.session
});

const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (user) => dispatch(login(user)),
  dispatchSignup: (user) => dispatch(signup(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);

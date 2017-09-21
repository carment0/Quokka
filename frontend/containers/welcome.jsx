import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { login, signup } from '../actions/session_actions';
import Login from '../components/login';
// import Signup from '../components/signup';

// Enum
const FormTypes = {
  SIGN_UP: 'SIGN_UP',
  LOG_IN: 'LOG_IN'
};

class Welcome extends React.Component {
  state = {
    openModal: false,
    type: FormTypes.SIGN_UP
  };

  static propTypes = {
    dispatchLogin: PropTypes.func.isRequired
  };

  handleOpen = () => {
    this.setState({ openModal: true });
  };

  handleClose = () => {
    this.setState({ openModal: false });
  };

  get form() {
    if (this.state.type === FormTypes.SIGN_UP) {
      return <Login />;
    }
    return (
      <Login
        dispatchLogin={this.props.dispatchLogin} />
    );
  }

  render() {
    return (
      <div className="welcome-container">
        <nav className="nav-bar">
          <FlatButton label="Login" secondary={true} onClick={this.handleOpen} />
          <FlatButton label="Sign up" primary={true} onClick={this.handleOpen} />
        </nav>
        <h1>Welcome to Quokka</h1>
        <Dialog
          title="Dialog With Actions"
          modal={false}
          open={this.state.openModal}
          onRequestClose={this.handleClose}>
          {this.form}
        </Dialog>
      </div>
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

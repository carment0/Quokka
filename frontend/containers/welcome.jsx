import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
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
    console.log(this.state);
  }

  handleOpenSignup = () => {
    this.setState({ openModal: true, type: 'SIGN_UP' });
  };

  handleOpenLogin = () => {
    this.setState({ openModal: true, type: 'LOG_IN' });
  };

  handleClose = () => {
    this.setState({ openModal: false, type: '' });
  };

  get form() {
    console.log(this.state);
    if (this.state.type === FormTypes.SIGN_UP) {
      return (
        <Signup
          dispatchSignup={this.props.dispatchLogin}  />
      );
    }
    return (
      <Login
        dispatchLogin={this.props.dispatchLogin} />
    );
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.formType === 'Sign Up') {
      console.log('su');
      this.props.dispatchSignup(this.state);
    } else {
      console.log('li');
      this.props.dispatchLogin(this.state);
    }
  }

  render() {
    const actions = [
      <FlatButton label="Cancel"
        primary={true}
        onClick={this.handleClose}/>,

      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSubmit}/>
    ];


    return (
      <div className="welcome-container">
        <nav className="nav-bar">
          <FlatButton label="Login"
            secondary={true}
            onClick={this.handleOpenLogin} />
          <FlatButton label="Sign up"
            primary={true}
            onClick={this.handleOpenSignup} />
        </nav>
        <h1>Welcome to Quokka</h1>
        <Dialog
          title="Dialog With Actions"
          actions={actions}
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

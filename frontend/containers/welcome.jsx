import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import { login, signup } from '../actions/session_actions';
import Login from '../components/login';
import Signup from '../components/signup';

// Enum
const FormTypes = {
  SIGN_UP: 'SIGN_UP',
  LOG_IN: 'LOG_IN'
};

// Dialog content is the white box that pops up during on click
const dialogContentStyle = {
  width: '40%',
  minWidth: '350px',
  maxWidth: '500px'
};

// Dialog title is the title section inside content body
const dialogTitleStyle = {
  fontWeight: '100',
  fontSize: '2rem',
  display: 'flex',
  justifyContent: 'center'
};

class Welcome extends React.Component {
  state = {
    openDialog: false,
    type: ''
  };

  static propTypes = {
    dispatchLogin: PropTypes.func.isRequired,
    dispatchSignup: PropTypes.func.isRequired
  };

  openForm = (formType) => {
    this.setState({
      openDialog: true,
      formType
    });
  }

  handleOpenSignup = () => {
    this.setState({ openDialog: true, type: 'SIGN_UP' });
  };

  handleOpenLogin = () => {
    this.setState({ openDialog: true, type: 'LOG_IN' });
  };

  handleDialogClose = () => {
    this.setState({ openDialog: false, type: '' });
  };

  get form() {
    if (this.state.type === FormTypes.SIGN_UP) {
      return (
        <Signup
          dispatchSignup={this.props.dispatchSignup}
          handleDialogClose={this.handleDialogClose} />
      );
    }
    return (
      <Login
        dispatchLogin={this.props.dispatchLogin}
        handleDialogClose={this.handleDialogClose} />
    );
  }

  get dialogTitle() {
    if (this.state.type === FormTypes.SIGN_UP) {
      return 'Sign up for Quokka';
    }
    return 'Login';
  }

  render() {
    return (
      <section className="welcome-page">
        <Paper zDepth={2} className="nav-bar">
          <section className="left-container">
            <div className="logo" />
            <div className="text" />
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
          titleStyle={dialogTitleStyle}
          contentStyle={dialogContentStyle}
          title={this.dialogTitle}
          modal={false}
          open={this.state.openDialog}
          onRequestClose={this.handleDialogClose}>
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

// React
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Material UI
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
// Actions
import { login, signup } from '../actions/session_actions';
// Components
import Login from '../components/auth/login';
import Signup from '../components/auth/signup';
// Enum
const FormType = {
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
  state = { openDialog: false, formType: '' };

  static propTypes = {
    dispatchLogin: PropTypes.func.isRequired,
    dispatchSignup: PropTypes.func.isRequired
  };

  /**
   * Returns a handler for either sign up dialog or login dialog
   * @returns {function}
   */
  createDialogOpenHandler = (formType) => () => {
    this.setState({ openDialog: true, formType });
  };

  handleDialogClose = () => {
    this.setState({ openDialog: false, formType: '' });
  };

  get dialogTitle() {
    if (this.state.formType === FormType.SIGN_UP) {
      return 'Sign Up';
    }
    return 'Login';
  }

  get form() {
    if (this.state.formType === FormType.SIGN_UP) {
      return (
        <Signup
          dispatchSignup={this.props.dispatchSignup}
          dispatchLogin={this.props.dispatchLogin}
          handleDialogClose={this.handleDialogClose} />
      );
    }
    return (
      <Login
        dispatchLogin={this.props.dispatchLogin}
        handleDialogClose={this.handleDialogClose} />
    );
  }

  render() {
    return (
      <section className="welcome-page">
        <Paper zDepth={2} className="nav-bar">
          <section className="left-container">
            <div className="logo" />
          </section>
          <section className="right-container">
            <div className="button-container">
              <FlatButton label="Login"
                className="login-button"
                primary={true}
                onClick={this.createDialogOpenHandler(FormType.LOG_IN)} />
              <FlatButton label="Sign up"
                className="signup-button"
                secondary={true}
                onClick={this.createDialogOpenHandler(FormType.SIGN_UP)} />
            </div>
          </section>
        </Paper>
        <section className="content">
          <div className="left-container">
            <div className="text-box">
              <div className="head-line">
                Achieve success with Quokka
              </div>
              <div className="catch-phrase">
                Sed rutrum lectus eu dictum sagittis.
              </div>
              <div className="description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in commodo dolor, nec congue tellus.
                Vestibulum dignissim sodales dolor, in vehicula turpis porta euismod. Proin vel placerat mi, sit amet
                blandit massa. Proin ac dui urna.
              </div>
            </div>
          </div>
          <div className="right-container" />
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
  loggedIn: Boolean(state.sessions.currentUser),
  errors: state.errors.session
});

const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (user) => dispatch(login(user)),
  dispatchSignup: (user) => dispatch(signup(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);

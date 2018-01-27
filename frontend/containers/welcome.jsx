// React
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Material UI
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

// Actions
import { login, signup, clearSessionErrors } from '../actions/session_actions';

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
  justifyContent: 'center',
  color: '#F7882F'
};

class Welcome extends React.Component {
  state = { openDialog: false, formType: '' };

  static propTypes = {
    dispatchLogin: PropTypes.func.isRequired,
    dispatchSignup: PropTypes.func.isRequired,
    errors: PropTypes.array.isRequired,
    dispatchClearSessionErrors: PropTypes.func.isRequired
  };

  handleDialogClose = () => {
    this.setState({ openDialog: false, formType: '' });
  };

  /**
   * Returns a handler for either sign up dialog or login dialog
   * @returns {function}
   */
  createDialogOpenHandler = (formType) => () => {
    this.setState({ openDialog: true, formType });
  };

  /**
   * Returns the title of the dialog box
   * @returns {string}
   */
  get dialogTitle() {
    if (this.state.formType === FormType.SIGN_UP) {
      return 'Join the Quokka community';
    }
    return 'Welcome back to Quokka';
  }

  /**
   * Returns the form that goes into the modal, depending on current state.
   * @returns {React.Element}
   */
  get form() {
    if (this.state.formType === FormType.SIGN_UP) {
      return (
        <Signup
          dispatchSignup={this.props.dispatchSignup}
          dispatchLogin={this.props.dispatchLogin}
          handleDialogClose={this.handleDialogClose}
          sessionErrors={this.props.errors}
          clearErrors={this.props.dispatchClearSessionErrors}
          switchDialog={this.createDialogOpenHandler(FormType.LOG_IN)} />
      );
    }
    return (
      <Login
        dispatchLogin={this.props.dispatchLogin}
        handleDialogClose={this.handleDialogClose}
        sessionErrors={this.props.errors}
        clearErrors={this.props.dispatchClearSessionErrors}
        switchDialog={this.createDialogOpenHandler(FormType.SIGN_UP)} />
    );
  }

  render() {
    return (
      <section className="welcome-page">
        <Paper zDepth={2} className="nav-bar">
          <section className="left-container">
            <div className="text">
              QUOKKA
            </div>
          </section>
          <section className="right-container">
            <div className="button-container">
              <FlatButton label="Login"
                className="login-button"
                hoverColor="#DCC7AA"
                primary={true}
                onClick={this.createDialogOpenHandler(FormType.LOG_IN)} />
              <FlatButton label="Sign up"
                className="signup-button"
                primary={true}
                hoverColor="#DCC7AA"
                onClick={this.createDialogOpenHandler(FormType.SIGN_UP)} />
            </div>
          </section>
        </Paper>
        <section className="content">
          <div className="top-container">
            <div className="left-container">
              <div className="text-box">
                <img
                  className="face-logo"
                  src="http://res.cloudinary.com/dwepnf6cc/image/upload/v1516518163/quokka_face_c6nsfa.svg"
                  alt="profile" />
                <div className="catch-phrase">
                  Dream. Create. Innovate.
                </div>
                <div className="head-line">
                  Achieve success with Quokka
                </div>
                <div className="description">
                  {`Quokka is the easiest way for teams to track work and get results.
                    It's free to use and simple to get started. Sign up for free today.`}
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-container">
            <footer>
              <a className="logo" href="https://github.com/carment0/Quokka">
                <img
                  className="logo"
                  src="http://res.cloudinary.com/dwepnf6cc/image/upload/v1516518061/github_zmrpur.png"
                  alt="github" />
              </a>
              <a className="logo" href="https://www.linkedin.com/in/carmen-to-2480161a/">
                <img
                  className="logo"
                  src="http://res.cloudinary.com/dwepnf6cc/image/upload/v1516518064/linkedin_nx1dzs.png"
                  alt="github" />
              </a>
            </footer>
          </div>
        </section>
        <Dialog
          titleStyle={dialogTitleStyle}
          contentStyle={dialogContentStyle}
          title={this.dialogTitle}
          modal={false}
          open={this.state.openDialog}
          autoScrollBodyContent={true}
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
  dispatchSignup: (user) => dispatch(signup(user)),
  dispatchClearSessionErrors: () => dispatch(clearSessionErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);

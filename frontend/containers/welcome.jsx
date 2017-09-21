import Modal from 'react-modal';
import React from 'react';
import { connect } from 'react-redux';
import { login, signup, logout } from '../actions/session_actions';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      modalIsOpen: false,
      formType: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openForm = this.openForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.toggleFormLink = this.toggleFormLink.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }

  update(field) {
    return (e) => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.formType === "Sign Up") {
      this.props.signup(this.state);
    } else {
      this.props.login(this.state);
    }
  }

  openForm(formType) {
    this.setState({
      modalIsOpen: true,
      formType
    });
  }

  closeForm() {
    this.setState({
      modalIsOpen: false,
      formType: '',
      username: '',
      password: ''
    });
  }

  toggleFormLink() {
    if (this.state.formType === "Sign Up") {
      return (
        <a onClick={this.toggleForm}>Already have an account? Log in</a>
      );
    } else {
      return (
        <a onClick={this.toggleForm}>Don't have an account? Sign up</a>
      );
    }
  }

  toggleForm() {
    if (this.state.formType === "Sign Up") {
      this.setState({ formType: "Log In" });
    } else {
      this.setState({ formType: "Sign Up" });
    }
  }

  render() {
    return (
      <div className="session-form-container">
        <nav className="signup-login">
          <button onClick={() => this.openForm("Log In")}>Log In</button>
          <button onClick={() => this.openForm("Sign Up")}>Sign Up</button>
        </nav>

        <Modal
          isOpen={this.state.modalIsOpen}
          contentLabel="Modal">
          <button onClick={() => this.closeForm()}>
            <i className="close_modal" aria-hidden="true"></i>
          </button>

          <div className="session-form-box">
            <h2>{this.state.formType}</h2>
            <form className="session-form" onSubmit={this.handleSubmit}>
              <input type="text"
                value={this.state.username}
                onChange={this.update("username")}
                placeholder="Username"
              />
              <br />
              <input type="password"
                value={this.state.password}
                onChange={this.update("password")}
                placeholder="Password"
              />
              <br />
              <input type="submit"
                value={this.state.formType}
              />
            </form>

            {this.toggleFormLink()}
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  loggedIn: Boolean(state.ui.session.currentUser),
  errors: state.ui.errors.sessionErrors,
  // currentUser: state.ui.session.currentUser
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  login: (user) => dispatch(login(user)),
  signup: (user) => dispatch(signup(user)),
  logout: () => dispatch(logout())
});

const SessionFormContainer = connect(mapStateToProps, mapDispatchToProps)(Welcome);

export default Welcome;

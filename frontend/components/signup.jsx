
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login, signup, logout } from '../actions/session_actions';

class Welcome extends React.Component {
  state = {
    username: '',
    password: '',
    modalIsOpen: false,
    formType: ''
  };

  static propTypes = {
    dispatchSignup: PropTypes.func.isRequired,
    dispatchLogin: PropTypes.func.isRequired
  }

  update(field) {
    return (e) => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.formType === 'Sign Up') {
      this.props.dispatchSignup(this.state);
    } else {
      this.props.dispatchLogin(this.state);
    }
  }

  openForm = (formType) => {
    this.setState({
      modalIsOpen: true,
      formType
    });
  }

  closeForm = () => {
    this.setState({
      modalIsOpen: false,
      formType: '',
      username: '',
      password: ''
    });
  }

  toggleFormLink = () => {
    if (this.state.formType === 'Sign Up') {
      return (
        <button onClick={this.toggleForm}>
          Already have an account? Log in
        </button>
      );
    }

    return (
      <button onClick={this.toggleForm}>
        {"Don't have an account? Sign up"}
      </button>
    );
  }

  toggleForm = () => {
    if (this.state.formType === 'Sign Up') {
      this.setState({ formType: 'Log In' });
    } else {
      this.setState({ formType: 'Sign Up' });
    }
  }

  render() {
    return (
      <div className="session-form-container">
        <nav className="signup-login">
          <button onClick={() => this.openForm('Log In')}>Log In</button>
          <button onClick={() => this.openForm('Sign Up')}>Sign Up</button>
        </nav>

        <Modal isOpen={this.state.modalIsOpen} contentLabel="Modal">
          <button onClick={() => this.closeForm()}>
            <i className="close_modal" aria-hidden="true" />
          </button>

          <div className="session-form-box">
            <h2>{this.state.formType}</h2>
            <form className="session-form" onSubmit={this.handleSubmit}>
              <input type="text"
                value={this.state.username}
                onChange={this.update('username')}
                placeholder="Username" />
              <br />
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                placeholder="Password" />
              <br />
              <input type="submit" value={this.state.formType} />
            </form>
            {this.toggleFormLink()}
          </div>
        </Modal>
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
  dispatchSignup: (user) => dispatch(signup(user)),
  dispatchLogout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);

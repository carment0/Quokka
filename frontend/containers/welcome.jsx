import React from 'react';
import { connect } from 'react-redux';
import { login, signup, logout } from '../actions/session_actions';
import Login from '../components/login';
import Signup from '../components/signup';

class Welcome extends React.Component {
  render() {
    return (
      <div className="welcome-container">
        <nav className="signup-login-components">
          <button onClick={<Login/>}>Log In</button>
          <button onClick={<Signup/>}>Sign Up</button>
        </nav>
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

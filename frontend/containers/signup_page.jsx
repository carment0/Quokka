import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login, signup } from '../actions/session_actions';
import { Link, withRouter } from 'react-router-dom';
/*
  NOTE: Ideally, SignupPage and LoginPage are one container, and let there be a button for toggling state,
  switching from signup to login or login to signup just like how Asana does it.
*/

class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static propTypes = {
    history: PropTypes.object.isRequired,
    loggedIn: PropTypes.func.isRequired,
    processForm: PropTypes.object.isRequired,
    formType: PropTypes.string.isRequired
  }

  componentWillReceiveProps(nextProps) {
    // Redirect user to home page if there is a currentUser in nextProps
    if (nextProps.loggedIn) {
      this.props.history.push('/home');
    }
  }

  update(field) {
    return (e) => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = this.state;
    this.props.processForm({ user });
  }

  navLink() {
    if (this.props.formType === 'login') {
      return <Link to="/signup">sign up instead</Link>;
    } else {
      return <Link to="/login">log in instead</Link>;
    }
  }

  renderErrors() {
    return (
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      // <div className="signup">
      //   <h1>Welcome</h1>
      //   <h2>Please sign up</h2>
      // </div>
      <div className="signup">
        <form onSubmit={this.handleSubmit} className="login-form-box">
          Welcome to Quokka!
          <br/>
          Please {this.props.formType} or {this.navLink()}
          {this.renderErrors()}
          <div className="login-form">
            <br/>
            <label>Username:
              <input type="text"
                value={this.state.username}
                onChange={this.update('username')}
                className="login-input"
              />
            </label>
            <br/>
            <label>Password:
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                className="login-input"
              />
            </label>
            <br/>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: Boolean(state.session.currentUser),
    errors: state.errors.session
  };
};

const mapDispatchToProps = (dispatch, { location }) => {
  const formType = location.pathname.slice(1);
  const processForm = (formType === 'login') ? login : signup;
  return {
    processForm: (user) => dispatch(processForm(user)),
    formType
  };
};

// TODO: Connect this page to the store

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupPage);

export default withRouter(SignupPage);

// React
import React from 'react';
import PropTypes from 'prop-types';
// Material UI
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
// Enums
const fatDividerStyle = { width: '85%', height: '2px', marginTop: '1rem', marginBottom: '1rem' };


class Login extends React.Component {
  state = { username: '', password: '' };

  static propTypes = {
    handleDialogClose: PropTypes.func.isRequired,
    dispatchLogin: PropTypes.func.isRequired,
    sessionErrors: PropTypes.array.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.clearErrors();
  }

  handleFormSubmission = (e) => {
    e.preventDefault();
    this.props.dispatchLogin(this.state);
  };

  handleDemoLogin = (e) => {
    e.preventDefault();
    this.props.dispatchLogin({ username: 'guestuser', password: '123456' });
  };

  update(field) {
    return (e) => this.setState({ [field]: e.currentTarget.value });
  }

  get renderErrors() {
    if (this.props.sessionErrors === []) {
      return;
    }
    return (
      <ul className="session-errors">
        {this.props.sessionErrors.map((error, i) => (
          <li key={`error-${i}`} >
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="login">
        <form className="login-form" onSubmit={this.handleFormSubmission}>
          {this.renderErrors}
          <TextField
            fullWidth={true}
            value={this.state.username}
            onChange={this.update('username')}
            hintText="Enter your username"
            floatingLabelText="Username" /><br />
          <TextField
            fullWidth={true}
            value={this.state.password}
            onChange={this.update('password')}
            hintText="Enter your password"
            floatingLabelText="Password"
            type="password" /><br />
          <div className="button-container">
            <FlatButton
              type="submit"
              label="Submit"
              primary={true}
              keyboardFocused={true} />
            <FlatButton label="Cancel"
              primary={true}
              onClick={this.props.handleDialogClose} />
          </div>
        </form>
        <div className="divider">
          <Divider style={fatDividerStyle} />
        </div>
        <div className="demo-login">
          <RaisedButton
            label="Login with Demo Account"
            secondary={true}
            fullWidth={true}
            onClick={this.handleDemoLogin} />
        </div>
      </div>
    );
  }
}

export default Login;

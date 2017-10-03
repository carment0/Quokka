import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

const fatDividerStyle = { width: '85%', height: '2px', marginTop: '1rem', marginBottom: '1rem' };

class Login extends React.Component {
  state = { username: '', password: '' };

  static propTypes = {
    handleDialogClose: PropTypes.func.isRequired,
    dispatchLogin: PropTypes.func.isRequired
  };

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

  render() {
    return (
      <div className="login">
        <form className="login-form" onSubmit={this.handleFormSubmission}>
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

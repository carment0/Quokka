import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

const fatDividerStyle = { width: '85%', height: '2px', marginTop: '1rem', marginBottom: '1rem' };

class Signup extends React.Component {
  state = { name: '', username: '', password: '' };

  static propTypes = {
    handleDialogClose: PropTypes.func.isRequired,
    dispatchSignup: PropTypes.func.isRequired,
    dispatchLogin: PropTypes.func.isRequired
  };

  update(field) {
    return (e) => this.setState({ [field]: e.target.value });
  }

  handleFormSubmission = (e) => {
    e.preventDefault();
    this.props.dispatchSignup(this.state);
  }

  demoLogin() {
    return (e) => {
      e.preventDefault();
      this.props.dispatchLogin({ username: 'guestuser', password: '123456' });
    };
  }

  render() {
    return (
      <div className="signup">
        <form className="signup-form" onSubmit={this.handleFormSubmission}>
          <TextField
            fullWidth={true}
            value={this.state.name}
            onChange={this.update('name')}
            hintText="Enter your full name"
            floatingLabelText="Full Name" /><br />
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
        <div className="demo-signup">
          <RaisedButton label="Login with Demo Account" secondary={true} fullWidth={true} onClick={this.demoLogin()} />
        </div>
      </div>
    );
  }
}

export default Signup;

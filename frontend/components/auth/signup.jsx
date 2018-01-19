// React
import React from 'react';
import PropTypes from 'prop-types';
// creates keys for mapping
import uuid from 'uuid/v1';
// Material UI
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
// Enums
const fatDividerStyle = { width: '85%', height: '2px', marginTop: '1rem', marginBottom: '1rem' };


class Signup extends React.Component {
  state = {
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    email: '',
    company: '',
    position: ''
  };

  static propTypes = {
    handleDialogClose: PropTypes.func.isRequired,
    dispatchSignup: PropTypes.func.isRequired,
    dispatchLogin: PropTypes.func.isRequired,
    sessionErrors: PropTypes.array.isRequired,
    clearErrors: PropTypes.func.isRequired,
    switchDialog: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.clearErrors();
  }

  handleFormSubmission = (e) => {
    e.preventDefault();
    this.props.dispatchSignup(this.state);
  };

  handleDemoLogin = (e) => {
    e.preventDefault();
    this.props.dispatchLogin({ username: 'guestuser', password: '123456' });
  };

  update(field) {
    return (e) => this.setState({ [field]: e.target.value });
  }

  get renderErrors() {
    if (this.props.sessionErrors === []) {
      return;
    }
    return (
      <ul className="session-errors">
        {this.props.sessionErrors.map((error) => (
          <li key={uuid()} >
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="signup">
        <form className="signup-form" onSubmit={this.handleFormSubmission}>
          {this.renderErrors}
          <TextField
            fullWidth={true}
            value={this.state.first_name}
            onChange={this.update('first_name')}
            hintText="Enter your first name"
            floatingLabelText="First Name" />
          <TextField
            fullWidth={true}
            value={this.state.last_name}
            onChange={this.update('last_name')}
            hintText="Enter your last name"
            floatingLabelText="Last Name" />
          <TextField
            fullWidth={true}
            value={this.state.username}
            onChange={this.update('username')}
            hintText="Enter your username"
            floatingLabelText="Username" />
          <TextField
            fullWidth={true}
            value={this.state.password}
            onChange={this.update('password')}
            hintText="Enter your password"
            floatingLabelText="Password"
            type="password" />
          <TextField
            fullWidth={true}
            value={this.state.email}
            onChange={this.update('email')}
            hintText="Enter your email"
            floatingLabelText="Email" />
          <TextField
            fullWidth={true}
            value={this.state.company}
            onChange={this.update('company')}
            hintText="Enter your company's name"
            floatingLabelText="Company's Name" />
          <TextField
            fullWidth={true}
            value={this.state.position}
            onChange={this.update('position')}
            hintText="Enter your work title. e.g. Account Manager"
            floatingLabelText="Work Title" /><br />
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
          <RaisedButton
            label="Login with Demo Account"
            secondary={true}
            fullWidth={true}
            onClick={this.handleDemoLogin} />
          <p>Already have an account?
            <FlatButton
              label="Login"
              secondary={true}
              onClick={this.props.switchDialog} /></p>
        </div>
      </div>
    );
  }
}

export default Signup;

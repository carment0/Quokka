import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
// import Dialog from 'material-ui/Dialog';

class Signup extends React.Component {
  state = { username: '', password: '' };

  static propTypes = {
    handleDialogClose: PropTypes.func.isRequired,
    dispatchSignup: PropTypes.func.isRequired
  };

  update(field) {
    return (e) => this.setState({
      [field]: e.target.value
    });
  }

  render() {
    return (
      <div className="signup-form">
        <h1>Sign Up</h1>
        <form>
          <input type="text"
            value={this.state.username}
            onChange={this.update('username')}
            placeholder="Username" />
          <br /><br />
          <input type="password"
            value={this.state.password}
            onChange={this.update('password')}
            placeholder="Password" />
          <br /><br />
          <FlatButton label="Cancel"
            primary={true}
            onClick={this.props.handleDialogClose} />

          <FlatButton
            label="Submit"
            primary={true}
            keyboardFocused={true}
            onClick={() => this.props.dispatchSignup(this.state)} />
        </form>
      </div>
    );
  }
}

export default Signup;

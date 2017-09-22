import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
// import Dialog from 'material-ui/Dialog';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  static propTypes = {
    handleModalClose: PropTypes.func.isRequired,
    dispatchLogin: PropTypes.func.isRequired
  };

  update(field) {
    return (e) => this.setState({
      [field]: e.currentTarget.value
    });
  }

  render() {
    return (
      <div className="login-form">
        <h1>Login</h1>
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
            onClick={this.props.handleModalClose} />

          <FlatButton
            label="Submit"
            primary={true}
            keyboardFocused={true}
            onClick={() => this.props.dispatchLogin(this.state)} />
        </form>
      </div>
    );
  }
}

export default Login;

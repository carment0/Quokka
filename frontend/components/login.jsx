import React from 'react';
import FlatButton from 'material-ui/FlatButton';
// import Dialog from 'material-ui/Dialog';

class Login extends React.Component {
  state = {
    username: '',
    password: '',
  }

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
          <input type="text"
            value={this.state.password}
            onChange={this.update('password')}
            placeholder="Password" />
        </form>
      </div>
    );
  }
}

export default Login;

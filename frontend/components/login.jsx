import React from 'react';


class Login extends React.Component {
  state = {
    username: '',
    password: '',
  }

  render() {
    return (
      <div className="login-form">
        <h1>Login</h1>
        <form>
          <input />
        </form>
      </div>
    );
  }
}

export default Login;

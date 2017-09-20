import React from 'react';


/*
  NOTE: Ideally, SignupPage and LoginPage are one container, and let there be a button for toggling state,
  switching from signup to login or login to signup just like how Asana does it.
*/
class SignupPage extends React.Component {
  componentWillReceiveProps() {
    // Redirect user to home page if there is a currentUser in nextProps
  }

  render() {
    return (
      <div className="signup">
        <h1>Welcome</h1>
        <h2>Please sign up</h2>
      </div>
    );
  }
}

// TODO: Connect this page to the store
export default SignupPage;

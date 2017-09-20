import React from 'react';


class HomePage extends React.Component {
  componentWillMount() {
    // Redirect user if no one is currently signed in
  }

  render() {
    return (
      <div className="home">
        <h1>Welcome to your home page</h1>
      </div>
    );
  }
}

// TODO: Connect this component to store
export default HomePage;

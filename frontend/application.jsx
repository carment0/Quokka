// React import
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { HashRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

// Material themes
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// Material component
import DatePicker from 'material-ui/DatePicker';

// Quokka import
import ReduxStore from './store';

class Application extends React.Component {
  state = {
    date: ''
  };

  // prop arrow fn no need to bind
  handlePickDate = (e, value) => {
    this.setState({ date: value.toString() });
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
          <DatePicker hintText="Pick a date" mode="landscape" onChange={this.handlePickDate} />
          <p>{this.state.date}</p>
        </div>
      </MuiThemeProvider>
    );
  }
}

const Router = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <Route path="/" component={Application} />
    </HashRouter>
  </Provider>
);

Router.propTypes = {
  store: PropTypes.object.isRequired
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Router store={ReduxStore} />, document.getElementById('react-application'));
});

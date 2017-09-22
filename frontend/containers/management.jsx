import React from 'react';

// Material themes
import AppBar from 'material-ui/AppBar';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';// import IconButton from 'material-ui/IconButton';
// import IconMenu from 'material-ui/IconMenu';
// import MenuItem from 'material-ui/MenuItem';
// import FlatButton from 'material-ui/FlatButton';
// import Toggle from 'material-ui/Toggle';
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
// import NavigationClose from 'material-ui/svg-icons/navigation/close';

class Management extends React.Component {
  componentWillMount() {
    // Redirect user if no one is currently signed in
  }

  returnHome() {
    
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
          <AppBar
            title="Welcome to Quokka"
            showMenuIconButton={false}
            onTitleTouchTap={returnHome}
            iconClassNameLeft
            />
          <h1>Management</h1>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Management;

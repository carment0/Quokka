import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ReactQuill from 'react-quill';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';

import { createProject } from '../../actions/project_actions';


class ProjectCreator extends React.Component {
  state = { name: '', description: '' };

  static propTypes = {
    dispatchCreateProject: PropTypes.func.isRequired
  };

  handleTextEditorChange = (value) => {
    this.setState({
      description: value
    });
  };

  handleFormSubmission = (e) => {
    e.preventDefault();
    this.props.dispatchCreateProject(this.state);
  };

  handlePickDate = (nullVal, date) => {
    this.setState({
      deadline: date
    });
  };

  update(field) {
    return (e) => this.setState({ [field]: e.currentTarget.value });
  }

  render() {
    return (
      <div className="project-creator">
        <form className="project-form" onSubmit={this.handleFormSubmission}>
          <h2>Name</h2>
          <TextField hintText={'Project name'} onChange={this.update('name')} />
          <h2>Deadline</h2>
          <DatePicker hintText="Deadline" container="inline" mode="landscape" onChange={this.handlePickDate} />
          <h2>Description</h2>
          <ReactQuill value={this.state.description} onChange={this.handleTextEditorChange} />
          <FlatButton
            type="submit"
            label="Submit"
            primary={true}
            keyboardFocused={true} />
        </form>
      </div>
    );
  }
}

// Current user doesn't seem necessary, we can get rid of this
const mapStateToProps = ({ sessions }) => ({
  currentUser: sessions.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCreateProject: (project) => dispatch(createProject(project))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCreator);

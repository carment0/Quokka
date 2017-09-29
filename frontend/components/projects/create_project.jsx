import React from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';


class CreateProject extends React.Component {
  state = {
    name: '',
    description: ''
  }

  static propTypes = {
    handleDialogClose: PropTypes.func.isRequired,
    dispatchCreateProject: PropTypes.func.isRequired
  };

  update(field) {
    return (e) => this.setState({ [field]: e.currentTarget.value });
  }

  handleTextEditorChange = (value) => {
    this.setState({
      description: value
    });
  }

  handleFormSubmission = (e) => {
    e.preventDefault();
    this.props.dispatchCreateProject(this.state);
    this.props.handleDialogClose();
  }

  handlePickDate = (nullVal, date) => {
    this.setState({
      deadline: date
    });
  }

  // TODO: Please style this shit
  render() {
    return (
      <form className="create-project" onSubmit={this.handleFormSubmission}>
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
        <FlatButton label="Cancel"
          primary={true}
          onClick={this.props.handleDialogClose} />
      </form>
    );
  }
}

export default CreateProject;

// React
import React from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
// Material UI
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
// Enums
const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],       // header dropdown
    [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ 'font': [] }],                                // font family
    ['bold', 'italic', 'underline'],       // toggled buttons
    [{ 'color': [] }, { 'background': [] }],         // dropdown with defaults
    [{ 'align': [] }],                               // text align
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],    // lists
    [{ 'indent': '-1'}, { 'indent': '+1' }],         // outdent/indent
    [{ 'script': 'sub'}, { 'script': 'super' }],     // superscript/subscript
    ['blockquote', 'code-block'],                    // blocks
    ['link'],                                        // address link
    ['clean']                                        // remove formatting
  ]
};

const formats = [
  'header', 'font', 'background', 'color', 'code', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent', 'script', 'align', 'direction',
  'link', 'image', 'code-block', 'formula', 'video'
];


class ProjectEditor extends React.Component {
  state = {
    id: this.props.selectedProject.id,
    name: this.props.selectedProject.name,
    description: this.props.selectedProject.description,
    deadline: this.props.selectedProject.deadline
  };

  static defaultProps = {
    selectedProject: {}
  };

  static propTypes = {
    selectedProject: PropTypes.object,
    handleDialogClose: PropTypes.func.isRequired,
    dispatchUpdateProject: PropTypes.func.isRequired
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
    console.log(this.state);
    this.props.dispatchUpdateProject(this.state);
    this.props.handleDialogClose();
  }

  handlePickDate = (nullVal, date) => {
    this.setState({
      deadline: date
    });
  }

  render() {
    return (
      <form className="create-project" onSubmit={this.handleFormSubmission}>
        <h2>Name</h2>
        <TextField
          hintText={'Project name'}
          value={this.state.name}
          onChange={this.update('name')} />
        <h2>Deadline</h2>
        <DatePicker
          hintText="Deadline"
          value={new Date(this.state.deadline)}
          container="inline"
          mode="landscape"
          onChange={this.handlePickDate} />
        <h2>Description</h2>
        <ReactQuill
          theme={'snow'}
          value={this.state.description}
          onChange={this.handleTextEditorChange}
          modules={modules}
          formats={formats} />
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

export default ProjectEditor;

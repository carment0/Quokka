// React
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// creates keys for mapping
import uuid from 'uuid/v1';

// Material UI
import ReactQuill from 'react-quill';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';

// Actions
import { createProject, clearProjectErrors } from '../../actions/project_actions';

// Enums
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],       // header dropdown
    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ font: [] }],                                // font family
    ['bold', 'italic', 'underline'],               // toggled buttons
    [{ color: [] }, { background: [] }],           // dropdown with defaults
    [{ align: [] }],                               // text align
    [{ list: 'ordered' }, { list: 'bullet' }],     // lists
    [{ indent: '-1' }, { indent: '+1' }],          // outdent/indent
    [{ script: 'sub' }, { script: 'super' }],      // superscript/subscript
    ['blockquote', 'code-block'],                  // blocks
    ['link'],                                      // address link
    ['clean']                                      // remove formatting
  ]
};

const formats = [
  'header', 'font', 'background', 'color', 'code', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent', 'script', 'align', 'direction',
  'link', 'image', 'code-block', 'formula', 'video'
];


class ProjectCreator extends React.Component {
  state = {
    name: '',
    description: '',
    defaultValue: 'Insert project description...'
  };

  static propTypes = {
    dispatchCreateProject: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    dispatchClearProjectErrors: PropTypes.func.isRequired,
    errors: PropTypes.array.isRequired
  };

  handleTextEditorChange = (value) => {
    this.setState({
      description: value
    });
  };

  handleFormSubmission = (e) => {
    e.preventDefault();
    this.props.dispatchCreateProject(this.state).then(() => this.props.history.push('/management/projects'));
  };

  handlePickDate = (nullVal, date) => {
    this.setState({
      deadline: date
    });
  };

  update(field) {
    return (e) => this.setState({ [field]: e.currentTarget.value });
  }

  get renderErrors() {
    return (
      <ul className="session-errors">
        {this.props.errors.map((error) => (
          <li key={uuid()} >
            {error}
          </li>
        ))}
      </ul>
    );
  }

  componentDidMount() {
    this.props.dispatchClearProjectErrors();
  }

  render() {
    return (
      <div className="project-creator">
        <h1>Create New Project</h1>
        <form className="project-form" onSubmit={this.handleFormSubmission}>
          {this.renderErrors}
          <div className="form-box">
            <h2>Project Name</h2>
            <TextField hintText={'Project name'} fullWidth={true} onChange={this.update('name')} />
          </div>
          <div className="form-box">
            <h2>Deadline</h2>
            <DatePicker hintText="Deadline"
              container="inline"
              mode="landscape"
              onChange={this.handlePickDate} />
          </div>
          <div className="form-box">
            <h2 className="description">Description</h2>
            <ReactQuill
              theme={'snow'}
              onChange={this.handleTextEditorChange}
              modules={modules}
              formats={formats}
              defaultValue={this.state.defaultValue} />
          </div>
          <div className="form-box">
            <FlatButton
              type="submit"
              label="Submit"
              primary={true}
              keyboardFocused={true} />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors.project
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCreateProject: (project) => dispatch(createProject(project)),
  dispatchClearProjectErrors: () => dispatch(clearProjectErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCreator);

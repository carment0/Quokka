// React
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Material UI
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import Chip from 'material-ui/Chip';
import LinearProgress from 'material-ui/LinearProgress';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

// Quill
import ReactQuill from 'react-quill';
// Actions
import { fetchProjectDetail, updateProject, clearProjectErrors } from '../../actions/project_actions';
import { clearTaskErrors, createTask, updateTask, deleteTask } from '../../actions/task_http_actions';
// Components
import ProjectTaskItem from '../../components/projects/project_task_item';
import ProjectEditor from '../../components/projects/project_editor';
import CreateTask from '../../components/tasks/task_creator';

// Enums
const COLORS = ['#00C49F', '#0088FE', '#ff2828'];
const circuleProgressStyle = {
  top: '50%',
  left: '50%'
};
const modules = {
  toolbar: []
};
// Dialog content is the white box that pops up during on click
const dialogContentStyle = {
  width: '70%',
  minWidth: '500px',
  maxWidth: '980px'
};
// Dialog title is the title section inside content body
const dialogTitleStyle = {
  display: 'flex',
  justifyContent: 'flex-start',
  fontWeight: '100',
  fontSize: '2rem'
};


class ProjectDetail extends React.Component {
  state = {
    height: null,
    width: null,
    dialogOpen: false
  };

  static propTypes = {
    dispatchFetchProjectDetail: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    dispatchUpdateProject: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
    dispatchClearProjectErrors: PropTypes.func.isRequired,
    projectErrors: PropTypes.array.isRequired,
    taskErrors: PropTypes.array.isRequired,
    dispatchClearTaskErrors: PropTypes.func.isRequired,
    dispatchCreateTask: PropTypes.func.isRequired,
    dispatchDeleteTask: PropTypes.func.isRequired,
    dispatchUpdateTask: PropTypes.func.isRequired
  }

  /**
   * Whenever window resizes, the dimension of the pie chart shall be updated accordingly
   */
  handleWindowResize = () => {
    this.setState({
      height: $('#chart-container').height(),
      width: $('#chart-container').width()
    });
  }

  handleDialogOpen(project) {
    return (e) => {
      e.preventDefault();
      this.setState({
        selectedProject: project,
        dialogOpen: true
      });
    };
  }

  handleDialogClose = () => {
    this.setState({
      dialogOpen: false
    });
  };

  componentDidMount() {
    this.props.dispatchFetchProjectDetail(this.props.match.params.id);
    window.addEventListener('resize', this.handleWindowResize);
  }

  /*
   * Whenever component is going to unmount, always check if there is a callback waiting to be called. If so, cancel it.
   */
  componentWillUnmount() {
    if (this.setTimeoutId) {
      clearTimeout(this.setTimeoutId);
    }

    window.removeEventListener('resize', this.handleWindowResize);
  }

  /**
   * Checks whether the project is fetched from the backend.
   * @returns {boolean}
   */
  get isProjectLoading() {
    const routerProjectId = parseInt(this.props.match.params.id, 10);
    return this.props.project.id !== routerProjectId;
  }

  /**
   * Returns a loading bar that indicates to users whether the data are fetched from backend.
   * @returns {React.Element}
   */
  get progressIndicator() {
    if (this.isProjectLoading) {
      return <LinearProgress mode={'indeterminate'} />;
    }

    return  <LinearProgress mode={'determinate'} value={100} />;
  }

  /**
   * Returns a project summary component which is really a rectangle that has two inner rectangles in it. The left rectangle
   * is the project description along with people that are assigned to the project. The right rectangle is a pie chart.
   * @returns {React.Element}
   */
  get projectSummary() {
    if (this.isProjectLoading) {
      return;
    }

    // TODO The chart needs to listen to window resizing event because right now it is stuck at one place when user
    // resizes the screen.
    return (
      <section className="project-summary">
        <article className="left-container">
          {this.projectDescription}
          {this.assigneeSection}
        </article>
        <article className="right-container" id="chart-container">
          {this.pieChart}
        </article>
      </section>
    );
  }

  /**
   * Returns a pie chart which indicates to user the state of the project.
   * @returns {React.Element}
   */
  get pieChart() {
    const containerHeight = $('#chart-container').height();
    const containerWidth = $('#chart-container').width();

    if (containerHeight && containerWidth) {
      const tasks = this.props.project.tasks;

      const isOverDue = (task) => {
        const now = new Date().getTime();
        return !task.completed && new Date(task.due_date).getTime() < now;
      };

      const record = [
        { name: 'Completed', value: tasks.filter((task) => task.completed).length },
        { name: 'In Progress', value: tasks.filter((task) => !task.completed && !isOverDue(task)).length },
        { name: 'Overdue', value: tasks.filter((task) =>  isOverDue(task)).length }
      ];

      return (
        <PieChart width={$('#chart-container').width()} height={$('#chart-container').height()}>
          <Pie
            dataKey="value"
            data={record}
            cx="50%"
            cy="50%"
            innerRadius={90} // This should be dynamic
            outerRadius={120} // This should be dynamic
            fill="#8884d8"
            label>
            {record.map((entry, index) => <Cell key={entry} fill={COLORS[index % COLORS.length]} />)}
          </Pie>
          <Tooltip />
        </PieChart>
      );
    }
    // To keep shit visually pleasing, it is actually BETTER to make user wait longer for the chart to show up because
    // the circular progress bar should at least complete one cycle of spinning.
    this.setTimeoutId = setTimeout(this.handleWindowResize, 1000);
    return <CircularProgress style={circuleProgressStyle} />;
  }

  /**
   * Returns a simple rectangular text container which has name of the project and description of the project in it.
   * @returns {React.Element}
   */
  get projectDescription() {
    return (
      <div className="project-description">
        <h1>{this.props.project.name}</h1>
        {this.editProject}
        <ReactQuill value={this.props.project.description} readOnly={true} theme="bubble" modules={modules} />
      </div>
    );
  }

  get editProject() {
    if (this.props.project.admin_id !== this.props.currentUser.id) {
      return;
    }
    return (
      <div>
        <FlatButton label="Edit" primary={true} onClick={this.handleDialogOpen(this.props.project)} />
      </div>
    );
  }

  /**
   * Returns a list of people who are assigned to the project.
   * @returns {React.Element}
   */
  get assigneeSection() {
    if (this.isProjectLoading) {
      return;
    }

    const names = new Set();
    this.props.project.tasks.forEach((task) => {
      task.assignees.forEach((person) => {
        names.add(person.name);
      });
    });

    const chips = Array.from(names).map((name) => (
      <Chip
        style={{ marginLeft: '0.1rem', marginRight: '0.1rem' }}
        className="chip"
        key={name}
        onClick={this.handleToggleUserProfile}>
        {name}
      </Chip>
    ));

    return (
      <div className="assignees">
        <h2>Team Members</h2>
        <div className="assignee-chips">{chips}</div>
      </div>
    );
  }

  /**
   * Returns a list of project task items contained within a task summary rectangle.
   * @returns {React.Element}
   */
  get taskSummary() {
    if (this.isProjectLoading) {
      return;
    }

    const projectTaskItems = this.props.project.tasks.map((task) => (
      <ProjectTaskItem task={task} key={task.name} />
    ));

    return (
      <div className="task-summary">
        <h1>Tasks</h1>
        <CreateTask
          projectId={this.props.project.id}
          errors={this.props.taskErrors}
          clearErrors={this.props.dispatchClearTaskErrors}
          createTask={this.props.dispatchCreateTask} />
        {projectTaskItems}
      </div>
    );
  }

  render() {
    return (
      <section className="project-detail">
        {this.progressIndicator}
        {this.projectSummary}
        {this.taskSummary}
        <Dialog
          titleStyle={dialogTitleStyle}
          contentStyle={dialogContentStyle}
          title={'Edit Project'}
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.handleDialogClose}>
          <ProjectEditor
            selectedProject={this.state.selectedProject}
            handleDialogClose={this.handleDialogClose}
            dispatchUpdateProject={this.props.dispatchUpdateProject}
            errors={this.props.projectErrors}
            dispatchClearProjectErrors={this.props.dispatchClearProjectErrors} />
        </Dialog>
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const projectId = ownProps.match.params.id;

  let project = {}; // NOTE: Ideally this is the place where I should use selector
  if (state.projects.detail[projectId]) {
    project = state.projects.detail[projectId];
  }

  return {
    currentUser: state.sessions.currentUser,
    projectErrors: state.errors.project,
    taskErrors: state.errors.task,
    project
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchProjectDetail: (projectId) => dispatch(fetchProjectDetail(projectId)),
  dispatchUpdateProject: (project) => dispatch(updateProject(project)),
  dispatchClearProjectErrors: () => dispatch(clearProjectErrors()),
  dispatchClearTaskErrors: () => dispatch(clearTaskErrors()),
  dispatchCreateTask: (projectId, task) => dispatch(createTask(projectId, task)),
  dispatchUpdateTask: (task) => dispatch(updateTask(task)),
  dispatchDeleteTask: (projectId, taskId) => dispatch(deleteTask(projectId, taskId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);

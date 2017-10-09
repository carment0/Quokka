// React
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Material UI
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import Chip from 'material-ui/Chip';
import LinearProgress from 'material-ui/LinearProgress';
import CircularProgress from 'material-ui/CircularProgress';
// Actions
import { fetchProjectDetail } from '../../actions/project_actions';
import ProjectTaskItem from '../../components/projects/project_task_item';
// Enums
const COLORS = ['#00C49F', '#0088FE', '#ff2828'];
const circuleProgressStyle = {
  top: '50%',
  left: '50%'
};

class ProjectDetail extends React.Component {
  state = {
    height: null,
    width: null
  };

  static propTypes = {
    dispatchFetchProjectDetail: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.dispatchFetchProjectDetail(this.props.match.params.id);
  }

  /*
   * Whenever component is going to unmount, always check if there is a callback waiting to be called. If so, cancel it.
   */
  componentWillUnmount() {
    if (this.setTimeoutId) {
      clearTimeout(this.setTimeoutId);
    }
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
            outerRadius={120}
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
    this.setTimeoutId = setTimeout(() => {
      this.setState({
        height: $('#chart-container').height(),
        width: $('#chart-container').width()
      });
    }, 1000);

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
        <p>{this.props.project.description}</p>
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
        <h2>Assignees</h2>
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
    project
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchProjectDetail: (projectId) => dispatch(fetchProjectDetail(projectId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);

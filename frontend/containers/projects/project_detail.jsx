import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import LinearProgress from 'material-ui/LinearProgress';
import Chip from 'material-ui/Chip';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

// Actions
import { fetchProjectDetail } from '../../actions/project_actions';
import ProjectTaskItem from '../../components/projects/project_task_item';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const data01 = [
  { name: 'Completed', value: 4 },
  { name: 'Todo', value: 10 },
  { name: 'Overdue', value: 15 },
  { name: 'In Progress', value: 10 }
];


class ProjectDetail extends React.Component {
  static propTypes = {
    dispatchFetchProjectDetail: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.dispatchFetchProjectDetail(this.props.match.params.id);
  }

  /**
   * Checks whether the project is fetched from the backend
   * @returns {boolean}
   */
  get isProjectLoading() {
    const routerProjectId = parseInt(this.props.match.params.id, 10);
    return this.props.project.id !== routerProjectId;
  }

  get progressIndicator() {
    if (this.isProjectLoading) {
      return <LinearProgress mode={'indeterminate'} />;
    }

    return  <LinearProgress mode={'determinate'} value={100} />;
  }

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

  get pieChart() {
    // NOTE: When page is refreshed, the pie chart fails to render because the height and width is null
    console.log(this.props.project.tasks, 'rendering pie chart');
    return (
      <PieChart width={$('#chart-container').width()} height={$('#chart-container').height()}>
        <Pie
          dataKey="value"
          data={data01}
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
          label>
          {data01.map((entry, index) => <Cell key={entry} fill={COLORS[index % COLORS.length]} />)}
        </Pie>
        <Tooltip />
      </PieChart>
    );
  }

  get projectDescription() {
    return (
      <div className="project-description">
        <h1>{this.props.project.name}</h1>
        <p>{this.props.project.description}</p>
      </div>
    );
  }

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

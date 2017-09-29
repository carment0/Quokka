import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import LinearProgress from 'material-ui/LinearProgress';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

// Actions
import { fetchProjectDetail } from '../actions/project_actions';

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

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.project);
  }

  componentDidMount() {
    this.props.dispatchFetchProjectDetail(this.props.match.params.id);
  }

  get progressIndicator() {
    if (this.props.project.id === parseInt(this.props.match.params.id, 10)) {
      return <LinearProgress mode={'determinate'} value={100} />;
    }

    return <LinearProgress mode={'indeterminate'} />;
  }

  get projectSummary() {
    if (this.props.project.id === parseInt(this.props.match.params.id, 10)) {
      return (
        <section className="summary-container">
          <article className="left-container">
            <h1>{this.props.project.name}</h1>
            <p>{this.props.project.description}</p>
          </article>
          <article className="right-container" id="chart-container">
            <PieChart width={$('#chart-container').width()} height={$('#chart-container').height()}>
              <Pie dataKey="value" data={data01} cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" />
              <Pie dataKey="value"
                data={data01}
                cx="50%"
                cy="50%"
                innerRadius={90}
                outerRadius={120}
                fill="#8884d8"
                label>
                {data01.map((entry, index) => <Cell key={entry} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </article>
        </section>
      );
    }

    return <h1>Loading...</h1>;
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

  let project = {}; // Ideally this is the place where I should use selector
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

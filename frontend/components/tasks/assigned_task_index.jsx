import React from 'react';
import PropTypes from 'prop-types';
import { isEqual, assign } from 'lodash';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


class AssignedTaskIndex extends React.Component {
  state = { tasks: this.props.assignedTasks };

  static propTypes = {
    assignedTasks: PropTypes.array.isRequired,
    dispatchUpdateTask: PropTypes.func.isRequired
  };

  isSelected = (index) => {
    return this.state.selectedRows.indexOf(index) !== -1;
  };

  handleRowSelection = (selectedRows) => {
    const tasks = this.state.tasks;

    switch (selectedRows) {
      case 'all':
        tasks.forEach((task) => {
          task.completed = true;
        });
        break;
      case 'none':
        tasks.forEach((task) => {
          task.completed = false;
        });
        break;
      default:
        tasks.forEach((task, index) => {
          task.completed = selectedRows.indexOf(index) !== -1;
        });
        break;
    }

    this.setState({ tasks });
  };

  componentWillReceiveProps(nextProps) {
    const newTasks = [];

    nextProps.assignedTasks.forEach((assignedTask) => {
      newTasks.push(assign({}, assignedTask));
    });

    this.setState({ tasks: newTasks });
  }

  componentDidUpdate() {
    this.state.tasks.forEach((task, index) => {
      if (!isEqual(task, this.props.assignedTasks[index])) {
        this.props.dispatchUpdateTask(task);
      }
    });
  }

  get taskList() {
    const tableRows = this.state.tasks.map((task) => (
      <TableRow selected={task.completed} key={task.name}>
        <TableRowColumn>{task.name}</TableRowColumn>
        <TableRowColumn>{task.description}</TableRowColumn>
        <TableRowColumn>{task.due_date}</TableRowColumn>
      </TableRow>
    ));

    return (
      <Table onRowSelection={this.handleRowSelection} multiSelectable={true}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Description</TableHeaderColumn>
            <TableHeaderColumn>Due Date</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableRows}
        </TableBody>
      </Table>
    );
  }

  render() {
    return (
      <div className="assigned-tasks">
        <div className="assigned-tasks-list">{this.taskList}</div>
      </div>
    );
  }
}

export default AssignedTaskIndex;

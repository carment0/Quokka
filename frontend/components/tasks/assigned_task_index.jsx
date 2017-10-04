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
  static propTypes = {
    assignedTasks: PropTypes.object.isRequired,
    dispatchUpdateAssignedTask: PropTypes.func.isRequired
  };

  handleRowSelection = (selectedRows) => {
    const taskIdList = Object.keys(this.props.assignedTasks).sort();

    const tasks = taskIdList.map((id) => assign({}, this.props.assignedTasks[id]));

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

    tasks.forEach((task) => {
      if (!isEqual(task, this.props.assignedTasks[task.id])) {
        this.props.dispatchUpdateAssignedTask(task);
      }
    });
  };

  get taskList() {
    const taskIdList = Object.keys(this.props.assignedTasks).sort();

    const tableRows = taskIdList.map((id) => {
      const task = this.props.assignedTasks[id];

      return (
        <TableRow selected={task.completed} key={task.name}>
          <TableRowColumn>{task.name}</TableRowColumn>
          <TableRowColumn>{task.description}</TableRowColumn>
          <TableRowColumn>{task.due_date}</TableRowColumn>
        </TableRow>
      );
    });

    return (
      <Table onRowSelection={this.handleRowSelection} multiSelectable={true} >
        <TableHeader enableSelectAll={false} displaySelectAll={false} >
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Description</TableHeaderColumn>
            <TableHeaderColumn>Due Date</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody deselectOnClickaway={false}>
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

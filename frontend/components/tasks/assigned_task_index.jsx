import React from 'react';
import PropTypes from 'prop-types';
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
    assignedTasks: PropTypes.array.isRequired
  }

  isSelected = (index) => {
    return this.state.selectedRows.indexOf(index) !== -1;
  };

  handleRowSelection = (selectedRows) => {
    console.log(selectedRows);
  }

  componentDidUpdate() {
    // Send requests to update task completion
  }

  get taskList() {
    const tableRows = this.props.assignedTasks.map((task) => (
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

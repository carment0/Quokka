

# Quokka
Quokka is a clone of the project management app Asana. Quokka allows for team members to collaboratively track project and task completion.

Quokka home page: https://quokka-app.herokuapp.com

## Features

User accounts with secure authentication
Project Dashboard allowing easy management between projects and tasks
Ability to view projects assigned or authored by you
Ability to create and edit tasks by project

## Project Design

Refer to project wiki

## Technology

Quokka is a single-page application built on Rails and React.js, adhering to Material and Rechart design guidelines using the material-ui and Recharts library.

### Real-time chart updates
``` js
get pieChart() {
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

  console.log(this.props.project.tasks, 'rendering pie chart');
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

```

## Future Implementations

Currently Quokka is still a skeleton application. More planned features will be implemented in the future.

## Some Planned Features

 Real time updates on comments and notifications.
 Calendar showing upcoming Task and Project deadlines

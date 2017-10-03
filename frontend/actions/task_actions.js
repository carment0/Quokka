export const RECEIVE_TASKS = 'RECEIVE_TASKS';
export const RECEIVE_TASK = 'RECEIVE_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const RECEIVE_TASK_ERRORS = 'RECEIVE_TASK_ERRORS';
export const RECEIVE_ASSIGNED_TASKS = 'RECEIVE_ASSIGNED_TASKS';


export const receiveTasks = (tasks) => ({
  type: RECEIVE_TASKS,
  tasks
});

export const receiveAssignedTasks = (tasks) => ({
  type: RECEIVE_ASSIGNED_TASKS,
  tasks
});


export const receiveTask = (task) => ({
  type: RECEIVE_TASK,
  task
});

export const removeTask = (task) => ({
  type: REMOVE_TASK,
  task
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_TASK_ERRORS,
  errors
});

export const fetchTasks = (project_id) => (dispatch) => (
  $.ajax({ method: 'GET', url: `/api/projects/${project_id}/tasks` })
    .then((tasks) => (
      dispatch(receiveTasks(tasks))
    ))
);

export const fetchAssignedTasks = (userId) => (dispatch) => (
  $.ajax({ method: 'GET', url: `/api/users/${userId}/tasks/assigned` })
    .then((taskList) => (
      dispatch(receiveAssignedTasks(taskList))
    ))
);

export const fetchTask = (project_id, task_id) => (dispatch) => (
  $.ajax({ method: 'GET', url: `/api/projects/${project_id}/tasks/${task_id}` })
    .then((task) => (
      dispatch(receiveTask(task))
    ))
);

export const createTask = (project_id, new_task) => (dispatch) => (
  $.ajax({ method: 'POST', url: `api/projects/${project_id}/tasks`, data: { new_task } })
    .then((task) => (
      dispatch(receiveTask(task))
    ))
    .fail((err) => (
      dispatch(receiveErrors(err.responseJSON))
    ))
);

export const updateTask = (task) => (dispatch) => (
  $.ajax({ method: 'PATCH', url: `api/projects/${task.project_id}/tasks/${task.id}`, data: { task } })
    .then((updatedTask) => (
      dispatch(receiveTask(updatedTask))
    ))
    .fail((err) => (
      dispatch(receiveErrors(err.responseJSON))
    ))
);

export const deleteTask = (project_id, task_id) => (dispatch) => (
  $.ajax({ method: 'DELETE', url: `api/projects/${project_id}/tasks/${task_id}` })
    .then((task) => (
      dispatch(removeTask(task))
    ))
);

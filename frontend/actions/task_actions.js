export const RECEIVE_TASK = 'RECEIVE_TASK';
export const receiveTask = (task) => ({
  type: RECEIVE_TASK,
  task
});

export const RECEIVE_TASK_LIST = 'RECEIVE_TASK_LIST';
export const receiveTaskList = (taskList) => ({
  type: RECEIVE_TASK_LIST,
  taskList
});

export const RECEIVE_ASSIGNED_TASK = 'RECEIVE_ASSIGNED_TASK';
export const receiveAssignedTask = (task) => ({
  type: RECEIVE_ASSIGNED_TASK,
  task
});

export const RECEIVE_ASSIGNED_TASK_LIST = 'RECEIVE_ASSIGNED_TASK_LIST';
export const receiveAssignedTaskList = (taskList) => ({
  type: RECEIVE_ASSIGNED_TASK_LIST,
  taskList
});

export const REMOVE_TASK = 'REMOVE_TASK';
export const removeTask = (task) => ({
  type: REMOVE_TASK,
  task
});

export const RECEIVE_TASK_ERRORS = 'RECEIVE_TASK_ERRORS';
export const receiveTaskErrors = (errors) => ({
  type: RECEIVE_TASK_ERRORS,
  errors
});

export const fetchTask = (project_id, task_id) => (dispatch) => (
  $.ajax({ method: 'GET', url: `/api/projects/${project_id}/tasks/${task_id}` })
    .then((task) => (
      dispatch(receiveTask(task))
    ))
);

export const fetchTaskList = (project_id) => (dispatch) => (
  $.ajax({ method: 'GET', url: `/api/projects/${project_id}/tasks` })
    .then((tasks) => (
      dispatch(receiveTaskList(tasks))
    ))
);

export const fetchAssignedTaskList = (userId) => (dispatch) => (
  $.ajax({ method: 'GET', url: `/api/users/${userId}/tasks/assigned` })
    .then((taskList) => (
      dispatch(receiveAssignedTaskList(taskList))
    ))
);

export const createTask = (project_id, new_task) => (dispatch) => (
  $.ajax({ method: 'POST', url: `api/projects/${project_id}/tasks`, data: { new_task } })
    .then((task) => (
      dispatch(receiveTask(task))
    ))
    .fail((err) => (
      dispatch(receiveTaskErrors(err.responseJSON))
    ))
);

export const updateTask = (task) => (dispatch) => (
  $.ajax({ method: 'PATCH', url: `api/projects/${task.project_id}/tasks/${task.id}`, data: { task } })
    .then((updatedTask) => (
      dispatch(receiveTask(updatedTask))
    ))
    .fail((err) => (
      dispatch(receiveTaskErrors(err.responseJSON))
    ))
);

export const updateAssignedTask = (task) => (dispatch) => (
  $.ajax({ method: 'PATCH', url: `api/projects/${task.project_id}/tasks/${task.id}`, data: { task } })
    .then((updatedTask) => (
      dispatch(receiveAssignedTask(updatedTask))
    ))
    .fail((err) => (
      dispatch(receiveTaskErrors(err.responseJSON))
    ))
);

export const deleteTask = (project_id, task_id) => (dispatch) => (
  $.ajax({ method: 'DELETE', url: `api/projects/${project_id}/tasks/${task_id}` })
    .then((task) => (
      dispatch(removeTask(task))
    ))
);

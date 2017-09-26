export const RECEIVE_TASKS = 'RECEIVE_TASKS';
export const RECEIVE_TASK = 'RECEIVE_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';


export const receiveTasks = (tasks) => ({
  type: RECEIVE_TASKS,
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

export const fetchTasks = (project_id) => (dispatch) => (
  $.ajax({ method: 'GET', url: `/api/projects/${project_id}/tasks` })
    .then((tasks) => (
      dispatch(receiveTasks(tasks))
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
);

export const updateTask = (project_id, updated_task) => (dispatch) => (
  $.ajax({ method: 'PATCH', url: `api/projects/${project_id}/tasks/${updated_task.id}`, data: { updated_task } })
    .then((task) => (
      dispatch(receiveTask(task))
    ))
);

export const deleteTask = (project_id, task_id) => (dispatch) => (
  $.ajax({ method: 'DELETE', url: `api/projects/${project_id}/tasks/${task_id}` })
    .then((task) => (
      dispatch(removeTask(task))
    ))
);

export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';
export const RECEIVE_PROJECT = 'RECEIVE_PROJECT';
export const REMOVE_PROJECT = 'REMOVE_PROJECT';
export const RECEIVE_PROJECT_ERRORS = 'RECEIVE_PROJECT_ERRORS';
export const RECEIVE_ASSIGNED_PROJECTS = 'RECEIVE_ASSIGNED_PROJECTS';
export const RECEIVE_ADMINISTRATED_PROJECTS = 'RECEIVE_ADMINISTRATED_PROJECTS';

export const receiveProjects = (projects) => ({
  type: RECEIVE_PROJECTS,
  projects
});

export const receiveAssignedProjects = (projects) => ({
  type: RECEIVE_ASSIGNED_PROJECTS,
  projects
});

export const receiveAdministratedProjects = (projects) => ({
  type: RECEIVE_ADMINISTRATED_PROJECTS,
  projects
});

export const receiveProject = (project) => ({
  type: RECEIVE_PROJECT,
  project
});

export const removeProject = (project) => ({
  type: REMOVE_PROJECT,
  project
});

export const receiveProjectErrors = (errors) => ({
  type: RECEIVE_PROJECT_ERRORS,
  errors
});

export const fetchProjects = () => (dispatch) => (
  $.ajax({ method: 'GET', url: '/api/projects' })
    .then((projects) => (
      dispatch(receiveProjects(projects))
    ))
);

export const fetchAssignedProjects = (userId) => (dispatch) => (
  $.ajax({ method: 'GET', url: `/api/users/${userId}/projects/assigned` })
    .then((projects) => (
      dispatch(receiveAssignedProjects(projects))
    ))
);

export const fetchAdministratedProjects = (userId) => (dispatch) => (
  $.ajax({ method: 'GET', url: `/api/users/${userId}/projects/administrated` })
    .then((projects) => (
      dispatch(receiveAdministratedProjects(projects))
    ))
);

export const fetchProject = (id) => (dispatch) => (
  $.ajax({ method: 'GET', url: `/api/projects/${id}` })
    .then((project) => (
      dispatch(receiveProject(project))
    ))
);

export const createProject = (new_project) => (dispatch) => (
  $.ajax({ method: 'POST', url: 'api/projects', data: { new_project } })
    .then((project) => (
      dispatch(receiveProject(project))
    ))
    .fail((err) => (
      dispatch(receiveProjectErrors(err.responseJSON))
    ))
);

export const updateProject = (updated_project) => (dispatch) => (
  $.ajax({ method: 'PATCH', url: `api/projects/${updated_project.id}`, data: { updated_project } })
    .then((project) => (
      dispatch(receiveProject(project))
    ))
    .fail((err) => (
      dispatch(receiveProjectErrors(err.responseJSON))
    ))
);

export const deleteProject = (id) => (dispatch) => (
  $.ajax({ method: 'DELETE', url: `api/projects/${id}` })
    .then((project) => (
      dispatch(removeProject(project))
    ))
);

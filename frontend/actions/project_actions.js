// Error handling
export const RECEIVE_PROJECT_ERRORS = 'RECEIVE_PROJECT_ERRORS';
export const receiveProjectErrors = (errors) => ({
  type: RECEIVE_PROJECT_ERRORS,
  errors
});

export const clearProjectErrors = () => ({
  type: RECEIVE_PROJECT_ERRORS,
  errors: []
});

// For list of projects
// export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';
// export const receiveProjects = (projects) => ({
//   type: RECEIVE_PROJECTS,
//   projects
// });

export const RECEIVE_ASSIGNED_PROJECTS = 'RECEIVE_ASSIGNED_PROJECTS';
export const receiveAssignedProjects = (projects) => ({
  type: RECEIVE_ASSIGNED_PROJECTS,
  projects
});

export const RECEIVE_ADMINISTRATED_PROJECTS = 'RECEIVE_ADMINISTRATED_PROJECTS';
export const receiveAdministratedProjects = (projects) => ({
  type: RECEIVE_ADMINISTRATED_PROJECTS,
  projects
});

// export const fetchProjects = () => (dispatch) => (
//   $.ajax({ method: 'GET', url: '/api/projects' })
//     .then((projects) => (
//       dispatch(receiveProjects(projects))
//     ))
// );

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

// For individual project
export const RECEIVE_PROJECT_DETAIL = 'RECEIVE_PROJECT_DETAIL';
export const receiveProjectDetail = (project) => ({
  type: RECEIVE_PROJECT_DETAIL,
  project
});

export const REMOVE_PROJECT = 'REMOVE_PROJECT';
export const removeProject = (project) => ({
  type: REMOVE_PROJECT,
  project
});

export const fetchProjectDetail = (id) => (dispatch) => (
  $.ajax({ method: 'GET', url: `/api/projects/${id}` })
    .then((project) => (
      dispatch(receiveProjectDetail(project))
    ))
);

export const createProject = (project) => (dispatch) => (
  $.ajax({ method: 'POST', url: 'api/projects', data: { project } })
    .then((savedProject) => (
      dispatch(receiveAdministratedProjects([savedProject]))
    ))
    .fail((err) => (
      dispatch(receiveProjectErrors(err.responseJSON))
    ))
);

export const updateProject = (project) => (dispatch) => (
  $.ajax({ method: 'PATCH', url: `api/projects/${project.id}`, data: { project } })
    .then((updatedProject) => (
      dispatch(receiveProjectDetail(updatedProject))
    ))
    .fail((err) => (
      dispatch(receiveProjectErrors(err.responseJSON))
    ))
);

export const deleteProject = (id) => (dispatch) => (
  $.ajax({ method: 'DELETE', url: `api/projects/${id}` })
    .then((deletedProject) => (
      dispatch(removeProject(deletedProject))
    ))
);

/*
Socket actions rely on live websocket streams to receive the data and then perform dispatch to modify the Redux
store. The data will flow down streams from components because websocket subscription is created when component did
mount. The set of actions in this file will simply receive the data and directly dispatch to modify store.
*/
import { receiveTask, receiveAssignedTask } from './task_http_actions';


export const updateTaskViaSocket = (updatedTask) => (dispatch) => (dispatch(receiveTask(updatedTask)));
export const updateAssignedTaskViaSocket = (updatedTask) => (dispatch) => (dispatch(receiveAssignedTask(updatedTask)));

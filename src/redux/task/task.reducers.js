import {
  FETCH_USER_TASKS,
  CREATE_NEW_TASK,
  TOGGLE_MODAL_TASK,
  TOGGLE_DETAIL_MODAL,
  EDIT_TASK_DETAILS,
  SET_TASK_DETAILS,
  DELETE_TASK,
} from '../action-types'
import { removeTask } from './task.utils'

const initialState = {
  boards: [
    {
      title: 'Backlog',
      color: '#C14242',
      status: 'backlog',
    },
    {
      title: 'Todo',
      color: '#E8BA1A',
      status: 'todo',
    },
    {
      title: 'Ongoing',
      color: '#428CC1',
      status: 'ongoing',
    },
    {
      title: 'Completed',
      color: '#6CAB3B',
      status: 'completed',
    },
  ],
  taskList: [],
  taskDetails: {},
  invitationList: [],
  modalShow: false,
  editModal: false,
}

const taskReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_TASKS:
      return {
        ...state,
        taskList: action.payload.taskList,
      }
    case CREATE_NEW_TASK:
      return {
        ...state,
        taskList: [...state.taskList, action.payload.newTask],
        modalShow: !state.modalShow,
      }
    case TOGGLE_MODAL_TASK:
      return {
        ...state,
        modalShow: !state.modalShow,
      }
    case TOGGLE_DETAIL_MODAL:
      return {
        ...state,
        editModal: !state.editModal,
      }
    case EDIT_TASK_DETAILS:
      return {
        ...state,
        editModal: false,
      }
    case SET_TASK_DETAILS:
      return {
        ...state,
        taskDetails: action.payload.task,
      }
    case DELETE_TASK:
      return {
        ...state,
        taskList: removeTask(state.taskList, action.payload.taskId),
        editModal: false,
      }
    default:
      return state
  }
}

export default taskReducers

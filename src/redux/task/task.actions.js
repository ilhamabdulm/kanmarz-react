import axios from 'axios'

import {
  FETCH_USER_TASKS,
  CREATE_NEW_TASK,
  TOGGLE_MODAL_TASK,
  TOGGLE_DETAIL_MODAL,
  EDIT_TASK_DETAILS,
  SET_TASK_DETAILS,
  DELETE_TASK,
} from '../action-types'
import { BASE_URL } from '../../config/api'

export const fetchUserTask = () => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().user
      const {
        projectDetails: { id },
      } = getState().projects
      const { data } = await axios.get(`${BASE_URL}/tasks/${id}`, {
        headers: { token },
      })

      dispatch({
        type: FETCH_USER_TASKS,
        payload: {
          taskList: data,
        },
      })

      return data
    } catch (err) {
      throw err
    }
  }
}

export const createNewTask = (task) => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().user
      const {
        projectDetails: { id },
      } = getState().projects
      const { data } = await axios.post(`${BASE_URL}/tasks/${id}`, task, {
        headers: { token },
      })

      console.log(data)

      dispatch({
        type: CREATE_NEW_TASK,
        payload: {
          newTask: data.result,
        },
      })
    } catch (err) {
      throw err
    }
  }
}

export const deleteTask = (taskId) => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().user
      const {
        projectDetails: { id },
      } = getState().projects
      const { data } = await axios.delete(`${BASE_URL}/tasks/${taskId}/${id}`, {
        headers: { token },
      })

      dispatch({
        type: DELETE_TASK,
        payload: { taskId },
      })
    } catch (err) {
      throw err
    }
  }
}

export const editTaskDetails = (task, taskId) => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().user
      const {
        projectDetails: { id },
      } = getState().projects
      const { data } = await axios.put(
        `${BASE_URL}/tasks/${taskId}/${id}`,
        task,
        {
          headers: { token },
        }
      )

      dispatch({
        type: EDIT_TASK_DETAILS,
      })

      return data.msg
    } catch (err) {
      console.log(err.response.data)
      throw err
    }
  }
}

export const updateTaskStatus = (taskId, status) => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().user
      const {
        projectDetails: { id },
      } = getState().projects
      const { data } = await axios.patch(
        `${BASE_URL}/tasks/${taskId}/${id}`,
        { status: status },
        { headers: { token } }
      )

      console.log(data)
    } catch (err) {
      throw err
    }
  }
}

export const toggleModalShow = () => {
  return {
    type: TOGGLE_MODAL_TASK,
  }
}

export const toggleModalDetail = () => {
  return {
    type: TOGGLE_DETAIL_MODAL,
  }
}

export const setTaskDetails = (task) => {
  return {
    type: SET_TASK_DETAILS,
    payload: {
      task,
    },
  }
}

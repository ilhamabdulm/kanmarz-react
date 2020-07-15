import axios from 'axios'

import { BASE_URL } from '../../config/api'
import {
  FETCH_USER_PROJECTS,
  TOGGLE_MODAL,
  SET_PROJECT_DETAILS,
  TOGGLE_MODAL_INVITE,
  TOGGLE_MEMBERS_DROPDOWN,
  FETCH_PROJECT_INVITATION,
} from '../action-types'

export const fetchUserProjects = () => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().user
      const { data } = await axios.get(`${BASE_URL}/projects`, {
        headers: { token },
      })

      dispatch({
        type: FETCH_USER_PROJECTS,
        payload: {
          personalProjects: data.personal,
          groupProjects: data.other,
        },
      })
    } catch (err) {
      throw err
    }
  }
}

export const toggleModal = () => {
  return {
    type: TOGGLE_MODAL,
  }
}

export const toggleModalInvite = () => {
  return {
    type: TOGGLE_MODAL_INVITE,
  }
}

export const createProject = (project) => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().user
      const { data } = await axios.post(`${BASE_URL}/projects`, project, {
        headers: { token },
      })
      dispatch({
        type: TOGGLE_MODAL,
      })
      return data.msg
    } catch (err) {
      throw err.response.data
    }
  }
}

export const deleteProject = (projectId) => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().user
      const { data } = await axios.delete(`${BASE_URL}/projects/${projectId}`, {
        headers: { token },
      })
      return data.msg
    } catch (err) {
      throw err
    }
  }
}

export const leaveProject = (projectId) => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().user
      const { data } = await axios.delete(
        `${BASE_URL}/projects/leave/${projectId}`,
        {
          headers: { token },
        }
      )
      return data.msg
    } catch (err) {
      throw err
    }
  }
}

export const setProjectDetails = (projectId) => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().user
      const { data } = await axios.get(`${BASE_URL}/projects/${projectId}`, {
        headers: { token },
      })

      console.log(data)

      dispatch({
        type: SET_PROJECT_DETAILS,
        payload: {
          projectDetails: data.data,
        },
      })
    } catch (err) {
      throw err
    }
  }
}

export const inviteProjectMember = (userEmail, projectId) => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().user
      const {
        projectDetails: { id },
      } = getState().projects
      const { data } = await axios.post(
        `${BASE_URL}/projects/invite/${id}`,
        userEmail,
        { headers: { token } }
      )

      console.log(data)

      dispatch({
        type: TOGGLE_MODAL_INVITE,
      })

      return data.msg
    } catch (err) {
      throw err
    }
  }
}

export const fetchProjectInvitation = () => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().user
      const { data } = await axios.get(
        `${BASE_URL}/projects/user/invitations`,
        {
          headers: { token },
        }
      )

      console.log(data)

      dispatch({
        type: FETCH_PROJECT_INVITATION,
        payload: {
          invitations: data,
        },
      })
    } catch (err) {
      if (err.response.data.code === 404) {
        dispatch({
          type: FETCH_PROJECT_INVITATION,
          payload: {
            invitations: [],
          },
        })
      }
      throw err
    }
  }
}

export const acceptInvitation = (projectId) => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().user
      const { data } = await axios.patch(
        `${BASE_URL}/projects/accept/${projectId}`,
        {},
        {
          headers: { token },
        }
      )
      console.log(data)
      return fetchUserProjects()
    } catch (err) {
      throw err
    }
  }
}

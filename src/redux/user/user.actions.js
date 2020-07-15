import axios from 'axios'

import { BASE_URL } from '../../config/api'
import {
  LOGIN_USER,
  ERROR,
  REGISTER_USER,
  SET_USER,
  LOGOUT_USER,
} from '../action-types'

export const loginUser = (user) => {
  return async (dispatch, getState) => {
    const {errors} = getState().user
    try {
      const {
        data: { id, token },
      } = await axios.post(`${BASE_URL}/users/login`, user)
      localStorage.setItem('token', token)
      localStorage.setItem('id', id)
      dispatch({
        type: LOGIN_USER,
        payload: {
          id,
          token,
        },
      })
    } catch (error) {
      // console.log(error)
      if (errors < 2) {
        dispatch({
          type: ERROR,
          payload: {
            errors: error.response.data.err,
          },
        })
        throw error
      } else {
        throw { message: 'Limit Attempt!'}
      }
    }
  }
}

export const registerUser = (user) => {
  return async (dispatch) => {
    try {
      const {
        data: { id, token },
      } = await axios.post(`${BASE_URL}/users/register`, user)
      localStorage.setItem('token', token)
      localStorage.setItem('id', id)
      dispatch({
        type: REGISTER_USER,
        payload: {
          id,
          token,
        },
      })
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: {
          errors: error.response.data.err,
        },
      })
      throw error
    }
  }
}

export const checkLoginStatus = () => {
  if (localStorage.getItem('token') && localStorage.getItem('id')) {
    return {
      type: SET_USER,
      payload: {
        loginStatus: true,
        token: localStorage.getItem('token'),
        userId: localStorage.getItem('id'),
      },
    }
  }
}

export const logoutUser = () => {
  localStorage.clear()
  return {
    type: LOGOUT_USER,
    payload: {
      loginStatus: false,
      token: null,
      userId: null,
    },
  }
}

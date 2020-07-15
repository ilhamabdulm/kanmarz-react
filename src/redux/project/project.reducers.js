import {
  FETCH_USER_PROJECTS,
  TOGGLE_MODAL,
  SET_PROJECT_DETAILS,
  TOGGLE_MODAL_INVITE,
  FETCH_PROJECT_INVITATION,
} from '../action-types'

const initialState = {
  personalProjects: [],
  groupProjects: [],
  projectDetails: null,
  projectModal: false,
  inviteModal: false,
  invitations: [],
}

const projectReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_PROJECTS:
      return {
        ...state,
        ...action.payload,
      }
    case TOGGLE_MODAL:
      return {
        ...state,
        projectModal: !state.projectModal,
      }
    case TOGGLE_MODAL_INVITE:
      return {
        ...state,
        inviteModal: !state.inviteModal,
      }
    case SET_PROJECT_DETAILS:
      return {
        ...state,
        projectDetails: action.payload.projectDetails,
      }
    case FETCH_PROJECT_INVITATION:
      return {
        ...state,
        invitations: action.payload.invitations,
      }
    default:
      return state
  }
}

export default projectReducers

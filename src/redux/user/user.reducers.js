import {
  REGISTER_USER,
  LOGIN_USER,
  ERROR,
  SET_USER,
  LOGOUT_USER,
} from '../action-types';

const initialState = {
  loginStatus: false,
  userId: localStorage.getItem('userId') || null,
  token: localStorage.getItem('token') || null,
  errors: 0,
};

const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loginStatus: true,
        userId: action.payload.id,
        token: action.payload.token,
      };
    case REGISTER_USER:
      return {
        ...state,
        loginStatus: true,
        userId: action.payload.userId,
        token: action.payload.token,
      };
    case SET_USER:
      return {
        ...state,
        ...action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        ...action.payload,
      };
    case ERROR:
      return {
        ...state,
        errors: (state.errors += 1),
      };
    default:
      return state;
  }
};

export default userReducers;

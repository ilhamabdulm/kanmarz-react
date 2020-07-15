import { combineReducers } from 'redux'

import userReducers from './user/user.reducers'
import projectReducers from './project/project.reducers'
import taskReducers from './task/task.reducers'

export default combineReducers({
  user: userReducers,
  projects: projectReducers,
  tasks: taskReducers,
})

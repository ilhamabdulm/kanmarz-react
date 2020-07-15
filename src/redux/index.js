import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import reducers from './root-reducer'

const middlewares = applyMiddleware(logger, thunk)

export default createStore(reducers, middlewares)

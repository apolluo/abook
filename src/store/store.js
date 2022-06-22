import {createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import indexReducer from '../reducer/indexReducer'
import { createLogger } from 'redux-logger'

const logger = createLogger()

const store = createStore(
  indexReducer,
  compose(
    applyMiddleware(thunkMiddleware, logger),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)
export default store

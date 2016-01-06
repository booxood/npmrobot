import { combineReducers } from 'redux'
import { routerStateReducer as router } from 'redux-router'
import reducer from './reducer'

const rootReducer = combineReducers({
  router,
  reducer
})

export default rootReducer

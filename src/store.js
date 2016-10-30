import { createStore,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import indexReducer from './reducers'
let store = createStore(indexReducer,applyMiddleware(thunk))
export {store}
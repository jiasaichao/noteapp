import {combineReducers} from 'redux';
import {NotesReducer} from './notes';
/**
 * 合并reducers
 */
const index = combineReducers({
  notes:NotesReducer,
})
export default index;
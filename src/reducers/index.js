import {combineReducers} from 'redux';
import {NotesReducer,FolderReducer} from './notes';
/**
 * 合并reducers
 */
const index = combineReducers({
  notesList:NotesReducer,
  folderList:FolderReducer
})
export default index;
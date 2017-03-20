import {combineReducers} from 'redux';
import {NotesReducer,FolderReducer,AddNotesReducer} from './notes';
/**
 * 合并reducers
 */
const index = combineReducers({
  notesList:NotesReducer,
  folderList:FolderReducer,
  addNotes:AddNotesReducer
})
export default index;
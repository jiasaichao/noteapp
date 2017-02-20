import * as ActionTypes from '../actions/notes'
import * as FolderActionTypes from '../actions/folder'
/**默认值 */
{}
const initialState = [];
/** */
export const NotesReducer = (state=initialState, action)=>{
  switch(action.type){
      case ActionTypes.NOTES:
      return action.data;
    default:
      return state;
  }
}
export const FolderReducer = (state=initialState, action)=>{
  switch(action.type){
      case FolderActionTypes.FOLDER:
      return action.data;
    default:
      return state;
  }
}
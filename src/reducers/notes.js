import * as ActionTypes from '../actions/notes'
/**默认值 */
const initialState = [];
/** */
export const NotesReducer = (state=initialState, action)=>{
  switch(action.type){
      case ActionTypes.NOTES:
      return {...state, ...action.data};
    default:
      return state;
  }
}
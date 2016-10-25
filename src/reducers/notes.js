const initialState = [];
/** */
export const NotesReducer = (state=initialState, action)=>{
  switch(action.type){
      case 'NOTES':
      return {...state, ...action.data};
    default:
      return state;
  }
}
export const NOTES = 'NOTES'
function getData() {
    return global.Loki.collections.find((value) => value.name === 'notes');
}
export const NotesAction = (data) => (dispatch) => {
    let data1 = JSON.parse(JSON.stringify(data));
    dispatch({
        type: NOTES,
        data: data1,
    });
}

export const RemoveNotesAction = (id) => (dispatch) => {
    getData().remove(id);
    return GetNotesAction(dispatch);
}
export const SetNotesAction = (data) => (dispatch) => {
    getData().update(data);
    return GetNotesAction(dispatch);
}
export const AddNotesAction = (data) => (dispatch) => {
    let lokiData = getData();
    data.sort = lokiData.maxId + 1;
    lokiData.insert(data);
    return GetNotesAction(dispatch);
}

export const GetNotesAction = (dispatch) => {
    let data = getData().data;
    dispatch(NotesAction(data));
}


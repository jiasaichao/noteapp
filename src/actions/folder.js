export const FOLDER = 'FOLDER'
export function getData() {
    return global.Loki.collections.find((value) => value.name === 'folder');
}
export const FolderAction = (data) => (dispatch) => {
    let data1 = JSON.parse(JSON.stringify(data));
    dispatch({
        type: FOLDER,
        data: data1,
    });
}

export const RemoveFolderAction = (id) => (dispatch) => {
    getData().remove(id);
    return GetFolderAction(dispatch);
}
export const SetFolderAction = (data) => (dispatch) => {
    getData().update(data);
    return GetFolderAction(dispatch);
}
export const AddFolderAction = (data) => (dispatch) => {
    console.log('插入分类')
    let lokiData = getData();
    data.sort = lokiData.maxId + 1;
    lokiData.insert(data);
    return GetFolderAction(dispatch);
}

export const GetFolderAction = (dispatch) => {
    let data = getData().data;
    dispatch(FolderAction(data));
}


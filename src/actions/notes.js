export const NOTES = 'NOTES'
export const NotesAction = (data) => {
    return {
        type: NOTES,
        data,
    }
}
export const AddNotesAction=data=>dispatch=>{
    global.storage.save({key:'notes',id:global.getId().toString(),rawData:{content:data}});
        return global.storage.getAllDataForKey('notes').then(data1 => {
//   // 返回一个异步操作
// return new Promise(function(resolve, reject) {
//   // ... some code
//   if (/* 异步操作成功 */){
//     resolve(value);
//   } else {
//     reject(error);
//   }
// });
            dispatch(NotesAction(data1));
            //this.setState({ dataSource: this.state.dataSource.cloneWithRows(data) });
        });
}

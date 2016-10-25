export const NOTES = 'NOTES'
export const NotesAction = (data) => {
    console.log('执行了action');
    return {
        type: NOTES,
        data,
    }
}

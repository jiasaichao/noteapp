import Loki from 'lokijs';
import LokiReactNativeAdapter from 'loki-react-native-asyncstorage-adapter';
//import {store} from '../store';
import { AddFolderAction } from '../actions/folder';
import { store } from '../store';
export const GET_DATA = 'GET_DATA'
export const GetDataAction = (callback) => {
    return function () {
        if (global.Loki === undefined) {
            //初始化
            global.Loki = new Loki('loki.json', { adapter: new LokiReactNativeAdapter() });
            global.Loki.loadDatabase({}, () => {
                console.log('loadDatabase', global.Loki);
                //是否以前存储过
                if (!global.Loki.collections.find((value) => value.name === 'notes')) {
                    //默认表
                    /**
                     * 笔记
                     * folderId//属于哪个文件夹
                     * content
                     * createDate
                     * sort
                     * state//状态0未完成，1已完成
                     * endDate//完成时间
                     */
                    global.Loki.addCollection('notes');
                    /**
                     * 文件夹
                     * name
                     * sort
                     */
                    global.Loki.addCollection('folder');
                    store.dispatch(AddFolderAction({ name: '收件箱', sort: 1 }));
                    store.dispatch(AddFolderAction({ name: '购物', sort: 2 }));
                    store.dispatch(AddFolderAction({ name: '想看的电影', sort: 3 }));
                    store.dispatch(AddFolderAction({ name: '愿望列表', sort: 4 }));
                    store.dispatch(AddFolderAction({ name: '工作', sort: 5 }));
                    global.Loki.saveDatabase(callback);
                }
                else {
                    callback();
                }

            });
            //console.log('loki',global.Loki);
        }
        else {
            callback();
        }
    }
}
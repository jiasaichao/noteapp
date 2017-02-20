import Loki from 'lokijs';
import LokiReactNativeAdapter from 'loki-react-native-asyncstorage-adapter';
//import {store} from '../store';
import {AddFolderAction} from '../actions/folder';

export const GET_DATA = 'GET_DATA'
export const GetDataAction = (callback) => {
    return function () {
        if (global.Loki === undefined) {
            //初始化
            global.Loki = new Loki('loki.json', { adapter: new LokiReactNativeAdapter() });
            global.Loki.loadDatabase({}, () => {
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
                     * 
                     */
                    global.Loki.addCollection('notes');
                    /**
                     * 文件夹
                     * name
                     * sort
                     */
                    global.Loki.addCollection('folder');
                    AddFolderAction({name:'收件箱',sort:1});
                    AddFolderAction({name:'购物',sort:2});
                    AddFolderAction({name:'想看的电影',sort:3});
                    AddFolderAction({name:'愿望列表',sort:4});
                    AddFolderAction({name:'工作',sort:2});
                }
                callback();
            });
            //console.log('loki',global.Loki);
        }
    }
}
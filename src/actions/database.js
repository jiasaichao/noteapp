import Loki from 'lokijs';
import LokiReactNativeAdapter from 'loki-react-native-asyncstorage-adapter'

export const GET_DATA = 'GET_DATA'
export const GetDataAction = (callback) => {
    return function () {
        console.log(11111)
        if (global.Loki === undefined) {
            //初始化
            global.Loki = new Loki('loki.json', { adapter: new LokiReactNativeAdapter() });
            global.Loki.loadDatabase({}, () => {
                if (!global.Loki.collections.find((value) => value.name === 'notes')) {
                    //默认表
                    /**
                     * 笔记
                     * content
                     * createDate
                     * sort
                     * 
                     */
                    global.Loki.addCollection('notes');
                }
                callback();
            });
            //console.log('loki',global.Loki);
        }
    }
}
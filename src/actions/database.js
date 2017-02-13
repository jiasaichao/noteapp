import Loki from 'lokijs';
import LokieactNativeAdapter from '../util/loki-react-native-adapter'

export const GET_DATA = 'GET_DATA'
export const GetDataAction = (data) => {
    return function () {
        if (global.Loki === undefined) {
            //初始化
            global.Loki = new Loki('loki.json',{adapter:LokieactNativeAdapter});
            //默认表
            /**
             * 笔记
             * content
             * createDate
             * 
             */
            global.Loki.addCollection('notes');
        }
    }
}
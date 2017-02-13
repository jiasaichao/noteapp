import { AsyncStorage } from 'react-native';
const TAG = "[LokiReactNativeAdapter]";
class LokieactNativeAdapter {
    constructor(options) {
        this.options = options;
    }
    saveDatabase(dbname, dbstring, callback) {
        //console.log(TAG, "saving database");
        AsyncStorage.setItem(
            'database',
            dbstring,
            (error) => {
                if (error) {
                    console.error(TAG, "本地保存数据错误", error);
                } else {
                    callback();
                    //console.error(TAG, "成功", err);
                }
            }
        );
    }

    loadDatabase(dbname, callback) {
        //console.log(TAG, "loading database");
        AsyncStorage.getItem(
            'database',
            (error, result) => {
                if (error) {
                    console.error(TAG, "本地读取数据错误", error);
                } else {
                    if (result.length === 0) {
                        //console.warn(TAG, "couldn't find database");
                        callback(null);
                    }
                    else {
                        callback(contents);
                    }
                }
            }
        );
    }

    deleteDatabase(dbname, callback) {
        AsyncStorage.removeItem(
            'database',
            (error) => {
                if (!error) {
                    callback();
                }
                else {
                    console.error(TAG, "本地删除数据错误", error);
                }
            }
        )
    }
}


export default LokieactNativeAdapter;
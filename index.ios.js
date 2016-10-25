import { AsyncStorage } from 'react-native';
import App from './src/app';
import Storage from 'react-native-storage';
//AsyncStorage.clear();
let storage = new Storage({
  // 最大容量，默认值1000条数据循环存储
  size: 1000,

  // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
  // 如果不指定则数据只会保存在内存中，重启后即丢失
  storageBackend: AsyncStorage,

  // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
  defaultExpires: null,

  // 读写时在内存中缓存数据。默认启用。
  enableCache: true,

  // 如果storage中没有相应数据，或数据已过期，
  // 则会调用相应的sync同步方法，无缝返回最新数据。
  sync: {
    maxid(params) {
      storage.save({
        key: 'maxid',
        rawData: 0
      });
      params.resolve(0);
    }
  }
})
global.storage = storage;

/**加载初始数据 */
global.storage.getBatchData([{ key: 'maxid' }]).then(results => {


  let maxid = results[0];
  global.getId = () => {
    maxid++;
    global.storage.save({
        key: 'maxid',
        rawData: maxid
      });
    return maxid
  }
}).catch(err => {
  console.log(err);
  // switch (err.name) {
  //       case 'NotFoundError':
  //           // TODO;
  //           break;
  //       case 'ExpiredError':
  //           // TODO
  //           break;
  //   }
})
const app = new App();

// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */

// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';

// export default class noteApp extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit index.ios.js
//         </Text>
//         <Text style={styles.instructions}>
//           Press Cmd+R to reload,{'\n'}
//           Cmd+D or shake for dev menu
//         </Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

// AppRegistry.registerComponent('noteApp', () => noteApp);

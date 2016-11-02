
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import Global from './util/global';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { registerScreens } from './containers';
import { store } from './store';
registerScreens(store,Provider);

export default class App {
    constructor() {
        this._populateIcons().then(() => {
            //console.log(this.ios_more);
            // 加载所有图片启动程序
            this.startApp();
        }).catch((error) => {
            //console.error(error);
        });
        // 手动订阅 redux 因为react-redux只适用于react组件，这个是一个普通的类
        // store.subscribe(this.onStoreUpdate.bind(this));
        // store.dispatch(appActions.appInitialized());
    }

    _populateIcons = () => {
        return new Promise((resolve, reject) => {

            Promise.all(
                [
                    Icon.getImageSource('ios-videocam-outline', 30),
                    Icon.getImageSource('ios-videocam', 30),
                    Icon.getImageSource('ios-recording-outline', 30),
                    Icon.getImageSource('ios-recording', 30),
                    Icon.getImageSource('ios-more-outline', 30),
                    Icon.getImageSource('ios-more', 30),
                    Icon.getImageSource('md-settings', 30)
                ]
            ).then((values) => {
                Global.icons.md_settings=values[6];
                resolve(true);
            }).catch((error) => {
                reject(error);
            }).done();
        });
    }

    startApp() {
        let styles = {
            navigatorStyle: {
                navBarBackgroundColor: '#ee735c',
                navBarTextColor: '#fff',
            }
        }
        Navigation.startSingleScreenApp({
            screen: {
                screen: 'home', // unique ID registered with Navigation.registerScreen
                title: '待办事项', // title of the screen as appears in the nav bar (optional)
                //navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
                //navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
            },
            /**侧边抽屉 */
            drawer:{
                left:{
                    screen:'menu'
                },
                disableOpenGesture: true
            }
            // drawer: { // optional, add this if you want a side menu drawer in your app
            //     left: { // optional, define if you want a drawer from the left
            //         screen: 'edit' // unique ID registered with Navigation.registerScreen
            //     },
            //     right: { // optional, define if you want a drawer from the right
            //         screen: 'account' // unique ID registered with Navigation.registerScreen
            //     },
            //     disableOpenGesture: false // optional, can the drawer be opened with a swipe instead of button
            // },
            // passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
            // animationType: 'slide-down' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
        });
    }
}

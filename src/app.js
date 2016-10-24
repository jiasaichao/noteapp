
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { registerScreens } from './containers';
registerScreens();

var settingsIcon;
var settingsOutlineIcon;
var peopleIcon;
var iosNavigateOutline;
var iosNavigate;

export default class App {
    constructor() {
        this.ios_videocam_outline;
        this.ios_videocam;
        this.ios_recording_outline;
        this.ios_recording;
        this.ios_more_outline;
        this.ios_more;
        this._populateIcons().then(() => {
            //console.log(this.ios_more);
            // 加载所有图片启动程序
            this.startApp();
        }).catch((error) => {
            //console.error(error);
        });
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
                    Icon.getImageSource('ios-more', 30)
                ]
            ).then((values) => {
                this.ios_videocam_outline = values[0];
                this.ios_videocam = values[1];
                this.ios_recording_outline = values[2];
                this.ios_recording = values[3];
                this.ios_more_outline = values[4];
                this.ios_more = values[5];
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
                navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
                navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
            },
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

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import * as notesAction from '../actions/notes'
import { connect } from 'react-redux';
import AnimatedOverlay from '../components/animatedoverlay';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TabBarIOS,
    Navigator,
    TouchableHighlight,
    ListView,
    Image,
    Dimensions,
    ActivityIndicatorIOS,
    AlertIOS,
    AsyncStorage,
    Modal,
    TextInput,
    TouchableOpacity,
    Animated,
    Keyboard,
    KeyboardAvoidingView
} from 'react-native';
import dismissKeyboard from 'dismissKeyboard';
import { KeyboardHeight } from '../components/jianpan';
import { Button } from "../components"
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

class AddNotes extends Component {
    constructor(props) {
        super(props);
        this.input = {}
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
        this.state = {
            bounceValue: new Animated.Value(100),
            bottom: 0
        };
    }
    static navigatorStyle = {
        navBarBackgroundColor: '#0cbaa0',
        navBarTextColor: '#fff',
        navBarButtonColor: '#fff'
    };
    static navigatorButtons = {
        leftButtons: [
            {
                title: '取消', // for a textual button, provide the button title (label)
                id: 'cancel', // ID为这个按钮，在onNavigatorEvent（事件）给予帮助了解哪个按钮被点击 
            }
        ],
        rightButtons: [
            {
                title: '收件箱', // for a textual button, provide the button title (label)
                id: 'option', // ID为这个按钮，在onNavigatorEvent（事件）给予帮助了解哪个按钮被点击 
            }
        ]
    };
    _add = () => {
        this.props.dispatch(notesAction.AddNotesAction({ content: this.input.content, createDate: new Date().getTime() }));
        this.props.navigator.dismissModal();
    }

    render() {
        let { folderList, addNotes } = this.props;
        this.props.navigator.setButtons({
            //leftButtons: [], // see "Adding buttons to the navigator" below for format (optional)
            rightButtons: [{
                title: folderList.find((folder) => folder.$loki == addNotes.folderId).name, // for a textual button, provide the button title (label)
                id: 'option', // ID为这个按钮，在onNavigatorEvent（事件）给予帮助了解哪个按钮被点击 
            }], // see "Adding buttons to the navigator" below for format (optional)
            //animated: true // does the change have transition animation or does it happen immediately (optional)
        });
        return (
            <View style={styles.container}>
                <TextInput ref='inputContent' autoCapitalize='none' onChangeText={(text) => { this.input.content = text; }} style={styles.textInput} autoCorrect={false} multiline={true} placeholder="你希望做什么呢？" />
                <Button.Submit onPress={this._add} lable='保存' />
                <KeyboardHeight/>
            </View>
        )
    }
    onNavigatorEvent = (event) => { // this is the onPress handler for the two buttons together
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id == 'cancel') { // this is the same id field from the static navigatorButtons definition
                this.props.navigator.dismissModal();
            }
            if (event.id == 'option') { // this is the same id field from the static navigatorButtons definition
                // let bounceValue = 0
                // console.log('bounceValue', this.state.bounceValue._value)
                // if (this.state.bounceValue._value == 0) {
                //     bounceValue = 100
                // }
                // Animated.spring(                          // 可选的基本动画类型: spring, decay, timing
                //     this.state.bounceValue,                 // 将`bounceValue`值动画化
                //     {
                //         toValue: bounceValue,                         // 将其值以动画的形式改到一个较小值
                //         friction:9
                //     }
                // ).start();
                // this.props.navigator.showModal({
                //     screen: "showDown", // unique ID registered with Navigation.registerScreen
                //     animationType:'none',
                //     navigatorStyle: {
                //         navBarHidden:true,
                //         screenBackgroundColor: 'transparent',
                //         modalPresentationStyle: 'overCurrentContext',
                //     }
                // });
                //Keyboard.dismiss();

                dismissKeyboard();
                //this.refs.inputContent.blur();
                this.props.navigator.showLightBox({
                    screen: 'showDown',
                    animationType: 'none',
                    style: {
                        backgroundBlur: 'none',
                    },
                });
            }
        }
    }
    componentDidMount() {

    }

}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6ff'
        //paddingTop: 23,
    },
    textInput: {
        flex:1,
        paddingLeft: 8,
        paddingTop: 8,
        paddingRight: 8,
        fontSize: 16
    },
    popup: {

    },
    listItem: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        flexDirection: 'row',
        alignItems: 'center',
    },
    touchLable: {
        flex: 1,
        height: 40,
        justifyContent: 'center',
    },
    lable: {
        marginLeft: 8,
    },
})

const mapStateToProps = (state) => {
    return {
        data: state.notes,
        addNotes: state.addNotes,
        folderList: state.folderList
    };
}
// const mapDispatchToProps = (dispatch) =>{
//   return {
//     setSelectedAddress: (address, token) => {
//       dispatch(addressActions.setSelectedAddress(address, token))
//     }
//   }
// }
export default connect(mapStateToProps)(AddNotes);

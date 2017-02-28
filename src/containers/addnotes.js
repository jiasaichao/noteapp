/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import * as notesAction from '../actions/notes'
import { connect } from 'react-redux';
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
    Animated
} from 'react-native';

import { Button } from "../components"

class AddNotes extends Component {
    constructor(props) {
        super(props);
        this.input = {}
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
        this.state = {
            bounceValue: new Animated.Value(100),
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
        return (
            <View style={styles.container}>
                <TextInput autoCapitalize='none' onChangeText={(text) => { this.input.content = text; }} style={styles.textInput} autoCorrect={false} multiline={true} placeholder="你希望做什么呢？" />
                <Button.Submit onPress={this._add} style={{ position: 'absolute', bottom: 16 }} lable='保存' />
                <Animated.View style={{
                    position: 'absolute',
                    height: 100,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: '#666',
                    transform: [{ translateY: this.state.bounceValue }]
                }}>
                    <View style={styles.listItem}>
                        <TouchableOpacity onPress={() => this._pushDetail(data.id)} style={styles.touchLable}><Text style={styles.lable}>收件箱</Text></TouchableOpacity>
                    </View>
                    <View style={styles.listItem}>
                        <TouchableOpacity onPress={() => this._pushDetail(data.id)} style={styles.touchLable}><Text style={styles.lable}>收件箱1</Text></TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        )
    }
    onNavigatorEvent = (event) => { // this is the onPress handler for the two buttons together
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id == 'cancel') { // this is the same id field from the static navigatorButtons definition
                this.props.navigator.dismissModal();
            }
            if (event.id == 'option') { // this is the same id field from the static navigatorButtons definition
                let bounceValue = 0
                console.log('bounceValue', this.state.bounceValue._value)
                if (this.state.bounceValue._value == 0) {
                    bounceValue = 100
                }
                Animated.spring(                          // 可选的基本动画类型: spring, decay, timing
                    this.state.bounceValue,                 // 将`bounceValue`值动画化
                    {
                        toValue: bounceValue,                         // 将其值以动画的形式改到一个较小值
                    }
                ).start();
            }
        }
    }
    componentDidMount() {

    }

}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        //paddingTop: 23,
    },
    textInput: {
        height: 400,
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
        data: state.notes
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

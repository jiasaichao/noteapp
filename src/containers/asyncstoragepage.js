/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {connect} from 'react-redux';
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
} from 'react-native';

import { Button } from "../components"
import {NotesAction} from '../actions/notes'

class AsyncStoragePage extends Component {
    constructor(props) {
        super(props);
        this.input={}
    }
    static navigatorStyle = {
        navBarBackgroundColor: '#0cbaa0',
        navBarTextColor: '#fff',
        navBarButtonColor: '#fff'
    };
    // static navigatorButtons = {
    //     leftButtons: [
    //         {
    //             title: '取消', // for a textual button, provide the button title (label)
    //             id: 'cancel', // ID为这个按钮，在onNavigatorEvent（事件）给予帮助了解哪个按钮被点击 
    //         }
    //     ]
    // };
    _add = () => {
    }
    
    render() {
        return (
            <View style={styles.container}>
                <TextInput autoCapitalize='none' onChangeText={(text) => {  this.input.content = text;} } style={styles.textInput} autoCorrect={false} multiline={true} placeholder="你希望做什么呢？" />
                <Button.Submit onPress={this._add} style={{ position: 'absolute', bottom: 16 }} lable='保存' />
            </View>
        )
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
    }
})

function mapStateToProps(state) {
  return {
    data: state.notes
  };
}
export default connect(mapStateToProps)(AsyncStoragePage);

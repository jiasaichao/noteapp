/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    Dimensions,
    RefreshControl,
    ActivityIndicatorIOS,
    AlertIOS,
    AsyncStorage,
    TextInput,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
class Home extends Component {
    static navigatorStyle = {
        navBarBackgroundColor: '#0cbaa0',
        navBarTextColor: '#fff'
    };

    constructor(props) {
        super(props);
    }
    _add = () => {
        this.props.navigator.showModal({
            screen: "addNotes", // unique ID registered with Navigation.registerScreen
            title: "新内容"
        });
    }
    render() {
        return (
            <View style={styles.root}>
                <TouchableOpacity onPress={this._add} style={{
                    borderRadius: 15,
                    height: 30,
                    width: 30,
                    backgroundColor: '#f74739',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    right: 16,
                    bottom: 16
                }}>
                    <Icon name="md-add" size={25} color="#fff" />
                </TouchableOpacity>
                {/**
                <View style={styles.bottom}>
                    <TextInput autoCorrect={false} multiline={true} style={styles.textInput}></TextInput>
                    <TouchableOpacity><Text>提交</Text></TouchableOpacity>
                </View> 
                 */}
            </View>
        )
    }
}

var styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        //height: height
    },
    bottom: {
        flexDirection: 'row',
        position: 'absolute',
        height: 60,
        left: 0,
        right: 0,
        bottom: 0,
        borderTopWidth: 1,
        borderTopColor: '#cccccc',
        //justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        flex: 1,
        minHeight: 40,
        backgroundColor: '#fff',
        paddingLeft: 8,
        paddingRight: 8,
    }
})

export { Home }

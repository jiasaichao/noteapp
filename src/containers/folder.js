/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
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
import { AddFolderAction } from '../actions/folder'

class Detail extends Component {
    constructor(props) {
        super(props);
        this.input = {}
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
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
        this.props.navigator.showModal({
            screen: "addFolder", // unique ID registered with Navigation.registerScreen
            title: "新清单"
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.menuList}>
                    <Icon name="md-add" size={25} color="#fff" />
                    <Text>今天</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._add} style={styles.menuList}>
                    <Icon name="md-add" size={25} color="#fff" />
                    <Text>添加清单</Text>
                </TouchableOpacity>
                {this.props.data.map((folderV)=><TouchableOpacity key={folderV.name} style={styles.menuList}>
                    <Icon name="md-add" size={25} color="#fff" />
                    <Text>{folderV.name}</Text>
                </TouchableOpacity>)}
            </View>
        )
    }
    onNavigatorEvent = (event) => { // this is the onPress handler for the two buttons together
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id == 'cancel') { // this is the same id field from the static navigatorButtons definition
                this.props.navigator.dismissModal();
            }
        }
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 23,
    },
    menuList: {
        height: 30,
        backgroundColor: '#f74739',
        alignItems: 'center',
        overflow: 'hidden',
        flexDirection: 'row'
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
        data: state.folderList
    };
}
export default connect(mapStateToProps)(Detail);

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

class Menu extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
            <TouchableOpacity onPress={this._pushDetail} style={styles.touch}><Text style={styles.text}>显示数据</Text></TouchableOpacity>
            <TouchableOpacity style={styles.touch}><Text style={styles.text}>清除数据</Text></TouchableOpacity>
            </View>
        )
    }
    _pushDetail = ( title = 'json详情') => {
        //console.log('跳转钱',this.props.navigator);
        this.props.navigator.push({
            screen: 'asyncstoragepage',
            title: title,
            backButtonTitle: '返回',
        });
    }

}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#07a385',
        paddingTop:23,
        //paddingTop: 23,
    },
    touch:{
        height:40,
        justifyContent:'center'
    },
    text:{
        color:'#fff',
        marginLeft:8,
    }

})

function mapStateToProps(state) {
  return {
    data: state.notes
  };
}
export default connect(mapStateToProps)(Menu);

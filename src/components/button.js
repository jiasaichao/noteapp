import React, { Component } from 'react';
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


let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
/**提交按钮
 * lable:按钮名称
 * onPress:点击函数
 * style
 */
export class Submit extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let leftIcon, rightIcon;
        let styles = StyleSheet.create({
            container: {
                height: 40,
                backgroundColor: '#39b54a',
                borderRadius: 5,
                marginLeft: 8,
                marginRight: 8,
                alignItems: 'center',
                justifyContent: 'center',
                width:width-16
            },
            text:{
                color: '#fff',
                fontSize: 16,
            }
        })
        return (
            <TouchableOpacity style={[styles.container, this.props.style]} onPress={this.props.onPress}>
                <Text style={styles.text}>{this.props.lable}</Text>
            </TouchableOpacity>
        );
    }
}
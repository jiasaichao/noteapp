/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {connect} from 'react-redux';
import Global from '../../util/global';
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
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from "../../components"
import {NotesAction} from '../../actions/notes'

class Img extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
            <Text>dddddddd2</Text>
           <TouchableOpacity style={{
                    borderRadius: 15,
                    height: 30,
                    width: 30,
                    backgroundColor: '#f74739',
                }}>
                    <Icon name="md-add" size={25} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={{
                    borderRadius: 15,
                    height: 30,
                    width: 30,
                    backgroundColor: '#f74739',
                }}>
                <Image style={{ width: 38,
    height: 38,}} source={Global.icons.md_settings}/>
                </TouchableOpacity>
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
export default connect(mapStateToProps)(Img);

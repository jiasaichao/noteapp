/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {connect} from 'react-redux';
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
import {NotesAction} from '../actions/notes'

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
class Home extends Component {
    static navigatorStyle = {
        navBarBackgroundColor: '#0cbaa0',
        navBarTextColor: '#fff'
    };

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        };

    }
    componentDidMount() {
        console.log(global.storage);
        global.storage.getAllDataForKey('notes').then(data => {
            this.props.dispatch(NotesAction(data));
            //this.setState({ dataSource: this.state.dataSource.cloneWithRows(data) });
        });
    }
    _renderRow = (data) => {
        return (<View style={styles.listItem}>
            <TouchableOpacity style={styles.checkbox}></TouchableOpacity>
            <Text style={styles.lable}>{data.content}</Text>
        </View>);
    }
    _onRefresh = () => {
        //this.setState({ refreshing: true });
       
    }
    _add = () => {
        this.props.navigator.showModal({
            screen: "addNotes", // unique ID registered with Navigation.registerScreen
            title: "新内容"
        });
    }
    render() {
        console.log('渲染',this.props);
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        let dataSource= ds.cloneWithRows(this.props.data);
        return (
            <View style={styles.root}>
                <ListView
                    dataSource={dataSource}
                    renderRow={this._renderRow}
                    enableEmptySections={true}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                            tintColor='#ff6600'
                            title='拼命加载中...'
                            />
                    }
                    />


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
    listItem: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        alignItems: 'center',
        flexDirection: 'row',
    },
    checkbox: {
        height: 20,
        width: 20,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#000',
        marginLeft: 8,
    },
    lable: {
        marginLeft: 8,
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
function mapStateToProps(state) {
  return {
    data: state.notes
  };
}
export default connect(mapStateToProps)(Home);

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Global from '../util/global';
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
import * as Actions from '../actions/notes'

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
class Home extends Component {
    static navigatorStyle = {
        navBarBackgroundColor: '#0cbaa0',
        navBarTextColor: '#fff',
        navBarButtonColor: '#fff',
    };
    static navigatorButtons = {
        // leftButtons: [{
        //     icon:require('../assets/img/navicon_menu.png'),
        //     //icon:Global.icons.md_settings,
        //     id: 'menu'
        // }],
        rightButtons: [{
            icon:require('../assets/img/md_settings.png'),
            //icon:Global.icons.md_settings,
            id: 'settings'
        }],
    };
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        };
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }
    componentDidMount() {
        this.props.dispatch(Actions.GetAllNotesAction());
    }
    onNavigatorEvent = (event) => { // this is the onPress handler for the two buttons together
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id == 'menu') { // this is the same id field from the static navigatorButtons definition
                this.props.navigator.toggleDrawer({
                    side: 'left',
                    animated: true
                });
            }
            if(event.id=='settings'){
                this.props.navigator.push({
            screen: 'test.img',
            title: 'title',
            backButtonTitle: '返回',
        });
            }
        }
    }
    _renderRow = (data) => {
        return (<View style={styles.listItem}>
            <TouchableOpacity style={styles.checkbox}></TouchableOpacity>
            <TouchableOpacity onPress={() => this._pushDetail(data.id)} style={styles.touchLable}><Text style={styles.lable}>{data.content}</Text></TouchableOpacity>
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
    _pushDetail = (id, title = '待办详情') => {
        this.props.navigator.push({
            screen: 'detail',
            title: title,
            passProps: { id },
            backButtonTitle: '返回',
        });
    }
    render() {
        //console.log('渲染',this.props);
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        let dataSource = ds.cloneWithRows(this.props.data);
        return (
            <View style={styles.container}>
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
                    bottom: 16,
                    overflow:'hidden'
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
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        //height: height
    },
    listItem: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        height: 20,
        width: 20,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#000',
        marginLeft: 8,
    },
    touchLable: {
        flex: 1,
        height: 40,
        justifyContent: 'center',
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

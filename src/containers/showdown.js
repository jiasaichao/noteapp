/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Animated,
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
    Keyboard
} from 'react-native';

import { Button } from "../components"
import { SetAddNotesAction } from '../actions/notes'
import Icon from 'react-native-vector-icons/Ionicons';
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
class ShowDown extends Component {
    constructor(props) {
        super(props);
        this.height = this.props.folderList.length * 40;
        this.state = {
            opacity: new Animated.Value(0),
            height: new Animated.Value(this.height),
        }
    }
    // static navigatorStyle = {
    //     navBarHidden: true,
    //     screenBackgroundColor: 'transparent',
    //     modalPresentationStyle: 'overCurrentContext',
    // }
    render() {
        let { addNotes } = this.props;
        return (
            <View style={styles.container}>
                <Animated.View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: '#000', opacity: this.state.opacity }}>
                    <TouchableOpacity onPress={this.close} style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}></TouchableOpacity>
                </Animated.View>
                <Animated.View onLayout={(e) => {
                    //可以获取到本元素高度
                    //this.sheetheight=e.nativeEvent.layout.height;
                    //console.log('22222',e.nativeEvent.layout);
                }} style={{ position: 'absolute', bottom: 0, backgroundColor: '#fff', transform: [{ translateY: this.state.height }] }}>
                    {this.props.folderList.map((folder) => <TouchableOpacity
                        key={folder.$loki} style={styles.touch}
                        onPress={() => {
                            this.props.setAddNotes(folder.$loki);
                            this.close();
                        }}
                    >
                        <Text style={styles.text}>{folder.name}</Text>
                        <View style={{ flex: 1 }}></View>
                        {addNotes.folderId == folder.$loki ? <Icon name="md-radio-button-on" size={21} color="#0cbaa0" /> : null}
                        <View style={{ height: 1, backgroundColor: '#ccc', position: 'absolute', left: 0, right: 0, bottom: 0 }}></View>
                    </TouchableOpacity>)}
                </Animated.View>

            </View>
        )
    }
    componentDidMount() {
        this.state.opacity.setValue(0);
        Animated.spring(this.state.opacity, { toValue: 0.5 }).start();
        Animated.spring(this.state.height, { toValue: 0, friction: 9 }).start();
    }
    _pushDetail = (title = 'json详情') => {
        //console.log('跳转钱',this.props.navigator);
        this.props.navigator.push({
            screen: 'asyncstoragepage',
            title: title,
            backButtonTitle: '返回',
        });
    }
    close = () => {
        Animated.spring(this.state.opacity, { toValue: 0 }).start();
        Animated.spring(this.state.height, { toValue: this.height, friction: 9 }).start(() => {
            this.props.navigator.dismissLightBox();
            //this.props.navigator.dismissModal({ animationType: 'none' });
        });
    }

}

var styles = StyleSheet.create({
    container: {
        // position:'absolute',
        // left:0,
        // right:0,
        // top:0,
        // bottom:0,
        //flex: 1,
        width,
        height,
        //backgroundColor: '#6ff',
        paddingTop: 23,
        //paddingTop: 23,
    },
    touch: {
        height: 40,
        //justifyContent: 'center',
        alignItems: 'center',
        width,
        flexDirection: 'row',
        paddingLeft: 8,
        paddingRight: 8,
    },
    text: {
        color: '#333',
    }

})

function mapStateToProps(state) {
    return {
        folderList: state.folderList,
        addNotes: state.addNotes
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        setAddNotes: (folderId) => {
            dispatch(SetAddNotesAction({ folderId }))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShowDown);

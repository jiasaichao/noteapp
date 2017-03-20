import React, { Component } from 'react';
import * as notesAction from '../actions/notes'
import { connect } from 'react-redux';
import AnimatedOverlay from '../components/animatedoverlay';
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
    Animated,
    Keyboard,
    LayoutAnimation,
    Platform
} from 'react-native';


//import type EmitterSubscription from 'EmitterSubscription';

// type Rect = {
//   x: number,
//   y: number,
//   width: number,
//   height: number,
// };
// type ScreenRect = {
//   screenX: number,
//   screenY: number,
//   width: number,
//   height: number,
// };
// type KeyboardChangeEvent = {
//   startCoordinates?: ScreenRect,
//   endCoordinates: ScreenRect,
//   duration?: number,
//   easing?: string,
// };
// type LayoutEvent = {
//   nativeEvent: {
//     layout: Rect,
//   }
// };

const viewRef = 'VIEW';

/**
 * It is a component to solve the common problem of views that need to move out of the way of the virtual keyboard.
 * It can automatically adjust either its position or bottom padding based on the position of the keyboard.
 */
export class KeyboardHeight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bottom: 0,
        };
    }
    subscriptions = () => {

    }
    frame = () => {

    }
    relativeKeyboardHeight = (keyboardFrame) => {
        const frame = this.frame;
        if (!frame) {
            return 0;
        }

        const y1 = Math.max(frame.y, keyboardFrame.screenY - this.props.keyboardVerticalOffset);
        const y2 = Math.min(frame.y + frame.height, keyboardFrame.screenY + keyboardFrame.height - this.props.keyboardVerticalOffset);
        return Math.max(y2 - y1, 0);
    }
    onKeyboardChange = (event) => {
        const { duration, easing, endCoordinates, startCoordinates } = event;
        if (duration && easing) {
            LayoutAnimation.configureNext({
                duration: duration,
                update: {
                    duration: duration,
                    type: LayoutAnimation.Types[easing] || 'keyboard',
                },
            });
        }
        if (endCoordinates.screenY > startCoordinates.screenY) {
            this.setState({ bottom: 0 });
        }
        else {
            this.setState({ bottom: endCoordinates.height });
        }
    }
    onLayout = (event) => {
        this.frame = event.nativeEvent.layout;
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextState.bottom === this.state.bottom &&
            this.props.behavior === 'height' &&
            nextProps.behavior === 'height') {
            // If the component rerenders without an internal state change, e.g.
            // triggered by parent component re-rendering, no need for bottom to change.
            nextState.bottom = 0;
        }
    }
    componentWillMount() {
        if (Platform.OS === 'ios') {
            this.subscriptions = [
                Keyboard.addListener('keyboardWillChangeFrame', this.onKeyboardChange),
            ];
        } else {
            this.subscriptions = [
                Keyboard.addListener('keyboardDidHide', this.onKeyboardChange),
                Keyboard.addListener('keyboardDidShow', this.onKeyboardChange),
            ];
        }
    }

    componentWillUnmount() {
        this.subscriptions.forEach((sub) => sub.remove());
    }

    render() {
        const { behavior, children, style, ...props } = this.props;
        return (
            <View ref={viewRef} style={[style, {height:this.state.bottom}]} onLayout={this.onLayout} {...props}>
                {children}
            </View>
        );
    }
}
KeyboardHeight.defaultProps = {
    keyboardVerticalOffset: 0
}


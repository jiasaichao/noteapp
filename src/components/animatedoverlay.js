import React, { Component } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    top: 0,
    left: 0,
    position: 'absolute',
    zIndex:100
  },
});

class AnimatedOverlay extends Component {
  static defaultProps = {
    onPress: () => {},
    pointerEvents: null,
    backgroundColor: '#000',
    opacity: .5,
    duration: 200,
    overlayShow: false,
    initValue: 0,
    onAnimationFinished: () => {},
    style: null,
    children: null,
  }

  constructor(props) {
    super(props);

    this.state = {
      opacity: new Animated.Value(props.initValue),
      overlayShow: props.overlayShow,
    };
  }

  componentDidMount() {
    this.doAnimation();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.overlayShow !== nextProps.overlayShow) {
      this.setState({ overlayShow: nextProps.overlayShow });
    }
  }

  componentDidUpdate() {
    this.doAnimation();
  }

  doAnimation() {
    const { overlayShow, opacity, duration, onAnimationFinished } = this.props;
    const toValue = overlayShow ? opacity : 0;
    Animated.timing(this.state.opacity, {
      toValue,
      duration,
    }).start(() => {
      onAnimationFinished(toValue);
    });
  }

  render() {
    let { pointerEvents } = this.props;
    const { onPress, style, children } = this.props;
    const backgroundColor = { backgroundColor: this.props.backgroundColor };
    const opacity = { opacity: this.state.opacity };
    const size = {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    };

    if (!pointerEvents) pointerEvents = this.state.overlayShow ? 'auto' : 'none';

    return (
      <Animated.View
        pointerEvents={pointerEvents}
        style={[styles.overlay, backgroundColor, size, style, opacity]}
      >
        <TouchableOpacity onPress={onPress} style={[styles.overlay, size]} />
        {children}
      </Animated.View>
    );
  }
}

export default AnimatedOverlay;
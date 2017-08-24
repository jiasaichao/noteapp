import React from 'react';
import {
  AppRegistry,
  Text,
  Button,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
// 先引入这个方法
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';

class HomeScreen extends React.Component {
    static navigationOptions = {
      title: 'Welcome',
    };
    render() {
      const { navigate } = this.props.navigation;
      return (
        <View>
          <Text>Hello, Chat App!</Text>
          <Button
            onPress={() => navigate('Chat')}
            title="Chat with Lucy"
          />
        </View>
      );
    }
  }



class ChatScreen extends React.Component {
    static navigationOptions = {
      title: 'Chat with Lucy',
    };
    render() {
      return (
        <View>
          <Text>Chat with Lucy</Text>
        </View>
      );
    }
  }
  const SimpleApp = StackNavigator({
    Home: { screen: HomeScreen },
    Chat: { screen: ChatScreen },
  },{
    headerMode: 'float',
    transitionConfig:()=>({
        screenInterpolator:CardStackStyleInterpolator.forHorizontal,
    })
  });
export default SimpleApp;
//AppRegistry.registerComponent('SimpleApp', () => SimpleApp);
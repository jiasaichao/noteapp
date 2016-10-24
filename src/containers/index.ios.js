import {Navigation} from 'react-native-navigation';

import {Home} from './home';
import {AddNotes} from './addnotes';
import {Detail} from './detail';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('home', () => Home);
  Navigation.registerComponent('addNotes', () => AddNotes);
  Navigation.registerComponent('detail', () => Detail);
  Navigation.registerComponent('edit', () => Detail);
  Navigation.registerComponent('list', () => Detail);
  Navigation.registerComponent('login', () => Detail);
  Navigation.registerComponent('slider', () => Detail);
}

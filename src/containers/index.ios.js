import {Navigation} from 'react-native-navigation';

import Home from './home';
import AddNotes from './addnotes';
import Detail from './detail';
import Menu from './menu';
import Folder from './folder';
import AddFolder from './addfolder';
import AsyncStoragePage from './asyncstoragepage';


import Img from './test/img';

// register all screens of the app (including internal ones)
export function registerScreens(store,Provider) {
  Navigation.registerComponent('home', () => Home,store,Provider);
  Navigation.registerComponent('addNotes', () => AddNotes,store,Provider);
  Navigation.registerComponent('detail', () => Detail,store,Provider);
  Navigation.registerComponent('menu', () => Folder,store,Provider);
  Navigation.registerComponent('addFolder', () => AddFolder,store,Provider);
  Navigation.registerComponent('asyncstoragepage', () => AsyncStoragePage,store,Provider);
  Navigation.registerComponent('test.img', () => Img,store,Provider);
  Navigation.registerComponent('edit', () => Detail);
  Navigation.registerComponent('list', () => Detail);
  Navigation.registerComponent('login', () => Detail);
  Navigation.registerComponent('slider', () => Detail);
}

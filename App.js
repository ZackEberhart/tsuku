import React from 'react';
import {view } from 'react-easy-state'
import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback, FlatList, Button, BackHandler} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { MenuProvider } from 'react-native-popup-menu';
import Game from './src/Game.js'
import Home from './src/Home.js'
import About from './src/About.js'
import Settings from './src/Settings.js'
import Instructions from './src/Instructions.js'
import appStore from './src/appStore.js'
import { zoomIn, fromRight } from 'react-navigation-transitions';

const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];
 
  if (prevScene
    && prevScene.route.routeName === 'Home'
    && nextScene.route.routeName === 'Game') {
    return zoomIn();
  } 
    return fromRight();

}

const AppNavigator = createStackNavigator(
  {
    Game: Game,
    Home: Home,
    About: About,
    Settings: Settings,
    Instructions: Instructions,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: 'Tsuku!',

      headerStyle: {
        backgroundColor: '#0D1B1E',
      },
      headerTintColor: '#FBFFFE',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
    headerLayoutPreset:'center',
    transitionConfig: (nav) => handleCustomTransition(nav)
  }
);

const AppContainer = createAppContainer(AppNavigator);


export default class App extends React.Component {
  constructor(props){
    super(props);
    appStore.fetchSettings()
  }


  render() {
    return(
      <MenuProvider backHandler={true}>
        <AppContainer />
      </MenuProvider>
    ) 
  }
}
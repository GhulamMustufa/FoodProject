import React, { Component } from "react";
import { Text, View } from "react-native";
import SplashScreen from "./app/screens/SplashScreen";
import HomeScreen from "./app/screens/BottomTabNavigator";
import SelectionScreen from "./app/screens/SelectionScreen";

import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator
} from "react-navigation";

const RootStack = createStackNavigator(
  {
    SplashScreen: { screen: SplashScreen },
    HomeScreen: {
      screen: HomeScreen,
      navigationOption: {
        title: "Protein App"
      }
    },
    SelectionScreen: {
      screen: SelectionScreen,
      navigationOption: {
        title: "selection"
      }
    }
  },
  {
    headerMode: "screen",
    defaultNavigationOptions: {
        header: null,
      headerStyle: {
        backgroundColor: "#38352C",
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: "#fff",
      headerLeft: null
    }
  }
);

const AppContainer = createAppContainer(RootStack);

export class AppNavigator extends Component {
  render() {
    return <AppContainer />;
  }
}

export default AppNavigator;

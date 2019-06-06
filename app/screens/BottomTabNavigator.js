import React, { Component } from "react";
import { Image } from "react-native";
import {
  createBottomTabNavigator,
  createAppContainer,
  createMaterialTopTabNavigator
} from "react-navigation";
import HomeScreen from "./HomeScreen";
import SavedScreen from "./SavedListScreen";
import MoreScreen from "./MoreScreen";

import { Text, View, TouchableOpacity } from "react-native";
// import Icon from 'react-native-vector-icons/Ionicons'
import { Icon } from "react-native-elements";
// import Ionicons from 'react-native-ionicons';

const TabNavigator = createMaterialTopTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: "Search",
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require("../assets/search.png")}
            style={{ margin: 5, width: 25, height: 25 }}
          />
        )
      }
    },
    Saved: {
      screen: SavedScreen,
      navigationOptions: {
        tabBarLabel: "Saved",
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require("../assets/saved.png")}
            style={{ margin: 5, width: 25, height: 25 }}
          />
        )
      }
    }
    // More:{screen: MoreScreen,
    //   navigationOptions:{
    //     tabBarLabel:'More',
    //     tabBarIcon:({tintColor})=>(
    //       <Image source={require('../assets/more.png')} style={{margin:5,width:25,height:25}}/>
    //     )
    //       }
    // },
  },
  {
    tabBarPosition: "top",
    swipeEnabled: true,
    animationEnabled: false,
    tabBarOptions: {
      activeTintColor: "#FFFFFF",
      inactiveTintColor: "#F8F8F8",
      style: {
        backgroundColor: "#38352C"
      },
      labelStyle: {
        textAlign: "center"
      },
      indicatorStyle: {
        borderBottomColor: "#87B56A",
        borderBottomWidth: 5
      }
    }
  }
);

export default createAppContainer(TabNavigator);

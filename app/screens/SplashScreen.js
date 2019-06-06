//import liraries
"use strict";
import React, { Component } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  AsyncStorage,
  ImageBackground,
  Image,
  StatusBar,
  Platform,
  AppState
} from "react-native";

// create a component
const { width, height } = Dimensions.get("window");

class SplashScreen extends Component {
  static navigationOptions = {
    header: null
  };
  componentDidMount() {
    this.didFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      payload => {
        setTimeout(() => {
          this.props.navigation.navigate("HomeScreen");
        }, 900);
      }
    );
  }
  constructor(props) {
    super(props);
    this.navigate();
  }
  navigate = () => {
    setTimeout(() => {
      this.props.navigation.navigate("HomeScreen");
    }, 900);
  };
  hideNavigation() {
    HideNavigationBar();
  }

  showNavigation() {
    ShowNavigationBar();
  }

  componentWillUnmount = () => {
    this.didBlurSubscription.remove();
  };

  render() {
    return (
      <ImageBackground
        key={this.state}
        source={require("../assets/splash.png")}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      />
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  welcome: {
    marginLeft: 10,
    marginRight: 10,
    alignSelf: "center",
    // flexWrap: 'nowrap',
    width: width * 0.8,
    height: 250,
    // marginHorizontal: width * 0.1,
    justifyContent: "center"
  }
});

//make this component available to the app
export default SplashScreen;

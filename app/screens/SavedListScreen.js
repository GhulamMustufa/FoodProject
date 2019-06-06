import React from "react";
import {
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import { SearchBar } from "react-native-elements";
import { Icon, Header } from "react-native-elements";
import Color from "../Constants/Colors";
// import { Picker, DatePicker } from 'react-native-wheel-datepicker';
import AsyncStorage from "@react-native-community/async-storage";
// import {
//   AdMobBanner,
//   AdMobInterstitial,
//   PublisherBanner,
//   AdMobRewarded
// } from "react-native-admob";
// import ScrollPicker from 'react-native-wheel-scroll-picker';
const { width, height } = Dimensions.get("window");

class SavedListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      totalgram: 0
    };
  }
  componentDidMount() {
    this.didFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      payload => {
        this.getSavedList();
      }
    );
  }
  getSavedList = async () => {
    try {
      let value = await AsyncStorage.getItem("SavedList");
      let value2 = await AsyncStorage.getItem("totalgram");
      if (value != null) {
        this.setState({
          dataSource: JSON.parse(value),
          totalgram: value2
        });
      } else {
        alert("Nothing in saved list");
      }
    } catch (error) {
      alert("Nothing in saved list");
      // Error saving data
    }
  };
  componentWillUnmount() {
    this.didFocusSubscription.remove();
  }
  renderItem = item => {
    return (
      <View style={{ marginHorizontal: 0 }}>
        <LinearGradient
          colors={["#4c669f", "#3b5998", "#192f6a"]}
          style={{
            marginTop: 5,
            paddingLeft: 15,
            paddingRight: 15,
            paddingBottom: 5,
            paddingTop: 5,
            borderRadius: 15,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 15,
              width: "70%",
              borderRadius: 10
            }}
            numberOfLines={3}
          >
            {item.food}
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 15,
              width: "30%",
              backgroundColor: "darkgreen",
              borderRadius: 10,
              borderWidth: 2,
              borderColor: "grey",
              fontWeight: "bold",
              alignSelf: "center",
              fontFamily: "Gill Sans",
              textAlign: "center"
            }}
          >
            {item.protein}g
          </Text>
        </LinearGradient>
        {/* <View
          style={{
            flex: 1,
            borderBottomColor: "#cfd0d3",
            borderBottomWidth: 0.5,
            marginTop: 15
          }}
        /> */}
      </View>
    );
  };
  render() {
    return (
      <View style={{ backgroundColor: Color.AppTheme, flex: 1 }}>
        <View
          style={{
            flexDirection: "column",
            backgroundColor: Color.AppTheme,
            height: height,
            justifyContent: "flex-start"
          }}
        >
          {/* <AdMobBanner
            adSize="smartBannerPortrait"
            adUnitID="ca-app-pub-3940256099942544/6300978111"
            onAdFailedToLoad={error => console.error(error)}
          /> */}
          <View
            style={{
              height: 100,
              alignSelf: "center",
              borderShadow: "green",
              borderColor: "green",
              marginTop: 10,
              width: 100,
              borderRadius: 40,
              borderWidth: 1
            }}
          >
            <Image
              source={require("../assets/logo.png")}
              style={{ alignSelf: "center", width: 80, height: 80 }}
            />
          </View>
          <View style={{ backgroundColor: Color.ListBackground }}>
            <FlatList
              data={this.state.dataSource}
              style={{}}
              renderItem={({ item }) => this.renderItem(item)}
            />
          </View>
          <LinearGradient
            colors={["#4c669f", "#3b5998", "#192f6a"]}
            style={{
              marginTop: 30,
              paddingLeft: 15,
              paddingRight: 15,
              borderRadius: 5,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Gill Sans",
                textAlign: "center",
                margin: 5,
                color: "#ffffff",
                backgroundColor: "transparent"
              }}
            >
              Total amount,gram
            </Text>
            <Text
              style={{
                fontSize: 18,
                borderRadius: 40,
                borderWidth: 2,
                borderColor: "grey",
                fontWeight: "bold",
                width: 100,
                alignSelf: "center",
                fontFamily: "Gill Sans",
                textAlign: "center",
                margin: 5,
                color: "#ffffff",
                backgroundColor: "darkgreen"
              }}
            >
              {this.state.totalgram} g
            </Text>
          </LinearGradient>
        </View>
      </View>
    );
  }
}

export default SavedListScreen;

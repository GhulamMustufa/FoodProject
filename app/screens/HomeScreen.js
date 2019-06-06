import React from "react";
import {
  View,
  Text,
  Dimensions,
  Platform,
  FlatList,
  Image,
  TouchableOpacity,
  BackHandler,
  KeyboardAvoidingView,
  KeyboardAwareScrollView,
  ScrollView
} from "react-native";

import { SearchBar } from "react-native-elements";
import Color from "../Constants/Colors";
import Data from "../ItemsData/Data";
import SharedData from "../Constants/SharedData";
import AsyncStorage from "@react-native-community/async-storage";
import LinearGradient from "react-native-linear-gradient";

// import {
//   AdMobBanner,
//   AdMobInterstitial,
//   PublisherBanner,
//   AdMobRewarded
// } from "react-native-admob";
import { Row } from "native-base";

const { width, height } = Dimensions.get("window");
let totalholder;

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      totalgram: "",
      dataSource: Data.Data
    };
    this.arrayholder = this.state.dataSource;
    //  this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      BackAndroid.exitApp(); // works best when the goBack is async
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }
  renderItem = item => {
    return (
      <TouchableOpacity
        style={{ marginHorizontal: width * 0.1 }}
        onPress={() => {
          SharedData.selected_item = item;
          this.props.navigation.navigate("SelectionScreen");
        }}
      >
        <LinearGradient
          colors={["#4c669f", "#192f6a"]}
          style={{
            marginTop: 5,
            paddingLeft: 15,
            paddingRight: 15,
            paddingTop: 5,
            paddingBottom: 5,
            borderRadius: 15,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <Text
            style={{ color: "white", fontSize: 15, width: width * 0.55 }}
            numberOfLines={2}
          >
            {item.Description}
          </Text>
        </LinearGradient>

        {/* <View
          style={{
            flex: 1,
            borderBottomColor: "#cfd0d3",
            borderBottomWidth: 0.5,
            marginTop: 5
          }}
        /> */}
      </TouchableOpacity>
    );
  };
  SearchFilterFunction = text => {
    //passing the inserted text in textinput
    const newData = this.arrayholder.filter(function(item) {
      //applying filter for the inserted text in search bar
      const itemData = item.Description
        ? item.Description.toUpperCase()
        : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      search: text
    });
  };
  componentDidMount() {
    this.didFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      payload => {
        // alert('reloaded')
        this.setState({
          totalgram: SharedData.total_gram
        });
      }
    );
  }
  componentWillUnmount() {
    this.didFocusSubscription.remove();
  }
  render() {
    const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;

    return (
      <ScrollView
        style={{
          flex: 1,
          flexDirection: "column",
          height: height,
          backgroundColor: Color.AppTheme
        }}
      >
        {/* <AdMobBanner
          adSize="smartBannerPortrait"
          adUnitID="ca-app-pub-3940256099942544/6300978111"
          onAdFailedToLoad={error => console.error(error)}
        /> */}
        <View style={{ backgroundColor: Color.AppTheme }}>
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
          <LinearGradient
            colors={["#4c669f", "#3b5998", "#192f6a"]}
            style={{
              marginTop: 5,
              paddingLeft: 15,
              paddingRight: 15,
              paddingTop: 5,
              paddingBottom: 5,
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
              onPress={() => {
                if (SharedData.total_gram === 0) {
                  alert("Please select first!");
                } else {
                  totalholder = SharedData.total_gram;
                  this.saveList();
                  this.setState({ totalgram: 0 });
                  SharedData.total_gram = 0;
                  SharedData.selected_item = "";
                  SharedData.selected_set_list = [];
                }
              }}
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
          <View style={{ backgroundColor: Color.AppTheme, marginBottom: 10 }} />
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior="padding"
            keyboardVerticalOffset="2"
          >
            <SearchBar
              onChangeText={text => this.SearchFilterFunction(text)}
              onClear={text => this.SearchFilterFunction("")}
              placeholder="Search Here..."
              containerStyle={{
                backgroundColor: Color.AppTheme,
                borderRadius: 5,
                borderBottomColor: "transparent",
                borderTopColor: "transparent"
              }}
              inputStyle={{ fontSize: 18 }}
              round
              value={this.state.search}
              searchIcon={{ size: 25 }}
            />
          </KeyboardAvoidingView>
        </View>
        <View style={{ backgroundColor: Color.ListBackground }}>
          <FlatList
            data={this.state.dataSource}
            style={{}}
            renderItem={({ item }) => this.renderItem(item)}
          />
        </View>
      </ScrollView>
    );
  }
  saveList = async () => {
    try {
      await AsyncStorage.setItem(
        "SavedList",
        JSON.stringify(SharedData.selected_set_list)
      );
      await AsyncStorage.setItem("totalgram", JSON.stringify(totalholder));
      alert("List Saved Successfully!");
    } catch (error) {
      alert("Error in saving list please try again!");
      // Error saving data
    }
  };
}

export default HomeScreen;

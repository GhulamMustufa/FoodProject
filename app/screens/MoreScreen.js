import React from "react";
import { Text, View, Dimensions, Image, Linking } from "react-native";
import Color from "../Constants/Colors";


const { width, height } = Dimensions.get("window");

class SavedScreen extends React.Component {
  render() {
    return (
      <View
        style={{
          flexDirection: "column",
          backgroundColor: Color.AppTheme,
          height: height
        }}
      >
        
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: height * 0.3
          }}
        >
          <Text style={{ fontSize: 32, alignSelf: "center", color: "white" }}>
            Check out link
          </Text>
          <Text onPress={this._goToURL} style={{ fontSize: 40, color: "blue" }}>
            www.lovlundinnovation.com
          </Text>
          <Text style={{ fontSize: 32, alignSelf: "center", color: "white" }}>
            for our other fun products
          </Text>
        </View>
      </View>
    );
  }
  _goToURL() {
    // const { url } = this.props;
    Linking.canOpenURL("http://www.lovlundinnovation.com").then(supported => {
      if (supported) {
        Linking.openURL("http://www.lovlundinnovation.com");
      } else {
        console.log("Don't know how to open URI: ");
      }
    });
  }
}

export default SavedScreen;

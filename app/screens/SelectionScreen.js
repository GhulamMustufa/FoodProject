import React from "react";
import { Text, View, Dimensions, Image, TouchableOpacity } from "react-native";
import { SearchBar } from "react-native-elements";
import { Icon, Header } from "react-native-elements";
import Color from "../Constants/Colors";

// import { Picker, DatePicker } from 'react-native-wheel-datepicker';
// import ScrollPicker from 'react-native-picker-scrollview';
// import ScrollPicker from 'react-native-wheel-scroll-picker';
// import { WheelPicker } from 'react-native-wheel-picker-android'
const { width, height } = Dimensions.get("window");
import SharedData from "../Constants/SharedData";
import Picker from "react-native-wheel-picker";
var PickerItem = Picker.Item;
let ProteinList = [];
class SelectionScreen extends React.Component {
  static navigationOption = {
    title: "selection"
  };
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      valuebypc: "",
      selectedItem: "",
      HouseholdList: [
        "1/4",
        "1/2",
        "3/4",
        "1",
        "1 1/4",
        "1 1/2",
        "1 3/4",
        "2",
        "2 1/4",
        "2 1/2",
        "2 3/4",
        "3",
        "3 1/4",
        "3 1/2",
        "3 3/4",
        "4",
        "4 1/4",
        "4 1/2",
        "4 3/4",
        "5",
        "5 1/4",
        "5 1/2",
        "5 3/4",
        "6",
        "6 1/4",
        "6 1/2",
        "6 3/4",
        "7",
        "7 1/4",
        "7 1/2",
        "7 3/4"
      ],
      ProteinList: ["130g", "140g", "150g", "160g", "170g", "180g"],
      selectedhouseItem: "4"
    };
    for (var i = 0; i < 200; i++) {
      var a = i + 1;
      ProteinList.push(a.toString());
    }
  }
  onItemSelected = selectedItem => {
    this.setState({ selectedItem });
  };

  onPress = () => {
    this.setState({ selectedItem: 3 });
  };
  onPickerSelect(index) {
    this.setState({
      selectedItem: ProteinList[index]
    });
  }
  onPickerHouseSelect(index) {
    this.setState({
      selectedhouseItem: this.state.HouseholdList[index]
    });
  }
  render() {
    return (
      <View>
        <Header
          barStyle="light-content"
          // leftComponent={{ icon: 'home', color: '#fff' , onPress: () => this.props.navigation.goBack() }}
          centerComponent={{
            text: "Selection",
            style: { color: "#fff", fontSize: 20, marginBottom: 10 }
          }}
          containerStyle={{
            backgroundColor: Color.AppTheme,
            height: 60
          }}
        />
        <View
          style={{
            flexDirection: "column",
            backgroundColor: Color.AppTheme,
            height: height
          }}
        >
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
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <View>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  color: "white",
                  alignSelf: "center",
                  marginBottom: 15
                }}
              >
                Gram
              </Text>
              {/* <Picker
            style={{ width:150,margin:15 ,backgroundColor:'#c6cad1'}}
            selectedValue={'150g'}
            pickerData={['130g', '140g', '150g', '160g', '170g', '180g']}
            onValueChange={value => this.setState({ value })}
          /> */}
              <View
                style={{
                  width: 150,
                  height: 180,
                  borderColor: "#c6cad1",
                  borderRadius: 10,
                  backgroundColor: "transparent",
                  opacity: 0.9,
                  borderWidth: 5,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  elevation: 1
                }}
              >
                <Picker
                  style={{
                    width: 150,
                    height: 180,
                    borderColor: "#c6cad1",
                    borderRadius: 10,
                    backgroundColor: "transparent"
                  }}
                  selectedValue={this.state.selectedItem}
                  itemStyle={{ color: "white", fontSize: 26 }}
                  onValueChange={index => this.onPickerSelect(index)}
                >
                  {ProteinList.map((value, i) => (
                    <PickerItem label={value} value={i} />
                  ))}
                </Picker>
              </View>
              <TouchableOpacity
                style={{
                  borderColor: "#c6cad1",
                  borderRadius: 10,
                  borderWidth: 2.5,
                  width: width * 0.3,
                  justifyContent: "center",
                  height: height * 0.05,
                  marginLeft: 20,
                  marginTop: 15,
                  backgroundColor: "green"
                }}
                onPress={() => {
                  if (this.state.selectedItem != "") {
                    SharedData.total_gram =
                      SharedData.total_gram + parseInt(this.state.selectedItem);
                    SharedData.selected_set_list.push({
                      food: SharedData.selected_item.Description,
                      protein: parseInt(this.state.selectedItem)
                    });
                    // alert(parseFloat(SharedData.selected_item.protein))
                    SharedData.selected_amount = this.state.value;
                    this.props.navigation.navigate("HomeScreen");

                    // this.props.navigation.navigate.goback()
                  }
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: "#c6cad1",
                    alignSelf: "center",
                    fontWeight: "bold"
                  }}
                >
                  SELECT
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  color: "white",
                  alignSelf: "center",
                  marginBottom: 15
                }}
              >
                Household
              </Text>
              {/* <WheelPicker 
        selectedItem={this.state.selectedItem}
        data={['130g', '140g', '150g', '160g', '170g', '180g']} 
,        onItemSelected={this.onItemSelected}/> */}
              <View
                style={{
                  width: 150,
                  height: 180,
                  borderColor: "#c6cad1",
                  borderRadius: 10,
                  backgroundColor: "transparent",
                  opacity: 0.9,
                  borderWidth: 5,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  elevation: 1
                }}
              >
                <Picker
                  style={{
                    width: 150,
                    height: 180,
                    borderColor: "#c6cad1",
                    borderRadius: 10,
                    backgroundColor: "transparent"
                  }}
                  selectedValue={this.state.selectedhouseItem}
                  itemStyle={{ color: "white", fontSize: 26 }}
                  onValueChange={index => this.onPickerHouseSelect(index)}
                >
                  {this.state.HouseholdList.map((value, i) => (
                    <PickerItem label={"" + value} value={i} />
                  ))}
                </Picker>
              </View>

              <TouchableOpacity
                style={{
                  borderColor: "#c6cad1",
                  borderRadius: 10,
                  borderWidth: 2.5,
                  width: width * 0.3,
                  justifyContent: "center",
                  height: height * 0.05,
                  marginLeft: 20,
                  marginTop: 15,
                  backgroundColor: "green"
                }}
                onPress={() => {
                  let selectedvalue = 0;
                  if (this.state.selectedhouseItem === "1/4") {
                    selectedvalue = 1 / 4;
                  } else if (this.state.selectedhouseItem === "1/2") {
                    selectedvalue = 3 / 4;
                  } else if (this.state.selectedhouseItem === "3/4") {
                    selectedvalue = 1 / 4;
                  } else if (this.state.selectedhouseItem === "1") {
                    selectedvalue = 1;
                  } else if (this.state.selectedhouseItem === "1 1/4") {
                    selectedvalue = 1 / 4;
                  } else if (this.state.selectedhouseItem === "1 1/2") {
                    selectedvalue = (1 * 1) / 2;
                  } else if (this.state.selectedhouseItem === "1 3/4") {
                    selectedvalue = 3 / 4;
                  } else if (this.state.selectedhouseItem === "2") {
                    selectedvalue = 2;
                  } else if (this.state.selectedhouseItem === "2 1/4") {
                    selectedvalue = (2 * 1) / 4;
                  } else if (this.state.selectedhouseItem === "2 1/2") {
                    selectedvalue = (2 * 1) / 2;
                  } else if (this.state.selectedhouseItem === "2 3/4") {
                    selectedvalue = (2 * 3) / 4;
                  } else if (this.state.selectedhouseItem === "3") {
                    selectedvalue = 3;
                  } else if (this.state.selectedhouseItem === "3 1/4") {
                    selectedvalue = (3 * 1) / 4;
                  } else if (this.state.selectedhouseItem === "3 1/2") {
                    selectedvalue = (3 * 1) / 2;
                  } else if (this.state.selectedhouseItem === "3 3/4") {
                    selectedvalue = (3 * 3) / 4;
                  } else if (this.state.selectedhouseItem === "4") {
                    selectedvalue = 4;
                  } else if (this.state.selectedhouseItem === "4 1/4") {
                    selectedvalue = (4 * 1) / 4;
                  } else if (this.state.selectedhouseItem === "4 1/2") {
                    selectedvalue = (4 * 1) / 2;
                  } else if (this.state.selectedhouseItem === "4 3/4") {
                    selectedvalue = (4 * 3) / 4;
                  } else if (this.state.selectedhouseItem === "5") {
                    selectedvalue = 5;
                  } else if (this.state.selectedhouseItem === "5 1/4") {
                    selectedvalue = (5 * 1) / 4;
                  } else if (this.state.selectedhouseItem === "5 1/2") {
                    selectedvalue = (5 * 1) / 2;
                  } else if (this.state.selectedhouseItem === "5 3/4") {
                    selectedvalue = (5 * 3) / 4;
                  } else if (this.state.selectedhouseItem === "6") {
                    selectedvalue = 6;
                  } else if (this.state.selectedhouseItem === "6 1/4") {
                    selectedvalue = (6 * 1) / 4;
                  } else if (this.state.selectedhouseItem === "6 1/2") {
                    selectedvalue = (6 * 1) / 2;
                  } else if (this.state.selectedhouseItem === "6 3/4") {
                    selectedvalue = (6 * 3) / 4;
                  } else if (this.state.selectedhouseItem === "7") {
                    selectedvalue = 7;
                  } else if (this.state.selectedhouseItem === "7 1/4") {
                    selectedvalue = (7 * 1) / 4;
                  } else if (this.state.selectedhouseItem === "7 1/2") {
                    selectedvalue = (7 * 1) / 2;
                  } else if (this.state.selectedhouseItem === "7 3/4") {
                    selectedvalue = (7 * 3) / 4;
                  }
                  let a = SharedData.selected_item.Protein * selectedvalue;
                  SharedData.total_gram = SharedData.total_gram + a;
                  SharedData.selected_amount = this.state.selectedhouseItem;
                  SharedData.selected_set_list.push({
                    food: SharedData.selected_item.Description,
                    protein: parseFloat(a)
                  });
                  this.props.navigation.navigate("HomeScreen");
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: "#c6cad1",
                    alignSelf: "center",
                    fontWeight: "bold"
                  }}
                >
                  SELECT
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default SelectionScreen;

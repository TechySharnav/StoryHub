import React, { Component } from "react";
import { View, Image, TextInput, Text } from "react-native";
import { Header } from "react-native-elements";

export default class readScreen extends Component {
  render() {
    return (
      <View>
        <Header
          backgroundColor="#ef4b4c"
          centerComponent={{
            text: "Read a Story",
            style: { color: "#e9ebeb", fontSize: 18 },
          }}
        ></Header>
      </View>
    );
  }
}

import React, { Component } from "react";
import {
  View,
  Image,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Header } from "react-native-elements";

export default class writeScreen extends Component {
  render() {
    return (
      <View>
        <Header
          backgroundColor="#ef4b4c"
          centerComponent={{
            text: "Write a Story",
            style: { color: "#e9ebeb", fontSize: 18 },
          }}
        ></Header>
        <TextInput
          style={[styles.textInputStyle, { marginTop: 37 }]}
          placeholder="Enter Story Title"
        ></TextInput>
        <TextInput
          style={[styles.textInputStyle, { marginTop: 25 }]}
          placeholder="Enter Name of Author"
        ></TextInput>
        <TextInput
          multiline={true}
          style={[
            styles.textInputStyle,
            { marginTop: 25, minHeight: "38%", textAlignVertical: "top" },
          ]}
          placeholder="Write Your Story"
        ></TextInput>
        <TouchableOpacity style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInputStyle: {
    backgroundColor: "#e9ebeb",
    padding: 10,
    margin: 5,
    width: "95%",
    borderColor: "#43506c",
    borderWidth: 2,
    alignSelf: "center",
  },
  buttonStyle: {
    backgroundColor: "#3d619B",
    borderRadius: 6,
    width: "40%",
    alignSelf: "center",
    padding: 10,
    marginTop: 12,
  },
  buttonTextStyle: {
    textTransform: "uppercase",
    color: "#e9e9eb",
    textAlign: "center",
  },
});

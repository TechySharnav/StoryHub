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
import db from "../config.js";

export default class writeScreen extends Component {
  constructor() {
    super();

    this.state = {
      storyTitle: "",
      storyAuthor: "",
      story: "",
    };
  }

  submitStory = async () => {
    console.log("Submitting");
    db.collection("stories").add({
      storyTitle: this.state.storyTitle,
      storyAuthor: this.state.storyAuthor,
      story: this.state.story,
    });
  };

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
          onChangeText={(txt) => {
            this.setState({ storyTitle: txt });
          }}
          style={[styles.textInputStyle, { marginTop: 37 }]}
          placeholder="Enter Story Title"
        ></TextInput>
        <TextInput
          onChangeText={(txt) => {
            this.setState({ storyAuthor: txt });
          }}
          style={[styles.textInputStyle, { marginTop: 25 }]}
          placeholder="Enter Name of Author"
        ></TextInput>
        <TextInput
          onChangeText={(txt) => {
            this.setState({ story: txt });
          }}
          multiline={true}
          style={[
            styles.textInputStyle,
            { marginTop: 25, minHeight: "38%", textAlignVertical: "top" },
          ]}
          placeholder="Write Your Story"
        ></TextInput>
        <TouchableOpacity onPress={this.submitStory} style={styles.buttonStyle}>
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

import React, { Component } from "react";
import {
  View,
  Image,
  TextInput,
  Text,
  ScrollView,
  Keyboard,
} from "react-native";
import { Header, SearchBar } from "react-native-elements";
import db from "../config.js";

export default class readScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTxt: "",
      allStories: [{ story: "", storyTitle: "", storyAuthor: "" }],
      funcCalled: false,
      filterStories: [],
      keyboardVisible: false,
    };
  }

  componentDidMount() {
    this.getStories();
    setTimeout(() => this.setState({ funcCalled: true }), 2000);
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        this.setState({ keyboardVisible: true });
      }
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        this.setState({ keyboardVisible: false });
      }
    );
  }

  getStories = async () => {
    var storyRef = await db
      .collection("stories")
      .where("story", "!=", "")
      .get();

    storyRef.docs.map(async (doc) => {
      var storyData = await doc.data();
      this.state.allStories.push(storyData);
      console.log(this.state.allStories);
    });
    this.state.allStories.shift();
  };

  render() {
    if (this.state.searchTxt === "") {
      return (
        <View>
          <Header
            backgroundColor="#ef4b4c"
            centerComponent={{
              text: "Read a Story",
              style: { color: "#e9ebeb", fontSize: 18 },
            }}
          ></Header>
          <SearchBar
            containerStyle={{
              backgroundColor: "transparent",
              borderWidth: 0,
            }}
            round={true}
            placeholder="Type Here..."
            onChangeText={(txt) => this.setState({ searchTxt: txt.trim() })}
            value={this.state.searchTxt}
            lightTheme={true}
            inputContainerStyle={{
              borderColor: "#3d619B",
              borderWidth: 2,
              borderBottomColor: "#3d619b",
              marginTop: -1,
            }}
            inputStyle={{ padding: -10 }}
          />
          <ScrollView
            style={{
              height: this.state.keyboardVisible
                ? this.state.allStories.length * 39 + 30
                : this.state.allStories.length * 100,
            }}
          >
            {this.state.allStories.map((story) => (
              <View
                key={story.storyAuthor + story.storyTitle + ""}
                style={{
                  backgroundColor: "#e9ebeb",
                  borderColor: "#43506c",
                  borderWidth: 2,
                  borderRadius: 6,
                  marginTop: 15,
                  marginLeft: 5,
                  maxWidth: "97%",
                }}
              >
                <Text
                  style={{ marginLeft: 5, fontWeight: "bold", fontSize: 20 }}
                >
                  {story.storyTitle}
                </Text>
                <Text
                  style={{ marginLeft: 5, fontWeight: "normal", fontSize: 12 }}
                >
                  Author: {story.storyAuthor}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      );
    } else {
      var allStories = this.state.allStories;
      searchTxt = this.state.searchTxt;

      for (var i = 0; i < allStories.length; i++) {
        if (
          allStories[i].storyAuthor
            .toLowerCase()
            .includes(searchTxt.toLowerCase()) ||
          allStories[i].storyTitle
            .toLowerCase()
            .includes(searchTxt.toLowerCase())
        ) {
          this.state.filterStories.push(allStories[i]);
        }
        this.state.filterStories = [...new Set(this.state.filterStories)];
      }
      return (
        <View>
          <Header
            backgroundColor="#ef4b4c"
            centerComponent={{
              text: "Read a Story",
              style: { color: "#e9ebeb", fontSize: 18 },
            }}
          ></Header>
          <SearchBar
            containerStyle={{
              backgroundColor: "transparent",
              borderWidth: 0,
            }}
            round={true}
            placeholder="Type Here..."
            onChangeText={(txt) =>
              this.setState({ searchTxt: txt.trim(), filterStories: [] })
            }
            value={this.state.searchTxt}
            lightTheme={true}
            inputContainerStyle={{
              borderColor: "#3d619B",
              borderWidth: 2,
              borderBottomColor: "#3d619b",
              marginTop: -1,
            }}
            inputStyle={{ padding: -10 }}
          />

          <ScrollView
            style={{
              height:
                this.state.keyboardVisible &&
                this.state.filterStories.length > 2
                  ? this.state.filterStories.length * 50 + 25
                  : this.state.filterStories.length * 80 + 30,
            }}
          >
            {this.state.filterStories.length === 0 ? (
              <Text
                style={{
                  fontSize: 12,
                  textAlign: "center",
                  fontStyle: "italic",
                }}
              >
                No story or author exists with this name
              </Text>
            ) : (
              this.state.filterStories.map((story) => (
                <View
                  key={story.storyAuthor + story.storyTitle + ""}
                  style={{
                    backgroundColor: "#e9ebeb",
                    borderColor: "#43506c",
                    borderWidth: 2,
                    borderRadius: 6,
                    marginTop: 15,
                    marginLeft: 5,
                    maxWidth: "97%",
                  }}
                >
                  <Text
                    style={{
                      marginLeft: 5,
                      fontWeight: "bold",
                      fontSize: 20,
                    }}
                  >
                    {story.storyTitle}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 5,
                      fontWeight: "normal",
                      fontSize: 12,
                    }}
                  >
                    Author: {story.storyAuthor}
                  </Text>
                </View>
              ))
            )}
          </ScrollView>
        </View>
      );
    }
  }
}

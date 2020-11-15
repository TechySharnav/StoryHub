import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { Header, SearchBar } from "react-native-elements";
import db from "../config.js";

export default class readScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTxt: "",
      allStories: [],
      funcCalled: false,
      filterStories: [],
      lastVisibleStory: null,
    };
  }

  async componentDidMount() {
    await this.getStories();
    setTimeout(() => this.setState({ funcCalled: true }), 2000);
  }

  getStories = async () => {
    var storyRef = await db
      .collection("stories")
      .where("story", "!=", "")
      .limit(6)
      .get();

    storyRef.docs.map(async (doc) => {
      var storyData = await doc.data();
      this.state.allStories.push(storyData);
      this.setState({ lastVisibleStory: doc });
      console.log(this.state.allStories);
    });
    this.state.allStories = [...new Set(this.state.allStories)];
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
            placeholder="Search Stories/Authors"
            onChangeText={(txt) => this.setState({ searchTxt: txt.trim() })}
            value={this.state.searchTxt}
            lightTheme={true}
            inputContainerStyle={{
              borderColor: "#3d619B",
              borderWidth: 2,
              borderBottomColor: "#3d619b",
              marginTop: -1,
            }}
            inputStyle={{ padding: -10, fontSize: 15 }}
          />
          <FlatList
            contentContainerStyle={{ paddingBottom: 165 }}
            data={this.state.allStories}
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: "#e9ebeb",
                  borderColor: "#43506c",
                  borderWidth: 2,
                  borderRadius: 6,
                  marginTop: 15,
                  marginLeft: 7,
                  maxWidth: "97%",
                }}
              >
                <Text
                  style={{ fontWeight: "bold", marginLeft: 5, fontSize: 20 }}
                >
                  {item.storyTitle}
                </Text>
                <Text style={{ marginLeft: 5, fontSize: 12 }}>
                  Author: {item.storyAuthor}
                </Text>
              </View>
            )}
            keyExtractor={(item, index) => {
              item.storyAuthor + index.toString();
            }}
          />
        </View>
      );
    } else {
      var allStories = this.state.allStories;
      var searchTxt = this.state.searchTxt;

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
            placeholder="Search Stories/Authors"
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
            inputStyle={{ padding: -10, fontSize: 15 }}
          />

          <FlatList
            contentContainerStyle={{ paddingBottom: 165 }}
            data={this.state.filterStories}
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: "#e9ebeb",
                  borderColor: "#43506c",
                  borderWidth: 2,
                  borderRadius: 6,
                  marginTop: 15,
                  marginLeft: 7,
                  maxWidth: "97%",
                }}
              >
                <Text
                  style={{ fontWeight: "bold", marginLeft: 5, fontSize: 20 }}
                >
                  {item.storyTitle}
                </Text>
                <Text style={{ marginLeft: 5, fontSize: 12 }}>
                  Author: {item.storyAuthor}
                </Text>
              </View>
            )}
            keyExtractor={(item, index) => {
              item.storyAuthor + index.toString();
            }}
          />
        </View>
      );
    }
  }
}

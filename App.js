import React, { Component } from "react";
import writeScreen from "./screen/writeScreen";
import readScreen from "./screen/readScreen";
import LoginScreen from "./screen/LoginScreen";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Image } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

const Tab = createBottomTabNavigator(
  {
    Read: { screen: readScreen },
    Write: { screen: writeScreen },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: () => {
        let imgName;
        const routeName = navigation.state.routeName;

        if (routeName === "Read") {
          imgName = require("./assets/read.png");
        } else if (routeName === "Write") {
          imgName = require("./assets/write.png");
        }

        // You can return any component that you like here!
        return (
          <Image
            style={{ width: 25, height: 25, marginTop: 2 }}
            source={imgName}
          />
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray",
    },
  }
);
const AppNavigator = createSwitchNavigator({
  Login: { screen: LoginScreen },
  Tab: { screen: Tab },
});

const AppContainer = createAppContainer(AppNavigator);

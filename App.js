import React, { Component } from "react";
import writeScreen from "./screen/writeScreen";
import readScreen from "./screen/readScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({}) => {
              let imgName;

              if (route.name === "Read Story") {
                imgName = require("./assets/read.png");
              } else if (route.name === "Write Story") {
                imgName = require("./assets/write.png");
              }

              // You can return any component that you like here!
              return (
                <Image style={{ width: 20, height: 20 }} source={imgName} />
              );
            },
          })}
          tabBarOptions={{
            activeTintColor: "tomato",
            inactiveTintColor: "gray",
          }}
        >
          <Tab.Screen name="Read Story" component={readScreen} />
          <Tab.Screen name="Write Story" component={writeScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

import React, { Component } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import { Header } from "react-native-elements";
import firebase from "firebase";

export default class LoginScreen extends Component {
  constructor() {
    super();
    this.state = { emailID: "", password: "" };
  }

  submitDetails = async () => {
    var email = this.state.emailID;
    var pwd = this.state.password;

    if (email && pwd) {
      try {
        var response = await firebase
          .auth()
          .signInWithEmailAndPassword(email, pwd);
        if (response) {
          this.props.navigation.navigate("Read");
        }
      } catch (err) {
        console.log(err.code);
        switch (err.code) {
          case "auth/user-not-found":
            Alert.alert("User Doesn't Exist");
            break;
          case "auth/wrong-password":
            Alert.alert("Incorrect Email or Password");
            break;
        }
      }
    } else {
      Alert.alert("Enter Email and Password");
    }
  };

  render() {
    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <KeyboardAvoidingView style={{ flex: 1 }} enabled>
          <View style={{ display: "flex", justifyContent: "flex-end" }}>
            <Header
              backgroundColor="#ef4b4c"
              centerComponent={{
                text: "Login",
                style: { color: "#e9ebeb", fontSize: 18 },
              }}
            ></Header>
            <Image
              source={require("../assets/login.png")}
              style={{
                width: 200,
                height: 200,
                resizeMode: "contain",
                alignSelf: "center",
                marginTop: 40,
              }}
            />
            <TextInput
              style={{
                backgroundColor: "#e9ebeb",
                padding: 10,
                margin: 5,
                width: "95%",
                borderColor: "#43506c",
                borderWidth: 2,
                alignSelf: "center",
                marginTop: 50,
              }}
              keyboardType="email-address"
              placeholder="Enter Email"
              onChangeText={(txt) => this.setState({ emailID: txt })}
              value={this.state.emailID}
            ></TextInput>

            <TextInput
              style={{
                backgroundColor: "#e9ebeb",
                padding: 10,
                margin: 5,
                width: "95%",
                borderColor: "#43506c",
                borderWidth: 2,
                alignSelf: "center",
                marginTop: 25,
              }}
              secureTextEntry={true}
              placeholder="Enter Password"
              onChangeText={(txt) => this.setState({ password: txt })}
              value={this.state.password}
            ></TextInput>

            <TouchableOpacity
              style={{
                backgroundColor: "#3d619B",
                borderRadius: 6,
                width: "40%",
                alignSelf: "center",
                padding: 10,
                marginTop: 30,
                marginBottom: 20,
              }}
              onPress={this.submitDetails}
            >
              <Text
                style={{
                  textTransform: "uppercase",
                  color: "#e9e9eb",
                  textAlign: "center",
                }}
              >
                SUBMIT
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

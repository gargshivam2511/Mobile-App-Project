import React, { useState } from "react";
import { LogBox } from "react-native";
import { StyleSheet, Text, View, Dimensions } from "react-native";
// import gpxParser from "gpxparser";
import MapComponent from "./MapComponent";
import UserComponent from "./UserComponent";

const windowHeight = Dimensions.get("window").height;

export default function App() {
  LogBox.ignoreLogs(["Setting a timer for a long period of time"]);
  return (
    <View>
      <UserComponent />
      <MapComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: windowHeight,
  },
});

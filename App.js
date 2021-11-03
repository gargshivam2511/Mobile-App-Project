import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
// import gpxParser from "gpxparser";
import MapComponent from "./MapComponent";

import CommonStyleSheet from "./CommonStyleSheet";

const windowHeight = Dimensions.get("window").height;

export default function App() {
  // var track = parseGpx(gpxContent);
  return (
    <View>
      <MapComponent />

      {/* <Text style={CommonStyleSheet.map}></Text> */}
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

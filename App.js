import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapView from "react-native-maps";

const windowHeight = Dimensions.get("window").height;

export default function App() {
	return (
		<View style={styles.container}>
			<MapView
				style={styles.map}
				initialRegion={{
					latitude: 49.25,
					longitude: -123.1,
					latitudeDelta: 0.2,
					longitudeDelta: 0.2
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
	map: {
		...StyleSheet.absoluteFillObject,
		height: windowHeight
	}
});

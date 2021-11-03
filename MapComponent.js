import React, { Component } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView from "react-native-maps";
import { parseGpx } from "./GpxParser";
import TrackComponent from "./TrackComponent";
import UploadComponent from "./UploadComponent";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default class MapComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tracks: []
		};
	}

	renderTracks() {
		console.log(
			"Displaying the following tracks: " +
				this.state.tracks.map((track) => track.name)
		);

		return this.state.tracks.map((track) => (
			<TrackComponent key={track.name} track={track} />
		));
	}

	render() {
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
				>
					<UploadComponent
						onFileRead={(data) => {
							parseGpx(data, (tracks) => {
								//Copy the state.tracks and then add the new track(s)
								var tracksCopy = [...this.state.tracks];
								tracks.forEach((track) => {
									tracksCopy.push(track);
								});

								//Remove duplicate tracks based on track name
								tracksCopy = tracksCopy.filter((track, index) => {
									return (
										tracksCopy.findIndex((otherTrack) => {
											return otherTrack.name == track.name;
										}) == index
									);
								});

								this.setState({ tracks: tracksCopy });
							});
						}}
					/>

					{this.renderTracks()}
				</MapView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center"
	},
	map: {
		...StyleSheet.absoluteFillObject,
		height: windowHeight
	}
});

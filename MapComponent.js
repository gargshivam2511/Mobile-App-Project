import React, { Component } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { parseGpx } from "./GpxParser";
import TrackComponent from "./TrackComponent";
import UploadComponent from "./UploadComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default class MapComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tracks: [],
			selectedTrackName: ""
		};

		AsyncStorage.getItem("tracks").then((tracks) => {
			if (tracks != null) {
				console.log(tracks);
				this.setState({ tracks: JSON.parse(tracks) });
			}
		});
	}

	renderTracks() {
		console.log(
			"Displaying the following tracks: " +
				this.state.tracks.map((track) => track.name)
		);

		console.log(this.state.tracks);

		return this.state.tracks.map((track) => {
			let shouldHighlight = track.name == this.state.selectedTrackName;
			return (
				<TrackComponent
					key={track.name}
					track={track}
					color={shouldHighlight ? "red" : "blue"}
					onPress={() => {
						this.setState({ selectedTrackName: track.name });
					}}
				/>
			);
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<MapView
					provider={PROVIDER_GOOGLE}
					style={styles.map}
					showsUserLocation={true}
					//TODO: Replace with current location
					initialRegion={{
						latitude: 49.25,
						longitude: -123.1,
						latitudeDelta: 0.2,
						longitudeDelta: 0.2
					}}
				>
					{this.renderTracks()}
				</MapView>

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

							try {
								AsyncStorage.setItem("tracks", JSON.stringify(tracksCopy)).then(
									() => {}
								);
							} catch (e) {
								console.log(e);
							}
						});
					}}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {},
	map: {
		...StyleSheet.absoluteFillObject,
		height: windowHeight
	}
});

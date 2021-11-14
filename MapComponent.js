import React, { Component } from "react";
import {
	View,
	StyleSheet,
	Dimensions,
	Alert,
	ActivityIndicator
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { parseGpx, Track, Segment, Point } from "./GpxParser";
import TrackComponent from "./TrackComponent";
import UploadComponent from "./UploadComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import SaveTrackComponent from "./SaveTrackComponent";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default class MapComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tracks: [],
			selectedTrackName: "",
			isTracking: false,
			userTrack: new Track("user track", [new Segment([])]),
			trackNameDialogVisible: false,
			isLoading: true
		};

		AsyncStorage.getItem("tracks").then((tracks) => {
			if (tracks != null) {
				this.setState({ tracks: JSON.parse(tracks) });
			}
		});

		Location.requestForegroundPermissionsAsync()
			.then((response) => {
				Location.getLastKnownPositionAsync()
					.then((location) => {
						this.initialMapRegion = {
							latitude: location.coords.latitude,
							longitude: location.coords.longitude,
							latitudeDelta: 0.2,
							longitudeDelta: 0.2
						};
					})
					.catch(() => {})
					.finally(() => {
						this.setState({ isLoading: false });
					});
			})
			.catch(() => {
				this.setState({ isLoading: false });
			});
	}

	startTracking = async () => {
		this.setState({ isTracking: true });
		this.tracker = await Location.watchPositionAsync(
			{
				accuracy: Location.Accuracy.Highest,
				showsBackgroundLocationIndicator: true,
				timeInterval: 5000,
				activityType: Location.ActivityType.Fitness,
				distanceInterval: 20
			},
			(location) => {
				var trackCopy = this.state.userTrack;
				trackCopy.segments[0].points.push(
					new Point(location.coords.latitude, location.coords.longitude)
				);
				this.setState({ userTrack: trackCopy });
			}
		);
	};

	stopTracking() {
		this.tracker.remove();
	}

	renderTracks() {
		console.log(
			"Displaying the following tracks: " +
				this.state.tracks.map((track) => track.name)
		);

		return this.state.tracks.map((track) => {
			let shouldHighlight = track.name == this.state.selectedTrackName;
			return (
				<TrackComponent
					key={track.name}
					track={track}
					color={shouldHighlight ? "red" : "blue"}
					onPress={() => {
						this.setState({ selectedTrackName: track.name });
						Alert.alert(
							track.name,
							"Do you want to delete " + track.name + "?",
							[
								{
									text: "Yes",
									onPress: () => {
										this.removeTrack(track);
									}
								},
								{ text: "No" }
							]
						);
					}}
				/>
			);
		});
	}

	addTracks(tracks) {
		//Copy the state.tracks and then add the new track(s)
		var tracksCopy = [...this.state.tracks];
		tracks.forEach((track) => {
			tracksCopy.push(track);
		});

		console.log(tracksCopy);
		//Remove duplicate tracks based on track name
		tracksCopy = tracksCopy.filter((track, index) => {
			return (
				tracksCopy.findIndex((otherTrack) => {
					return otherTrack.name == track.name;
				}) == index
			);
		});

		this.updateTracksState(tracksCopy);
	}

	removeTrack(track) {
		var tracksCopy = [...this.state.tracks];
		tracksCopy.forEach((trackToCheck, index) => {
			if (track.name === trackToCheck.name) {
				tracksCopy.splice(index, 1);
			}
		});

		this.updateTracksState(tracksCopy);
	}

	//Update state and write to storage
	updateTracksState(newTracks) {
		this.setState({ tracks: newTracks });
		try {
			AsyncStorage.setItem("tracks", JSON.stringify(newTracks)).then(() => {});
		} catch (e) {
			console.log(e);
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.toolbar}>
					<UploadComponent
						onFileRead={(data) => {
							parseGpx(data, (tracks) => {
								this.addTracks(tracks);
							});
						}}
					/>

					<SaveTrackComponent
						onStart={() => {
							this.startTracking();
						}}
						onDiscard={() => {
							this.stopTracking();
							this.setState({
								userTrack: new Track("user track", [new Segment([])])
							});
						}}
						onSave={(trackName) => {
							this.stopTracking();
							let trackToSave = this.state.userTrack;
							trackToSave.name = trackName;
							this.addTracks([trackToSave]);
							this.setState({
								userTrack: new Track("user track", [new Segment([])])
							});
						}}
					/>
				</View>

				<View style={styles.mapContainer}>
					{this.state.isLoading && (
						<ActivityIndicator size="large" color="rgb(54, 54, 54)" />
					)}
					{!this.state.isLoading && (
						//isLoading check allows location to be obtained prior to initial map rendering
						//so that the initial map region is set correctly
						<MapView
							style={styles.map}
							provider={PROVIDER_GOOGLE}
							showsUserLocation={true}
							mapType="standard"
							showsMyLocationButton={false}
							initialRegion={this.initialMapRegion}
						>
							{this.renderTracks()}

							<TrackComponent
								key={this.state.userTrack.name}
								track={this.state.userTrack}
								color="green"
							/>
						</MapView>
					)}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		height: windowHeight,
		flexDirection: "column-reverse"
	},
	mapContainer: {
		flex: 1,
		justifyContent: "center"
	},
	map: {
		flex: 1
	},
	toolbar: {
		backgroundColor: "rgb(54, 54, 54)",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center"
	}
});

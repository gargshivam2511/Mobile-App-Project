import React, { Component } from "react";
import { Alert } from "react-native";
import { Polyline } from "react-native-maps";

export default class TrackComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Polyline
				coordinates={this.props.track.segments[0].points.map(function (point) {
					return {
						latitude: point.lat,
						longitude: point.lon
					};
				})}
				strokeColor={this.props.color}
				strokeWidth={4}
				tappable={true}
				onPress={() => {
					this.props.onPress();
					Alert.alert("Track pressed", "Track Name: " + this.props.track.name);
				}}
			/>
		);
	}
}

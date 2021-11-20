import React, { Component } from "react";
import { View } from "react-native";
import { Polyline } from "react-native-maps";

export default class TrackComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		let coordinates = this.props.track.segments[0].points.map(function (point) {
			return {
				latitude: point.lat,
				longitude: point.lon
			};
		});
		return (
			<View>
				<Polyline
					coordinates={coordinates}
					strokeColor="white"
					strokeWidth={8}
					tappable={true}
					onPress={() => {
						this.props.onPress();
					}}
				/>
				<Polyline
					coordinates={coordinates}
					strokeColor={this.props.color}
					strokeWidth={4}
				/>
			</View>
		);
	}
}

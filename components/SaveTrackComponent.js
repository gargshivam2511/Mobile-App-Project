import React, { Component } from "react";
import { View, Text, TouchableHighlight, Alert } from "react-native";
import Dialog from "react-native-dialog";
import * as Location from "expo-location";
import ToolbarButtonComponent from "./ToolbarButtonComponent";
import StartButtonSvg from "../assets/start-button.svg";
import StopButtonSvg from "../assets/stop-button.svg";

export default class SaveTrackComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			step: saveSteps.notTracking,
			trackName: ""
		};
	}

	render() {
		return (
			<View>
				{this.state.step === saveSteps.notTracking && (
					<ToolbarButtonComponent
						text="Start"
						svg={StartButtonSvg}
						onPress={() => {
							Location.getForegroundPermissionsAsync().then((response) => {
								if (response.granted) {
									this.setState({ step: saveSteps.tracking });
									this.props.onStart();
								} else {
									Alert.alert(
										"Cannot Track Location",
										"Location tracking must be enabled in the app settings"
									);
								}
							});
						}}
					/>
				)}

				{this.state.step !== saveSteps.notTracking && (
					<ToolbarButtonComponent
						text="Stop"
						svg={StopButtonSvg}
						onPress={() => {
							this.setState({ step: saveSteps.askForSave });
						}}
					/>
				)}

				{this.state.step === saveSteps.askForSave && (
					<Dialog.Container visible={true}>
						<Dialog.Title>Do you want to save this track?</Dialog.Title>
						<Dialog.Description />
						<Dialog.Button
							label="Cancel"
							onPress={() => {
								this.setState({ step: saveSteps.tracking });
							}}
						/>
						<Dialog.Button
							label="Discard"
							onPress={() => {
								this.setState({ step: saveSteps.notTracking });
								this.props.onDiscard();
							}}
						/>
						<Dialog.Button
							label="Save"
							onPress={() => {
								this.setState({ step: saveSteps.enterTrackName });
							}}
						/>
					</Dialog.Container>
				)}

				{this.state.step === saveSteps.enterTrackName && (
					<Dialog.Container visible={true}>
						<Dialog.Title>Enter a name for the track</Dialog.Title>
						<Dialog.Input
							onChangeText={(trackName) => {
								this.setState({ trackName: trackName });
							}}
						/>
						<Dialog.Button
							label="Cancel"
							onPress={() => {
								this.setState({ step: saveSteps.askForSave, trackName: "" });
							}}
						/>
						<Dialog.Button
							label="Save"
							disabled={this.state.trackName === ""}
							onPress={() => {
								let trackName = this.state.trackName;
								this.setState({ step: saveSteps.notTracking, trackName: "" });
								this.props.onSave(trackName);
							}}
						/>
					</Dialog.Container>
				)}
			</View>
		);
	}
}

const saveSteps = {
	notTracking: 1,
	tracking: 2,
	askForSave: 3,
	enterTrackName: 4
};

import React, { Component } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import Dialog from "react-native-dialog";
import CommonStyleSheet from "./CommonStyleSheet";
import StartButtonSvg from "./assets/start-button.svg";
import StopButtonSvg from "./assets/stop-button.svg"; // SVG File

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
				{this.state.step == saveSteps.notTracking && (
					<TouchableHighlight
						style={CommonStyleSheet.button}
						onPress={() => {
							this.setState({ step: saveSteps.tracking });
							this.props.onStart();
						}}
					>
						<View>
							<StartButtonSvg
								width={40}
								height={40}
								style={[CommonStyleSheet.svgButton, { margin: 10 }]}
							/>
							<Text style={CommonStyleSheet.buttonText}>Start</Text>
						</View>
					</TouchableHighlight>
				)}

				{this.state.step == saveSteps.tracking && (
					<TouchableHighlight
						style={CommonStyleSheet.button}
						onPress={() => {
							this.setState({ step: saveSteps.askForSave });
						}}
					>
						<View>
							<StopButtonSvg
								width={40}
								height={40}
								style={[CommonStyleSheet.svgButton, { margin: 10 }]}
							/>
							<Text style={CommonStyleSheet.buttonText}>Start</Text>
						</View>
					</TouchableHighlight>
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

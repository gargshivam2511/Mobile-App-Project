import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import Dialog from "react-native-dialog";

export default class SaveTrackComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			step: saveSteps.notTracking,
			trackName: ""
		};
	}

	render() {
		console.log(this.state.step);
		return (
			<View>
				{this.state.step == saveSteps.notTracking && (
					<TouchableHighlight
						underlayColor="rgba(0, 0, 0, 0)"
						onPress={() => {
							this.setState({ step: saveSteps.tracking });
							this.props.onStart();
						}}
					>
						<Text style={styles.buttonText}>Start</Text>
					</TouchableHighlight>
				)}

				{this.state.step == saveSteps.tracking && (
					<TouchableHighlight
						underlayColor="rgba(0, 0, 0, 0)"
						onPress={() => {
							this.setState({ step: saveSteps.askForSave });
						}}
					>
						<Text style={styles.buttonText}>Stop</Text>
					</TouchableHighlight>
				)}

				{this.state.step === saveSteps.askForSave && (
					<Dialog.Container visible={true}>
						<Dialog.Title>Do you want to save this track?</Dialog.Title>
						<Dialog.Description />
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

const styles = StyleSheet.create({
	buttonText: {
		fontSize: 24,
		padding: 5,
		marginTop: 20,
		marginLeft: 5,
		backgroundColor: "rgba(0, 0, 0, 0.60)",
		color: "white",
		textAlign: "center",
		maxWidth: "20%"
	}
});

const saveSteps = {
	notTracking: 1,
	tracking: 2,
	askForSave: 3,
	enterTrackName: 4
};

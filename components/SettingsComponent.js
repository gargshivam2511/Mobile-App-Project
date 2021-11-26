import React, { Component } from "react";
import {
	Modal,
	Text,
	TouchableWithoutFeedback,
	View,
	StyleSheet
} from "react-native";
import Slider from "@react-native-community/slider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CommonStyleSheet, { foregroundColor } from "../CommonStyleSheet";
import ToolbarButtonComponent from "./ToolbarButtonComponent";
import SettingsButtonSvg from "../assets/settings-button.svg";
import { Settings } from "../Settings";

const maxDistanceThreshold = 2000;
const distanceStepSize = 10;

export default class SettingsComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			settings: {
				distanceThreshold: Settings.distanceThreshold.get()
			}
		};

		Settings.distanceThreshold.addListener((value) => {
			console.log("Distance Threshold changed to " + value);
			let settings = this.state.settings;

			settings.distanceThreshold = value;
			this.setState({
				settings
			});
		});
	}

	render() {
		return (
			<View>
				<ToolbarButtonComponent
					text="Settings"
					svg={SettingsButtonSvg}
					onPress={() => {
						this.setState({ modal: !this.state.modal });
					}}
				/>

				{this.state.modal && (
					<Modal
						animationType="slide"
						onRequestClose={() => {
							this.setState({ modal: false });
						}}
					>
						<View style={styles.container}>
							<View style={styles.closeContainer}>
								<TouchableWithoutFeedback
									onPress={() => {
										this.setState({ modal: false });
									}}
								>
									<Text style={styles.closeButton}>Close</Text>
								</TouchableWithoutFeedback>
							</View>
							<View style={styles.titleContainer}>
								<Text style={styles.title}>Settings</Text>
							</View>
							<View style={styles.settingsContainer}>
								<Text style={styles.settingHeader}>
									Notification Distance Threshold
								</Text>
								<View style={styles.sliderContainer}>
									<Slider
										style={styles.slider}
										value={this.state.settings.distanceThreshold}
										step={distanceStepSize}
										minimumValue={0}
										maximumValue={maxDistanceThreshold}
										minimumTrackTintColor={foregroundColor}
										maximumTrackTintColor="white"
										thumbTintColor="white"
										onValueChange={(value) => {
											let settings = this.state.settings;
											settings.distanceThreshold = Math.round(value);
											this.setState({
												settings
											});
										}}
										onSlidingComplete={(value) => {
											Settings.distanceThreshold.set(value);
										}}
									/>
									<Text
										style={[
											CommonStyleSheet.text,
											{ width: "15%", textAlign: "right" }
										]}
									>
										{this.state.settings.distanceThreshold}m
									</Text>
								</View>
							</View>
						</View>
					</Modal>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		...CommonStyleSheet.container,
		flex: 1
	},
	closeContainer: {
		flexDirection: "row-reverse"
	},
	closeButton: {
		...CommonStyleSheet.text,
		textAlign: "center",
		textAlignVertical: "center",
		marginTop: 10,
		marginRight: 10,
		padding: 5
	},
	titleContainer: {
		marginHorizontal: 30
	},
	title: {
		...CommonStyleSheet.text,
		fontWeight: "bold",
		fontSize: 24
	},
	settingsContainer: {
		flex: 1,
		margin: 30
	},
	settingHeader: {
		...CommonStyleSheet.text,
		fontWeight: "bold",
		fontSize: 18
	},
	sliderContainer: {
		flexDirection: "row",
		alignItems: "center"
	},
	slider: {
		flex: 1
	}
});

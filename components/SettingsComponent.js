import React, { Component } from "react";
import {
	Modal,
	Text,
	TouchableHighlight,
	View,
	StyleSheet
} from "react-native";
import Slider from "@react-native-community/slider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CommonStyleSheet from "../CommonStyleSheet";
import ToolbarButtonComponent from "./ToolbarButtonComponent";
import SettingsButtonSvg from "../assets/settings-button.svg";

const maxDistanceThreshold = 2000;
const distanceStepSize = 10;

export default class SettingsComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			settings: {
				distanceThreshold: 1000
			}
		};

		//Read all settings from AsyncStorage
		let distanceThresholdPromise = AsyncStorage.getItem("distanceThreshold");
		Promise.all([distanceThresholdPromise]).then((values) => {
			let settings = this.state.settings;

			let distanceThreshold = parseInt(values[0]);
			if (distanceThreshold != null) {
				settings.distanceThreshold = distanceThreshold;
			}

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
						onRequestClose={() => {
							this.setState({ modal: false });
						}}
					>
						<View style={styles.modalContainer}>
							<TouchableHighlight
								onPress={() => {
									this.setState({ modal: false });
								}}
							>
								<Text>Close</Text>
							</TouchableHighlight>
							<Slider
								style={{ width: 200, height: 40 }}
								value={this.state.settings.distanceThreshold}
								step={distanceStepSize}
								minimumValue={0}
								maximumValue={maxDistanceThreshold}
								minimumTrackTintColor="black"
								maximumTrackTintColor="black"
								onValueChange={(value) => {
									let settings = this.state.settings;
									settings.distanceThreshold = Math.round(value);
									this.setState({
										settings
									});
								}}
								onSlidingComplete={(value) => {
									AsyncStorage.setItem(
										"distanceThreshold",
										this.state.settings.distanceThreshold.toString()
									);
								}}
							/>
							<Text>{this.state.settings.distanceThreshold}m</Text>
						</View>
					</Modal>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	}
});

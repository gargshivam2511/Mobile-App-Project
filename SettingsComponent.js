import React, { Component } from "react";
import { Modal, Text, TouchableHighlight, View } from "react-native";
import CommonStyleSheet from "./CommonStyleSheet";
import SettingsButtonSvg from "./assets/settings-button.svg";

export default class SettingsComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<TouchableHighlight
				style={CommonStyleSheet.button}
				onPress={() => this.props.onClick()}
			>
				<View>
					<SettingsButtonSvg
						width={25}
						height={25}
						style={[CommonStyleSheet.svgButton]}
					/>
					<Text style={CommonStyleSheet.buttonText}>Settings</Text>
				</View>
			</TouchableHighlight>
		);
	}
}

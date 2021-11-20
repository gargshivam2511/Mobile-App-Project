import React, { Component } from "react";
import { Text, TouchableHighlight, View } from "react-native";
import CommonStyleSheet from "../CommonStyleSheet";

export default class ToolbarButtonComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<TouchableHighlight
				style={CommonStyleSheet.button}
				onPress={this.props.onPress}
			>
				<View>
					{
						<this.props.svg
							style={CommonStyleSheet.svgButton}
							width={25}
							height={25}
						/>
					}
					<Text style={CommonStyleSheet.buttonText}>{this.props.text}</Text>
				</View>
			</TouchableHighlight>
		);
	}
}

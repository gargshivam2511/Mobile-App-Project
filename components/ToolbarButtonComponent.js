import React, { Component } from "react";
import { Text, TouchableHighlight, View, StyleSheet } from "react-native";
import CommonStyleSheet, { foregroundColor } from "../CommonStyleSheet";

export default class ToolbarButtonComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<TouchableHighlight
				underlayColor="rgba(0,0,0,0)"
				style={styles.button}
				onPress={this.props.onPress}
			>
				<View>
					{<this.props.svg style={styles.svgButton} width={25} height={25} />}
					<Text style={styles.buttonText}>{this.props.text}</Text>
				</View>
			</TouchableHighlight>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		marginVertical: 4,
		borderRadius: 5,
		backgroundColor: "rgba(0, 0, 0, 0)",
		alignSelf: "center"
	},
	buttonText: {
		...CommonStyleSheet.text,
		fontSize: 12,
		textAlign: "center"
	},
	svgButton: {
		color: foregroundColor,
		alignSelf: "center"
	}
});

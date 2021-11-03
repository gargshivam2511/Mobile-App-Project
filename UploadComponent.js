import React, { Component } from "react";
import { Text, TouchableHighlight, StyleSheet } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

export default class UploadComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	selectFile() {
		DocumentPicker.getDocumentAsync().then((result) => {
			FileSystem.readAsStringAsync(result.uri).then((fileResult) => {
				this.props.onFileRead(fileResult);
			});
		});
	}

	render() {
		return (
			<TouchableHighlight onPress={() => this.selectFile()}>
				<Text style={styles.buttonText}>+</Text>
			</TouchableHighlight>
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
		maxWidth: "10%"
	}
});

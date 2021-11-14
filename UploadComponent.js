import React, { Component } from "react";
import { Text, TouchableHighlight, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import CommonStyleSheet from "./CommonStyleSheet";
import UploadButtonSvg from "./assets/upload-button.svg"; // SVG File

export default class UploadComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	selectFile() {
		DocumentPicker.getDocumentAsync().then((result) => {
			FileSystem.readAsStringAsync(result.uri)
				.then((fileResult) => {
					this.props.onFileRead(fileResult);
				})
				.catch((error) => {
					//Do nothing
					//This seems to happen when you cancel out of file select
				});
		});
	}

	render() {
		return (
			<TouchableHighlight
				style={CommonStyleSheet.button}
				onPress={() => this.selectFile()}
			>
				<View>
					<UploadButtonSvg
						width={40}
						height={40}
						style={[CommonStyleSheet.svgButton, { margin: 5 }]}
					/>
					<Text style={CommonStyleSheet.buttonText}>Upload</Text>
				</View>

				{/* <Text style={CommonStyleSheet.buttonText}>+</Text> */}
			</TouchableHighlight>
		);
	}
}

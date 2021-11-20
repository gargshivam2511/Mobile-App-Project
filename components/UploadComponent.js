import React, { Component } from "react";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import ToolbarButtonComponent from "./ToolbarButtonComponent";
import UploadButtonSvg from "../assets/upload-button.svg"; // SVG File

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
			<ToolbarButtonComponent
				text="Upload"
				svg={UploadButtonSvg}
				onPress={this.selectFile}
			/>
		);
	}
}

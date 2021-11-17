import React, { Component } from "react";
import { Modal, Text, TouchableHighlight, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import CommonStyleSheet from "./CommonStyleSheet";
import ProfileButtonSvg from "./assets/profile-button.svg"; // SVG File

export default class ProfileComponent extends Component {
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
          <ProfileButtonSvg
            width={25}
            height={25}
            style={[CommonStyleSheet.svgButton]}
          />
          <Text style={CommonStyleSheet.buttonText}>Profile</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

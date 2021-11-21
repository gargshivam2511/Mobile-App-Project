import { StyleSheet } from "react-native";

// An CommonStyleSheet used for the purpose of consistency and reuse the same style
// in different Components.

export const backgroundColor = "rgb(51,51,51)";
export const foregroundColor = "orange";

export default CommonStyleSheet = StyleSheet.create({
	container: {
		backgroundColor: backgroundColor
	},
	text: {
		color: foregroundColor
	}
});

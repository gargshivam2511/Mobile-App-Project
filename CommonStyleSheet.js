import { StyleSheet } from "react-native";

// An CommonStyleSheet used for the purpose of consistency and reuse the same style
// in different Components.
export default CommonStyleSheet = StyleSheet.create({
	button: {
		marginVertical: 4,
		borderRadius: 5,
		backgroundColor: "rgba(0, 0, 0, 0)",
		alignSelf: "center"
	},
	buttonText: {
		fontSize: 12,
		color: "white",
		textAlign: "center"
	},
	svgButton: {
		color: "white",
		alignSelf: "center"
	}
});

import { StyleSheet } from "react-native";

// An CommonStyleSheet used for the purpose of consistency and reuse the same style
// in different Components.
export default CommonStyleSheet = StyleSheet.create({
	button: {
		marginTop: 20,
		marginLeft: 5,
		borderRadius: 5,
		backgroundColor: "rgba(0, 0, 0, 0.60)",
		alignSelf: "flex-start"
	},
	buttonText: {
		fontSize: 24,
		paddingVertical: 10,
		paddingHorizontal: 15,
		color: "white",
		textAlign: "center"
	}
});

import React, {
	StyleSheet,
	Platform
} from 'react-native';

export default StyleSheet.create({
	statusBar: {
		backgroundColor: '#00aa00',
	},
	title: {
		color: '#ffffff',
	},
	navIcon: {
		width: Platform.OS == 'ios' ? 32 : 48,
		height: Platform.OS == 'ios' ? 32 : 48,
	},
	navButton: {
		paddingLeft: 5,
		paddingRight: 5,
	},
	navBar: {
		backgroundColor: '#00aa00',
		elevation: 4,
	},
});
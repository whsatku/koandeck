import React, {
	Component,
	View,
	ToolbarAndroid,
	ListView,
	Text,
	StatusBar,
	StyleSheet,
	TouchableNativeFeedback,
	RecyclerViewBackedScrollView
} from 'react-native';
import TouchableFeedback from '../TouchableFeedback';

var navBgColor = '#00aa00';

var styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		justifyContent: 'center',
		paddingHorizontal: 10,
		paddingVertical: 20,
	},
	text: {
		flex: 1
	},
	separator: {
		height: 1,
		backgroundColor: '#CCCCCC',
	},
	root: {
		flex: 1,
		alignItems: 'stretch'
	},
	toolbar: {
		height: 56,
		backgroundColor: navBgColor,
		elevation: 4
	}
});

export default class FileList extends Component {
	constructor(){
		super();

		let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		let rows = [];

		for(let i = 1; i <= 100; i++){
			rows.push(`File ${i}`);
		}

		this.state = {
			dataSource: ds.cloneWithRows(rows),
		};
	}

	render(){
		return (
			<View style={styles.root}>
				<ToolbarAndroid
					title="Koan Deck"
					titleColor="white"
					actions={[{
						title: 'Add',
						show: 'always',
						icon: require('./ic_add_white.png'),
					}]}
					style={styles.toolbar} />
				<StatusBar backgroundColor={navBgColor} />
				<ListView
					pageSize={100}
					dataSource={this.state.dataSource}
					renderRow={this._renderRow}
					renderScrollComponent={(props) => <RecyclerViewBackedScrollView {...props} />}
					renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />} />
			</View>
		);
	}

	_renderRow = (rowData, sectionID, rowID) => {
		return (
			<TouchableFeedback onPress={this._onRowPress(rowData)}>
				<View style={styles.row}>
					<Text style={styles.text}>{rowData}</Text>
				</View>
			</TouchableFeedback>
		);
	};

	_onRowPress = (data) => {
		return () => {
			this.props.navigator.push({name: 'Editor', index: this.props.index + 1, file: data});
		};
	};
}
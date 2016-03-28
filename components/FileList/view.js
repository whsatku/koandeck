import React, {
	Component,
	View,
	ListView,
	Text,
	StatusBar,
	StyleSheet,
	TouchableNativeFeedback,
	RecyclerViewBackedScrollView,
	Image,
	Platform
} from 'react-native';
import NavBar, { NavButton, NavTitle, NavGroup } from 'react-native-nav'
import TouchableFeedback from '../TouchableFeedback';
import NavBarStyle from '../navbarstyle';

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
				<NavBar style={NavBarStyle}>
					<NavTitle style={NavBarStyle.title}>Koan Deck</NavTitle>
					<NavGroup>
						<NavButton style={NavBarStyle.navButton}><Image style={NavBarStyle.navIcon} source={require('./ic_add_white.png')} /></NavButton>
					</NavGroup>
				</NavBar>
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
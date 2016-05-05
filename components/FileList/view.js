import React, {
	Component,
	View,
	Text,
	StatusBar,
	StyleSheet,
	TouchableNativeFeedback,
	RecyclerViewBackedScrollView,
	Image,
	Platform,
	Alert
} from 'react-native';
import NavBar, { NavButton, NavTitle, NavGroup } from 'react-native-nav'
import { ListView } from 'realm/react-native';
import Prompt from 'react-native-prompt';

import TouchableFeedback from '../TouchableFeedback';
import NavBarStyle from '../navbarstyle';
import Realm from '../models';

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
	state = {
		addFile: false,
	};

	componentWillMount(){
		this.onRealmUpdate();
	}

	componentDidMount(){
		Realm.addListener('change', this.onRealmUpdate);
	}

	componentWillUnmount(){
		Realm.removeListener('change', this.onRealmUpdate);
	}

	onRealmUpdate = () => {
		let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.setState({
			dataSource: ds.cloneWithRows(Realm.objects('Document'))
		});
	};

	render(){
		return (
			<View style={styles.root}>
				<NavBar style={NavBarStyle}>
					<NavTitle style={NavBarStyle.title}>Koan Deck</NavTitle>
					<NavGroup>
						<NavButton style={NavBarStyle.navButton} onPress={() => this.setState({addFile: true})}><Image style={NavBarStyle.navIcon} source={require('./ic_add_white.png')} /></NavButton>
					</NavGroup>
				</NavBar>
				<ListView
					pageSize={100}
					dataSource={this.state.dataSource}
					renderRow={this._renderRow}
					renderScrollComponent={(props) => <RecyclerViewBackedScrollView {...props} />}
					renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />} />
				<Prompt
				 	title="File name"
					placeholder="My awesome slides"
					visible={this.state.addFile}
					onCancel={() => this.setState({addFile: false})}
					onSubmit={(value) => this.addSlide(value)}/>
			</View>
		);
	}

	_renderRow = (rowData, sectionID, rowID) => {
		return (
			<TouchableFeedback onPress={this._onRowPress(rowData)} onLongPress={this._onLongPress(rowData)}>
				<View style={styles.row}>
					<Text style={styles.text}>{rowData.name}</Text>
				</View>
			</TouchableFeedback>
		);
	};

	_onRowPress = (data) => {
		return () => {
			this.props.navigator.push({name: 'Editor', index: this.props.index + 1, file: data});
		};
	};

	_onLongPress = (data) => {
		return () => {
			Alert.alert(
				'Delete',
				`Delete ${data.name}?\nThis action cannot be undone.`,
				[
					{text: 'Cancel', style: 'cancel'},
					{text: 'OK', onPress: () => {
						Realm.write(() => {
							Realm.delete(data);
						});
					}},
				]
			);
		};
	};

	addSlide(name){
		if(!name){
			return;
		}

		Realm.write(() => {
			let ids = Realm.objects('Document').sorted('id');
			let lastId = -1;

			if(ids.length > 0){
				lastId = ids[ids.length-1].id;
			}

			Realm.create('Document', {
				id: lastId + 1,
				name: name,
				slides: [{
					text1: 'Enter title',
					text2: '',
					image: '',
				}],
			});
		});

		this.setState({
			addFile: false,
		});
	}
}

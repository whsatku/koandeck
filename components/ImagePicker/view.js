import React, {
	Component,
	StyleSheet,
	TextInput,
	Text,
	View,
	Image,
	ScrollView,
	TouchableHighlight,
	Dimensions
} from 'react-native';
import NavBar, { NavButton, NavTitle, NavGroup } from 'react-native-nav'
import GridView from 'react-native-grid-view';
import Unsplash from '../unsplash';
import NavBarStyle from '../navbarstyle';

var styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	gallery: {
		padding: 5,
	},
	search: {
		height: 30,
		width: 300,
		backgroundColor: 'white',
		borderRadius: 5,
		padding: 5,
	},
	scroll: {
		backgroundColor: '#424242',
	},
	credit: {
		color: '#ffffff',
		textShadowColor: '#222222',
		textShadowOffset: {height: 1, width: 0},
		fontSize: 8
	},
});

export default class ImagePicker extends Component {
	state = {
		query: '',
		images: [],
		end: false,
		page: 1,
	};
	loading = false;
	perRow = 3;

	render(){
		return (
			<View style={styles.container}>
				<NavBar style={NavBarStyle}>
					<NavButton onPress={this._onPreviousButton}><Image style={NavBarStyle.navIcon} source={require('../ic_navigate_before_white.png')} /></NavButton>
					<TextInput
						style={styles.search}
						value={this.state.query}
						onChangeText={this.onQueryChange}
						onSubmitEditing={this.onSearch}
						autoFocus={true}
						autoCapitalize="none"
						returnKeyType="search"
						placeholder="Use comma to separate terms" />
					<NavGroup />
				</NavBar>
				<GridView
					style={styles.scroll}
					items={this.state.images}
					itemsPerRow={this.perRow}
					renderItem={this.renderItem}
					onEndReached={this.state.end ? null : this.loadMore}
					/>
			</View>
		);
	}

	renderItem = (item) => {
		let {width, height} = Dimensions.get('window');

		// react native does not update dimensions!
		if(height > width){
			width = height;
		}

		let imageWidth = width / this.perRow;

		return (
			<TouchableHighlight onPress={() => {this.onSelect(item)}} key={item.id} underlayColor={item.color}>
				<Image
					style={[styles.gallery, {
						backgroundColor: item.color,
						width: imageWidth,
						height: imageWidth,
					}]}
					source={{uri: item.urls.small}}>
					<Text style={styles.credit}>{item.user.name}</Text>
				</Image>
			</TouchableHighlight>
		);
	};

	onQueryChange = (val) => {
		this.setState({
			query: val
		});
	};

	onSearch = () => {
		Unsplash.search(this.state.query).then((results) => {
			this.setState({
				images: results,
				end: results.length < Unsplash.per_page,
				page: 1
			});
		});
	};

	loadMore = () => {
		if(this.state.end || this.loading){
			return;
		}
		this.loading = true;

		Unsplash.search(this.state.query, this.state.page + 1).then((results) => {
			this.setState({
				images: this.state.images.concat(results),
				end: results.length < Unsplash.per_page,
				page: this.state.page + 1
			});
			this.loading = false;
		});
	};

	onSelect(item){
		this.props.navigator.push({
			name: 'ImagePreview', index: this.props.index + 1,
			image: item,
			callback: this.props.route.callback,
		});
	}

	_onPreviousButton = () => {
		this.props.navigator.pop();
	};
}

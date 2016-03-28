import React, {
	Component,
	StyleSheet,
	TextInput,
	Text,
	View,
	Image,
	ScrollView,
	TouchableHighlight
} from 'react-native';
import GridView from 'react-native-grid-view';
import Unsplash from '../unsplash';

var styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	gallery: {
		width: 200,
		height: 200,
		padding: 5,
	},
	search: {
		elevation: 5,
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

	render(){
		return (
			<View style={styles.container}>
				<TextInput
					style={styles.search}
					value={this.state.query}
					onChangeText={this.onQueryChange}
					onSubmitEditing={this.onSearch}
					placeholder="Search Unsplash. Use comma to separate terms" />
				<GridView
					style={styles.scroll}
					items={this.state.images}
					itemsPerRow={3}
					renderItem={this.renderItem}
					onEndReached={this.state.end ? null : this.loadMore}
					/>
			</View>
		);
	}

	renderItem = (item) => {
		return (
			<TouchableHighlight onPress={() => {this.onSelect(item)}} key={item.id} underlayColor={item.color}>
				<Image 
					style={[styles.gallery, {
						backgroundColor: item.color
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
		console.log(item);
	}
}
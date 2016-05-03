import React, {
	Component,
	Text,
	Image,
	View,
} from 'react-native';
import Button from 'apsl-react-native-button'

export default class ImagePicker extends Component {
	render(){
		let item = this.props.route.image;
		return (
			<Image
				style={{
					backgroundColor: item.color,
					flex: 1,
					paddingTop: 24+16,
					paddingLeft: 16,
				}}
				source={{uri: item.urls.regular}}
				resizeMode="contain">
				<Text style={{
					color: '#ffffff',
					textShadowColor: '#222222',
					textShadowOffset: {height: 1, width: 0},
				}}>{item.user.name}</Text>
				<View style={{
					flexDirection: 'row',
					width: 200,
					position: 'absolute',
					right: 16,
					top: 24+16,
					opacity: 0.8,
				}}>
					<Button style={{
						borderColor: '#2980b9',
						backgroundColor: '#3498db',
						flex: 1,
						marginRight: 10,
					}} onPress={this.onUse}>Use</Button>
					<Button style={{
						borderColor: '#c0392b',
						backgroundColor: '#e74c3c',
						flex: 1,
					}} onPress={() => {
						this.props.navigator.pop();
					}}>Back</Button>
				</View>
			</Image>
		)
	}

	onUse = () => {
		let routes = this.props.navigator.getCurrentRoutes();

		for(let i = routes.length - 1; i >= 0; i--){
			let route = routes[i];
			if(route.name === 'Editor'){
				this.props.route.callback(this.props.route.image.urls.regular);
				this.props.navigator.popToRoute(route);
				return;
			}
		}
	};
}

import React, {
	Component,
	View,
	StyleSheet,
	StatusBar,
	Platform,
	Image
} from 'react-native';
import Orientation from 'react-native-orientation';
import BackStack from '../BackStack';
import SlideDeck from '../SlideDeck';
import NavBar, { NavButton, NavTitle, NavGroup } from 'react-native-nav'
import NavBarStyle from '../navbarstyle';

var styles = StyleSheet.create({
});

export default class Editor extends Component {
	state = {
		preview: false,
	};

	componentWillMount(){
		Orientation.lockToLandscape();

		BackStack.addEventListener(this._onBack);
	}
	componentWillUnmount(){
		Orientation.unlockAllOrientations();
		BackStack.removeEventListener(this._onBack);
	}

	_onBack = () => {
		if(this.state.preview){
			this.setState({preview: false});
			return true;
		}
	};

	render(){
		let toolbar = [];
		if(!this.state.preview){
			toolbar = (
				<NavBar style={NavBarStyle}>
					<NavButton onPress={this._onPreviousButton}><Image style={NavBarStyle.navIcon} source={require('../ic_navigate_before_white.png')} /></NavButton>
					<NavTitle style={NavBarStyle.title}>{this.props.route.file}</NavTitle>
					<NavGroup>
						<NavButton style={NavBarStyle.navButton}><Image style={NavBarStyle.navIcon} source={require('./ic_add_box_white.png')} /></NavButton>
						<NavButton style={NavBarStyle.navButton}><Image style={NavBarStyle.navIcon} source={require('./ic_delete_white.png')} /></NavButton>
						<NavButton onPress={this._onImagePickerButton} style={NavBarStyle.navButton}><Image style={NavBarStyle.navIcon} source={require('./ic_image_white.png')} /></NavButton>
						<NavButton onPress={this._onPreviewButton} style={NavBarStyle.navButton}><Image style={NavBarStyle.navIcon} source={require('./ic_play_arrow_white.png')} /></NavButton>
					</NavGroup>
				</NavBar>
			);
		}else{
			toolbar = null;
		}
		return (
			<View style={{flex: 1}}>
				{toolbar}
				<StatusBar hidden={this.state.preview} animated={false} />
				<SlideDeck slides={[
					{text1: 'In a rush?', text2: 'Deadline: tomorrow\nDone: 0%', image: {uri: 'https://images.unsplash.com/photo-1453169753818-2feab4b4246d?crop=entropy&dpr=0.75&fit=crop&fm=jpg&h=1000&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1600'}, text1Color: '#FF5B78', text2Color: 'white'},
					{text1: 'Good slides doesn\'t\nhave to be hard', image: {uri: 'https://images.unsplash.com/uploads/141103282695035fa1380/95cdfeef?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=e99246a59a35be751528c9e66c8b07e9'}, text1Color: 'white'},
					{text1: 'Koan Deck', text2: 'Simple, fast and easy presentation tool.\nInspired by Haiku Deck', backgroundColor: '#00aa00', text1Color: 'white', text2Color: 'white'},
					{text2: '(Yeah, this is made in Koan Deck)', backgroundColor: '#00aa00', text1Color: 'white', text2Color: 'white'},
					{text2: '(Told you!)', backgroundColor: '#00aa00', text1Color: 'white', text2Color: 'white'},
					{text1: 'Features', image: {uri: 'https://images.unsplash.com/photo-1453576109701-aef2d431a8a4?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=3e48b9010346e7039781f74546fdcaf7'}, text1Color: 'white'},
					{text1: 'Multiple layouts', text2: '(Not yet)', image: {uri: 'https://images.unsplash.com/photo-1452457005517-a0dd81caca2a?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=ad43d9f5fcf9709ced38fa3048121105'}, text1Color: '#20CD2C'},
					{text1: 'Image search', text2: 'Thanks to unsplash.com for all these cool images!', image: {uri: 'https://images.unsplash.com/reserve/wBE2ADjQzK2ubCBMiy7T_DSC_0285.JPG?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=b6169331dd6432b87361688df681132e'}, text1Color: '#52A1CD'},
					{text1: 'Multiple documents', image: {uri: 'https://images.unsplash.com/photo-1422036306541-00138cae4dbc?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=5467d8c9949a7cb80440c80532041933'}, text1Color: 'white'},
					{text1: 'And hopefully... iOS?', text2: 'No promise, the editor component is still way broken', image: {uri: 'https://images.unsplash.com/photo-1444419988131-046ed4e5ffd6?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=a8d2a17cad35769c6818b185264a461d'}, text1Color: 'black'},
					{text2: 'Powered by React Native', image: {uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/React.js_logo.svg/2000px-React.js_logo.svg.png'}, text2Color: 'white'},
				]} presenting={this.state.preview} editable={!this.state.preview} />
			</View>
		);
	}

	_onImagePickerButton = () => {
		this.props.navigator.push({name: 'ImagePicker', index: this.props.index + 1});
	};

	_onPreviewButton = () => {
		this.setState({preview: true});
	};

	_onPreviousButton = () => {
		this.props.navigator.pop();
	};
}
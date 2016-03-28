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
	root: {
		flex: 1,
		alignItems: 'stretch'
	},
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
			<View style={styles.root}>
				{toolbar}
				<StatusBar hidden={this.state.preview} animated={false} />
				<SlideDeck slides={[
					{text1: 'Hello world!!', text2: 'This is example of koan deck'},
					{text1: 'Slide 2', text2: 'Woah this is awesome'},
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
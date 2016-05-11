import React, {
	Component,
	View,
	StyleSheet,
	StatusBar,
	Platform,
	Image,
	Alert,
	PixelRatio,
	PanResponder
} from 'react-native';
import Orientation from 'react-native-orientation';
import BackStack from '../BackStack';
import SlideDeck from '../SlideDeck';
import NavBar, { NavButton, NavTitle, NavGroup } from 'react-native-nav'
import NavBarStyle from '../navbarstyle';
import Realm from '../models';

var styles = StyleSheet.create({
});

export default class Editor extends Component {
	state = {
		preview: false,
		page: 0,
	};

	componentWillMount(){
		Orientation.lockToLandscape();

		BackStack.addEventListener(this._onBack);
		Realm.addListener('change', this._onRealmUpdate);
		this.file = this.props.route.file;

		this._panResponder = PanResponder.create({
			onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
				if(!this.state.preview || evt.nativeEvent.touches.length !== 2){
					return false;
				}

				this.distanceStart = Math.sqrt(
					Math.pow(evt.nativeEvent.touches[0].pageX - evt.nativeEvent.touches[1].pageX, 2)
					+ Math.pow(evt.nativeEvent.touches[0].pageY - evt.nativeEvent.touches[1].pageY, 2)
				);

				return true;
			},
			onPanResponderMove: (evt, gestureState) => {
				if(!this.state.preview || evt.nativeEvent.touches.length !== 2){
					return;
				}

				let distance = Math.sqrt(
					Math.pow(evt.nativeEvent.touches[0].pageX - evt.nativeEvent.touches[1].pageX, 2)
					+ Math.pow(evt.nativeEvent.touches[0].pageY - evt.nativeEvent.touches[1].pageY, 2)
				);
				let moved = distance - this.distanceStart;

				if(moved < -this.distanceStart/4){
					this.setState({
						preview: false,
					});
					return true;
				}
			},
		});
	}
	componentWillUnmount(){
		Orientation.unlockAllOrientations();
		BackStack.removeEventListener(this._onBack);
		Realm.removeListener('change', this._onRealmUpdate);
	}

	_onRealmUpdate = () => {
		this.forceUpdate();
	};

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
					<NavTitle style={NavBarStyle.title}>{this.file.name}</NavTitle>
					<NavGroup>
						<NavButton style={NavBarStyle.navButton} onPress={this._onAddButton}><Image style={NavBarStyle.navIcon} source={require('./ic_add_box_white.png')} /></NavButton>
						<NavButton style={NavBarStyle.navButton} onPress={this._onDeleteButton}><Image style={NavBarStyle.navIcon} source={require('./ic_delete_white.png')} /></NavButton>
						<NavButton style={NavBarStyle.navButton} onPress={this._onLayoutButton}><Image style={NavBarStyle.navIcon} source={require('./ic_featured_play_list_white.png')} /></NavButton>
						<NavButton onPress={this._onImagePickerButton} style={NavBarStyle.navButton}><Image style={NavBarStyle.navIcon} source={require('./ic_image_white.png')} /></NavButton>
						<NavButton onPress={this._onPreviewButton} style={NavBarStyle.navButton}><Image style={NavBarStyle.navIcon} source={require('./ic_play_arrow_white.png')} /></NavButton>
					</NavGroup>
				</NavBar>
			);
		}else{
			toolbar = null;
		}
		return (
			<View style={{flex: 1}} {...this._panResponder.panHandlers}>
				{toolbar}
				<StatusBar hidden={this.state.preview} animated={false} />
				<SlideDeck slides={this.file.slides} presenting={this.state.preview} editable={!this.state.preview} onPageChange={(no) => this.setState({page: no})}
				ref={(ele) => this.slideDeck = ele} />
			</View>
		);
	}

	_onImagePickerButton = () => {
		this.props.navigator.push({
			name: 'ImagePicker', index: this.props.index + 1,
			callback: this._onImagePicked,
		});
	};

	_onPreviewButton = () => {
		this.setState({preview: true});
	};

	_onPreviousButton = () => {
		this.props.navigator.pop();
	};

	_onAddButton = () => {
		Realm.write(() => {
			this.file.slides.push({
				text1: '',
				text2: '',
				image: '',
			});
			this.componentDidUpdate = () => {
				this.slideDeck.pager.goToPage(this.file.slides.length - 1);
				delete this.componentDidUpdate;
			};
		});
	};

	_onDeleteButton = () => {
		if(this.file.slides.length === 1){
			Alert.alert('Cannot delete', 'Last slide cannot be deleted', [
				{text: 'OK'}
			]);
			return;
		}

		Realm.write(() => {
			this.file.slides.splice(this.state.page, 1);

			this.componentDidUpdate = () => {
				this.slideDeck.pager.goToPage(Math.max(0, this.state.page - 1));
				delete this.componentDidUpdate;
			};
		});
	};

	_onImagePicked = (url) => {
		Realm.write(() => {
			this.file.slides[this.state.page].image = url;
		});
	};

	_onLayoutButton = () => {
		this.props.navigator.push({
			name: 'Layout', index: this.props.index + 1,
			slide: this.file.slides[this.state.page],
		});
	};
}

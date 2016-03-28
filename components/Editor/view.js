import React, {
	Component,
	View,
	StyleSheet,
	ToolbarAndroid,
	StatusBar,
} from 'react-native';
import Orientation from 'react-native-orientation';
import BackStack from '../BackStack';
import SlideDeck from '../SlideDeck';

var navBgColor = '#00aa00';

var styles = StyleSheet.create({
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
			toolbar = [
				<ToolbarAndroid
					key="toolbar"
					title={this.props.route.file}
					titleColor="white"
					actions={[{
						title: 'Add slide',
						show: 'always',
						icon: require('./ic_add_box_white.png'),
					}, {
						title: 'Delete',
						show: 'always',
						icon: require('./ic_delete_white.png'),
					}, {
						title: 'Change background',
						show: 'always',
						icon: require('./ic_image_white.png'),
					}, {
						title: 'Preview',
						show: 'always',
						icon: require('./ic_play_arrow_white.png'),
					}]}
					style={styles.toolbar}
					onActionSelected={this._onActionSelected} />,
				<StatusBar key="statusbar" hidden={false} backgroundColor={navBgColor} animated={false} />
			];
		}else{
			toolbar = [<StatusBar key="statusbar" hidden={true} animated={false} />];
		}
		return (
			<View style={styles.root}>
				{toolbar}
				<SlideDeck slides={[
					{text1: 'Hello world!!', text2: 'This is example of koan deck'},
					{text1: 'Slide 2', text2: 'Woah this is awesome'},
				]} presenting={this.state.preview} editable={!this.state.preview} />
			</View>
		);
	}

	_onActionSelected = (pos) => {
		switch(pos){
		case 3:
			// this.props.navigator.push({name: 'ImagePicker', index: this.props.index + 1, file: data});
			break;
		case 4:
			this.setState({preview: true});
			break;
		}
	};
}
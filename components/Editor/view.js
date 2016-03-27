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
					}, {
						title: 'Preview',
						show: 'always'
					}]}
					style={styles.toolbar}
					onActionSelected={this._onActionSelected} />,
				<StatusBar key="statusbar" backgroundColor={navBgColor} animated={false} />
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
		case 0:
			break;
		case 1:
			this.setState({preview: true});
			break;
		}
	};
}
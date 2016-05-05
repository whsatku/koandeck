import React, {
	Component,
	StyleSheet,
	Text,
	TextInput,
	View,
	Image,
	Dimensions,
} from 'react-native';
import Realm from '../models';

var styles = StyleSheet.create({
	slide: {
		backgroundColor: '#ffffaa',
		flex: 1,
	},
	text1: {
		fontSize: 48,
		// color: '#000000',
		// textShadowColor: '#000000',
		// textShadowOffset: {width: 0, height: 2},
		// textShadowRadius: 5,
		backgroundColor: 'rgba(0,0,0,0)'
	},
	text2: {
		fontSize: 24,
		marginTop: 10,
		// color: '#000000',
		backgroundColor: 'rgba(0,0,0,0)'
	},
	image: {
		padding: 15,
	},
	outer: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#cccccc',
	},
	elevation: {
		elevation: 24,
		backgroundColor: 'black' // somehow this is required
	},
	presenting: {
		backgroundColor: 'black'
	},
	textEdit: {
		lineHeight: 1,
		padding: 0,
	},
});

//var aspectRatio = [37, 24];
var aspectRatio = [4, 3];

export default class Slide extends Component {
	componentWillMount(){
		this.setState({
			text1: this.props.slide.text1,
			text2: this.props.slide.text2,
			original1: this.props.slide.text1,
			original2: this.props.slide.text2,
		});
	}

	componentWillUnmount(){
		Realm.write(() => {
			this.props.slide.text1 = this.state.text1;
			this.props.slide.text2 = this.state.text2;
		});
	}

	componentWillReceiveProps(props){
		if(props.slide.text1 != this.state.original1 || props.slide.text2 != this.state.original2){
			this.setState({
				text1: props.slide.text1,
				text2: props.slide.text2,
				original1: props.slide.text1,
				original2: props.slide.text2,
			});
		}
	}

	render(){
		let text = [];

		let textAlign = 'center';
		let size = this.computeSize();

		switch(this.props.slide.layout){
			case 0: case 3: case 6: // left aligned
				textAlign = 'left';
				break;
			case 2: case 5: case 8: // right aligned
				textAlign = 'right';
				break;
			case 4: default: // center
				break; // default
		};

		if(this.props.editable){
			text = [
				<TextInput style={[styles.text1, styles.textEdit, {
					color: this.props.slide.text1Color,
					textAlign: textAlign,
					height: 60,
				}]} key="text1" value={this.state.text1} underlineColorAndroid="transparent" onChangeText={(text) => this.setState({text1: text})} placeholder="Tap to enter title" />,
				<TextInput style={[styles.text2, styles.textEdit, {
					color: this.props.slide.text2Color,
					textAlign: textAlign,
					height: 60,
				}]} key="text2" value={this.state.text2} underlineColorAndroid="transparent" onChangeText={(text) => this.setState({text2: text})} placeholder="Tap to enter subtitle" />
			];
		}else{
			text = [
				<Text style={[
					styles.text1,
					{color: this.props.slide.text1Color}
				]} key="text1">{this.state.text1}</Text>,
				<Text style={[
					styles.text2,
					{color: this.props.slide.text2Color}
				]} key="text2">{this.state.text2}</Text>
			];
		}

		let layout = {
			alignItems: 'center',
			justifyContent: 'center',
		};

		switch(this.props.slide.layout){
			case 0: case 3: case 6: // left aligned
				layout.alignItems = 'flex-start';
				break;
			case 2: case 5: case 8: // right aligned
				layout.alignItems = 'flex-end';
				break;
			case 4: default: // center
				break; // default
		};

		switch(this.props.slide.layout){
			case 0: case 1: case 2:
				layout.justifyContent = 'flex-start';
				break;
			case 6: case 7: case 8:
				layout.justifyContent = 'flex-end';
				break;
			case 3: case 4: case 5: default: // center
				break; // default
		};

		if(this.props.slide.image){
			return (
				<View style={[styles.outer, this.props.presenting && styles.presenting, {width: this.props.width, height: this.props.height}]}>
					<View style={[styles.elevation, size]}>
						<Image style={[
							styles.image,
							layout,
							size
						]} source={{uri: this.props.slide.image}}>
							{text}
						</Image>
					</View>
				</View>
			);
		}else{
			return (
				<View style={[styles.outer, this.props.presenting && styles.presenting, {width: this.props.width, height: this.props.height}]}>
					<View style={[
						styles.image,
						layout,
						size,
						{backgroundColor: this.props.slide.backgroundColor || '#ffffff'}
					]}>
						{text}
					</View>
				</View>
			);
		}
	}

	computeSize(){
		let {width, height} = this.props;
		if(width === 0){
			return this.computeSizeFallback();
		}
		return this.clampAspect({width: width, height: height});
	}

	computeSizeFallback(){
		let {width, height} = Dimensions.get('window');

		if(width < height){
			let tmp = height;
			height = width;
			width = tmp;
		}

		return this.clampAspect({width: width, height: height});
	}

	clampAspect(obj){
		let width = (obj.height/aspectRatio[1]) * aspectRatio[0];
		let height = (obj.width/aspectRatio[0]) * aspectRatio[1];

		if(width > obj.width){
			obj.height = height;
		}else{
			obj.width = width;
		}

		return obj;
	}
}

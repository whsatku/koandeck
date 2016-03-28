import React, {
	Component,
	StyleSheet,
	Text,
	TextInput,
	View,
	Image,
	Dimensions,
} from 'react-native';

var styles = StyleSheet.create({
	slide: {
		backgroundColor: '#ffffaa',
		flex: 1,
	},
	text1: {
		fontSize: 48,
		textAlign: 'center',
	},
	text2: {
		fontSize: 24,
		marginTop: 10,
		textAlign: 'center',
	},
	image: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	outer: {
		alignItems: 'center',
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

var aspectRatio = [37, 24];

export default class Slide extends Component {
	render(){
		let text = [];

		if(this.props.editable){
			text = [
				<TextInput style={[styles.text1, styles.textEdit]} key="text1" value={this.props.slide.text1} underlineColorAndroid="transparent" />,
				<TextInput style={[styles.text2, styles.textEdit]} key="text2" value={this.props.slide.text2} underlineColorAndroid="transparent" />
			];
		}else{
			text = [
				<Text style={[
					styles.text1,
					{color: this.props.slide.text1Color}
				]} key="text1">{this.props.slide.text1}</Text>,
				<Text style={[
					styles.text2,
					{color: this.props.slide.text2Color}
				]} key="text2">{this.props.slide.text2}</Text>
			];
		}

		let size = this.computeSize();

		if(this.props.slide.backgroundColor){
			return (
				<View style={[
					styles.image,
					size,
					{backgroundColor: this.props.slide.backgroundColor}
				]}>
					{text}
				</View>
			);
		}else{
			return (
				<View style={[styles.outer, this.props.presenting && styles.presenting, {width: this.props.width, height: this.props.height}]}>
					<View style={[styles.elevation, size]}>
						<Image style={[
							styles.image,
							size
						]} source={require('./bg.jpg')}>
							{text}
						</Image>
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
import React, {
	Component,
	StyleSheet,
	Text,
	View,
	ViewPagerAndroid,
	LayoutAnimation
} from 'react-native';
import Slide from '../Slide';

var styles = StyleSheet.create({
	deck: {
		flex: 1,
		justifyContent: 'center'
	},
	slider: {
		flex: 1,
	}
});

export default class SlideDeck extends Component {
	state = {
		width: 0,
		height: 0,
	};

	componentWillReceiveProps(props){
		if(this.pager && props.noEnd != this.props.noEnd){
			this.pager.setPage(0);
		}
	}

	render(){
		let slides = this.props.slides.map((item, index) => {
			return <Slide 
				width={this.state.width} height={this.state.height} 
				editable={this.props.editable} presenting={this.props.presenting}
				slide={item} key={index} />;
		});

		let eop = null;

		if(this.props.presenting){
			eop = <Slide 
				width={this.state.width} height={this.state.height}
				editable={false} presenting={this.props.presenting}
				slide={{
					text2: 'End of presentation',
					backgroundColor: 'black',
					text2Color: 'white'
				}} />;
		}

		return (
			<View style={styles.deck} onLayout={this._onLayout}>
				<ViewPagerAndroid
					initialPage={0}
					style={styles.slider}
					ref={(pager) => this.pager = pager}>
					{slides}
					{eop}
				</ViewPagerAndroid>
			</View>
		);
	}

	_onLayout = (e) => {
		let {width, height} = e.nativeEvent.layout;

		if(this.props.presenting){
			LayoutAnimation.easeInEaseOut();
		}
		this.setState({
			width: width,
			height: height,
		});
	};
}
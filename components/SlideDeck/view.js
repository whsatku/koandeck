import React, {
	Component,
	StyleSheet,
	Text,
	View,
	LayoutAnimation,
	Dimensions
} from 'react-native';
import Slide from '../Slide';
import Swiper from 'react-native-page-swiper';

var styles = StyleSheet.create({
	deck: {
		flex: 1,
		justifyContent: 'center',
	},
	slider: {
		flex: 1,
	}
});

export default class SlideDeck extends Component {
	state = {
		width: 0,
		height: 0,
		currentPage: 0,
	};

	componentWillReceiveProps(props){
		if(
			this.pager
			&& props.presenting != this.props.presenting
			&& this.props.presenting
			&& this.state.currentPage == this.props.slides.length
		){
			this.pager.goToPage(this.props.slides.length - 1);
		}
	}

	render(){
		let slides = this.props.slides.map((item, index) => {
			return (
				<View key={index}>
					<Slide
						width={this.state.width} height={this.state.height}
						editable={this.props.editable} presenting={this.props.presenting}
						slide={item} />
				</View>
			);
		});

		if(this.props.presenting){
			slides.push((
				<View key="eop">
					<Slide
					width={this.state.width} height={this.state.height}
					editable={false} presenting={this.props.presenting}
					slide={{
						text2: 'End of presentation',
						backgroundColor: 'black',
						text2Color: 'white'
					}} />
				</View>
			));
		}

		let {width, height} = Dimensions.get('window');
		if(height > width){
			width = height;
		}

		return (
			<View style={[styles.deck, {
				backgroundColor: this.props.presenting ? 'black' : '#cccccc',
			}]} onLayout={this._onLayout}>
				<Swiper
					index={0}
					pager={false}
					style={styles.slider}
					springFriction={10}
					onPageChange={this._onPageChange}
					ref={(pager) => this.pager = pager}>
					{slides}
				</Swiper>
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

	_onPageChange = (number) => {
		this.setState({
			currentPage: number,
		});
		if(this.props.onPageChange){
			this.props.onPageChange(number);
		}
	};
}

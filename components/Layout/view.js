import React, {
	Component,
	Text,
	Image,
	View,
	StyleSheet,
} from 'react-native';
import NavBar, { NavButton, NavTitle, NavGroup } from 'react-native-nav';
import NavBarStyle from '../navbarstyle';
import TouchableFeedback from '../TouchableFeedback';
import Realm from '../models';

var styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		flex: 1,
	},
	item: {
		flex: 1,
		padding: 10,
		height: 50,
	},
});

export default class ImagePicker extends Component {
	render(){
		let current = this.props.route.slide.layout;
		return (
			<View style={{flexDirection: 'column'}}>
				<NavBar style={NavBarStyle}>
					<NavButton onPress={this._onPreviousButton}><Image style={NavBarStyle.navIcon} source={require('../ic_navigate_before_white.png')} /></NavButton>
					<NavTitle style={NavBarStyle.title}>Layout</NavTitle>
					<NavGroup />
				</NavBar>
				<View style={styles.row}>
					<TouchableFeedback onPress={this.onChoose(0)}><View style={styles.item}><Text>Top left</Text></View></TouchableFeedback>
					<TouchableFeedback onPress={this.onChoose(1)}><View style={styles.item}><Text style={{textAlign: 'center'}}>Top center</Text></View></TouchableFeedback>
					<TouchableFeedback onPress={this.onChoose(2)}><View style={styles.item}><Text style={{textAlign: 'right'}}>Top right</Text></View></TouchableFeedback>
				</View>
				<View style={styles.row}>
					<TouchableFeedback onPress={this.onChoose(3)}><View style={styles.item}><Text>Middle left</Text></View></TouchableFeedback>
					<TouchableFeedback onPress={this.onChoose(4)}><View style={styles.item}><Text style={{textAlign: 'center'}}>Middle center</Text></View></TouchableFeedback>
					<TouchableFeedback onPress={this.onChoose(5)}><View style={styles.item}><Text style={{textAlign: 'right'}}>Middle right</Text></View></TouchableFeedback>
				</View>
				<View style={styles.row}>
					<TouchableFeedback onPress={this.onChoose(6)}><View style={styles.item}><Text>Bottom left</Text></View></TouchableFeedback>
					<TouchableFeedback onPress={this.onChoose(7)}><View style={styles.item}><Text style={{textAlign: 'center'}}>Bottom center</Text></View></TouchableFeedback>
					<TouchableFeedback onPress={this.onChoose(8)}><View style={styles.item}><Text style={{textAlign: 'right'}}>Bottom right</Text></View></TouchableFeedback>
				</View>
			</View>
		)
	}

	onChoose(layout){
		return () => {
			Realm.write(() => {
				this.props.route.slide.layout = layout;
			});
			this.props.navigator.pop();
		};
	}

	_onPreviousButton = () => {
		this.props.navigator.pop();
	};
}

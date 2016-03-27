import React, {
	AppRegistry,
	Component,
	UIManager
} from 'react-native';
import App from './components/App';

class koandeck extends Component {
	render(){
		return (
			<App />
		);
	}
}

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
AppRegistry.registerComponent('koandeck', () => koandeck);

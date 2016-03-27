import React, {
	Component,
	Navigator,
	View,
	Text,
} from 'react-native';
import FileList from '../FileList';
import BackStack from '../BackStack';
import Editor from '../Editor';

export default class App extends Component {
	static routes = {
		FileList: FileList,
		Editor: Editor,
	};

	componentDidMount(){
		BackStack.addEventListener(() => {
			if(this.nav.getCurrentRoutes().length > 1){
				this.nav.pop();
				return true;
			}
		});
	}

	render(){
		return (
			<Navigator
				initialRoute={{name: 'FileList', index: 0}}
				renderScene={this.renderScene}
				ref={(nav) => {
					this.nav = nav;
				}} />
		);
	}

	renderScene(route, navigator){
		if(!App.routes[route.name]){
			return (
				<View>
					<Text>Application error! Route {route.name} not found.</Text>
				</View>
			);
		}
		return React.createElement(App.routes[route.name], {
			navigator: navigator,
			index: route.index,
			route: route,
		});
	}
}
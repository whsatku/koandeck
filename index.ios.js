import React, {
  AppRegistry,
  Component
} from 'react-native';
import App from './components/App';

class koandeck extends Component {
  render(){
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('koandeck', () => koandeck);

import {
	BackAndroid
} from 'react-native';

class BackStack {
	listeners = [];

	constructor(){
		BackAndroid.addEventListener('hardwareBackPress', this.fire.bind(this));
	}

	addEventListener(e){
		this.listeners.unshift(e);
	}

	removeEventListener(e){
		let index = this.listeners.indexOf(e);
		if(index === -1){
			return;
		}

		this.listeners.splice(index, 1);
	}

	fire(){
		for(let item of this.listeners){
			if(item()){
				return true;
			}
		}
	}
}

export default new BackStack();
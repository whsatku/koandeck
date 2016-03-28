import React, {TouchableHighlight} from 'react-native';

export default (props) => {
	return <TouchableHighlight underlayColor="#007AFF" {...props}>{props.children}</TouchableHighlight>
};

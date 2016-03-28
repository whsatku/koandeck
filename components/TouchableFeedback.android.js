import React, {TouchableNativeFeedback} from 'react-native';

export default (props) => {
	return <TouchableNativeFeedback {...props}>{props.children}</TouchableNativeFeedback>
};

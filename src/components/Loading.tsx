import React from 'react';
import {View, Image} from 'react-native';

export const Loading = () => {
	return (
		<View style={{flex: 1, alignContent: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
			<Image
				source={require('../assets/loading.gif')}
				style={{height: 150, width: 150, alignSelf: 'center'}}
			/>
			{/* <ActivityIndicator /> */}
		</View>
	);
};

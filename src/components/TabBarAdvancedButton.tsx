import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TabBg} from '../svg';
import {ThemeContext} from '../context/theme/ThemeContext';
import {ShopContext} from '../context/shop/ShopContext';

type Props = BottomTabBarButtonProps & {
  bgColor?: string;
};

export const TabBarAdvancedButton: React.FC<Props> = ({bgColor, ...props}) => {
  const {car} = useContext(ShopContext);
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  return (
    <View style={styles.container} pointerEvents="box-none">
      <TabBg color={'rgba(255,255,255,0.92)'} style={styles.background} />
      <TouchableOpacity
        activeOpacity={0.8}
        style={{...styles.button, backgroundColor: colors.primary}}
        onPress={props.onPress}>
        {car.length > 0 && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              right: -10,
              backgroundColor: colors.card,
              borderRadius: 100,
              height: 22,
              width: 22,
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
            }}>
            <Text style={{color: 'white'}}>
              {car.length < 10 ? car.length : '+9'}
            </Text>
          </View>
        )}
        <Icon name="shopping-cart" style={styles.buttonIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 75,
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
  },
  button: {
    top: -22.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 27,
  },
  buttonIcon: {
    fontSize: 22,
    color: '#ecece4',
  },
});

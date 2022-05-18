import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ThemeContext} from '../context/theme/ThemeContext';

/* interface Props extends StackScreenProps<any, any> {} */

interface Props {
  color: string;
  navigation: any;
}
/* interface Props extends NavigationProp<ParamListBase, string> {} */
export const BackButton = ({navigation, color = 'white'}: Props) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const {top} = useSafeAreaInsets();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      activeOpacity={0.8}
      style={{
        ...styles.backButton,
        top: top,
        padding: 10,
      }}>
      <Icon name="arrow-back-outline" color={colors.primary} size={35} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    zIndex: 999999999,
    left: 10,
  },
});

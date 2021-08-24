import React from 'react';
import {View, Text, Platform, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BackButton} from './BackButton';

interface Props {
  colors: Array<string | number>;
  text: String;
  backButton: boolean;
  height: number;
}

export const TopScreen = (props: Props) => {
  const {colors, text, backButton, height} = props;
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <>
      {backButton && <BackButton navigation={navigation} />}
      <View
        style={{
          ...styles.headerContainer,
          overflow: 'hidden',
          height: height,
        }}>
        <LinearGradient
          style={{
            flex: 1,
            width: '100%',
          }}
          colors={colors}>
          <Text
            style={{
              ...styles.mainName,
              top: top + 50,
              fontFamily: 'Merienda-Regular',
              alignSelf: 'center',
            }}>
            {text}
          </Text>
        </LinearGradient>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: Platform.OS === 'ios' ? 1000 : 100,
    borderBottomLeftRadius: 0,
  },
  mainName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
  },
});

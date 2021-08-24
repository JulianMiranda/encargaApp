import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
  Animated
} from 'react-native';

import {StackScreenProps} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {RootStackParams} from '../../navigation/HomeStack';
import Icon from 'react-native-vector-icons/Ionicons';
import {FadeInImage} from '../../components/FadeInImage'; /* 
import { usePokemon } from '../hooks/usePokemon';
import { PokemonDetails } from '../components/PokemonDetails'; */
import {BackButton} from '../../components/BackButton';
import {useCategory} from '../../hooks/useCategory';
import {SubcategoriesList} from '../../components/SubcategoriesList';
import LinearGradient from 'react-native-linear-gradient';
import { useAnimationXY } from '../../hooks/useAnimationXY';

interface Props extends StackScreenProps<RootStackParams, 'CategoryScreen'> {}

export const CategoryScreen = (props: Props) => {
  const {navigation, route} = props;
  const {category, color} = route.params;
  const {
    id,
    name,
    image: {url},
  } = category;
  const {top} = useSafeAreaInsets();

  const [expanded, setExpanded] = useState(false);
  const [infoButton, setInfoButton] = useState(false);

  const {isLoading, subcategories} = useCategory(id);
 
  const showToastWithGravityAndOffset = () => {

    ToastAndroid.showWithGravityAndOffset(
      "\n ✅  Todos los precios de esta categoría tienen el envío incluído\n",
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
      25,
      50
    );

    
   
  };  
  useEffect(() => {
    if(id === '610c7275b33a5c00158b00a5'){
      setInfoButton(true);
      showToastWithGravityAndOffset();
    }
    
  }, [expanded]);

  return (
    <>
      {/* Backbutton */}
      <BackButton navigation={navigation} />
      {infoButton &&
      <TouchableOpacity
        style={{position: 'absolute',zIndex: 99999999, right: 30, top: top + 5,borderColor: 'white', borderWidth:1, borderRadius: 100, padding: 2}}
        onPress={() => setExpanded(!expanded)}
      >
        <Text>❕</Text>
      </TouchableOpacity>
}
      <KeyboardAvoidingView
     
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          {/* Heade Containerr */}

          <View
            style={{
              ...styles.headerContainer,
              overflow: 'hidden',
            }}>
            <LinearGradient
              style={{
                flex: 1,
                width: '100%',
              }}
              //start={{x: 0.5, y: 0.0}}
              //end={{x: 0.1, y: 0.2}}
              //colors={['#4c669f', '#3b5998', '#192f6a']}
              colors={[color, '#d6e6fc']}>
              <Text
                style={{
                  ...styles.mainName,
                  top: top + 50,
                  fontFamily: 'Merienda-Regular',
                }}>
                {name + '\n'}
              </Text>
            </LinearGradient>
          </View>
          <FadeInImage uri={url} style={styles.mainImage} />

          {/* Detalles y Loading */}

          {isLoading ? (
            <View style={styles.loadingIndicator}>
              <ActivityIndicator color={color} size={50} />
            </View>
          ) : (
            <SubcategoriesList subcategories={subcategories} />
          )}
         
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: Platform.OS === 'ios' ? 200 : 150,
    borderBottomLeftRadius: 0,
  },
  backButton: {
    position: 'absolute',
    zIndex: 999999999,
    left: 20,
  },
  mainName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
  },

  mainImage: {
    borderRadius: 90,
    width: 250,
    height: 250,
    position: 'absolute',
    top: 70 /* 
		bottom: 105, */,
    zIndex: 99999999,
    right: 50,
  },
  loadingIndicator: {
    flex: 1,
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

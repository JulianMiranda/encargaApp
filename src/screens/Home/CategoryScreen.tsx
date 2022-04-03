import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SubcategoryCard} from '../../components/SubcategoryCard';
import {useSubcategoryPaginated} from '../../hooks/useSubcategoryPaginated';
import {RootStackParams} from '../../navigation/HomeStack';
import {homeStyles} from '../../styles/homeTheme';

interface Props extends StackScreenProps<RootStackParams, 'CategoryScreen'> {}

export const CategoryScreen = (props: Props) => {
  const {route} = props;
  const {category} = route.params;
  const {id, name} = category;
  const {isLoading, subcategories, loadSubcategories} =
    useSubcategoryPaginated(id);

  const {top} = useSafeAreaInsets();
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <FlatList
          data={subcategories}
          keyExtractor={(subcategory, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={3}
          // Header
          ListHeaderComponent={
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                ...homeStyles.globalMargin,
                top: top,
                marginBottom: top + 40,
                paddingBottom: 10,
              }}>
              <Text style={{fontSize: 28, alignSelf: 'center'}}>{name}</Text>
            </View>
          }
          renderItem={({item}) => <SubcategoryCard item={item} />}
          // infinite scroll
          onEndReached={loadSubcategories}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            <>
              {isLoading && <ActivityIndicator color={'#fb2331'} />}

              <View style={{height: 80}} />
            </>
          }
        />
      </KeyboardAvoidingView>
    </>
  );
};

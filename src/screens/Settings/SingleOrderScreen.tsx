import React, {useContext} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {TouchableOpacity, View, Text, ScrollView} from 'react-native';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {RootStackParams} from '../../navigation/SettingsStack';
import moment from 'moment';
import {TopScreen} from '../../components/TopScreen';
import { formatToCurrency } from '../../utils/formatToCurrency';

interface Props
  extends StackScreenProps<RootStackParams, 'SingleOrderScreen'> {}

export const SingleOrderScreen = (props: Props) => {
  const {navigation, route} = props;
  const {order} = route.params;

  const colors = ['#2684FD', '#bae6f7'];
  return (
    <>
      <TopScreen colors={colors} text="Compra" backButton={true} height={170} />
      <ScrollView
        style={{
          flex: 1,
          margin: 10,
        }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: '300',
            fontFamily: 'NovaSlim-Regular',
          }}>
          Realizada {moment(order.createdAt).fromNow()}
        </Text>
        {/* <View style={{backgroundColor: '#f1f1f1', borderRadius: 10}}> */}
        <Text
          style={{
            fontSize: 22,
            fontWeight: '300',
            fontFamily: 'NovaSlim-Regular',
            marginTop: 15,
            marginBottom: 7,
          }}>
          Productos Comprados:
        </Text>
        {/* </View> */}
        {order.car.map((item, index) => (
          <View
            key={index.toString()}
            style={{marginHorizontal: 5, flexDirection: 'row'}}>
            <Text
              style={{
                fontFamily: 'NovaSlim-Regular',
                marginLeft: 2,
                fontSize: 18,
                width: 50,
              }}>
              {item.cantidad}
            </Text>
            <Text
              style={{
                fontFamily: 'NovaSlim-Regular',
                fontSize: 18,
                marginLeft: 4,
              }}>
              {item.subcategory.name}
            </Text>
          </View>
        ))}
        <Text
          style={{
            fontSize: 22,
            marginTop: 60,
            marginBottom: 80,
            alignSelf: 'flex-end',
            marginRight: 10,
            fontWeight: '300',
            fontFamily: 'NovaSlim-Regular',
          }}>
         Valor de compra: {formatToCurrency(order.cost)}
        </Text>
      </ScrollView>
    </>
  );
};

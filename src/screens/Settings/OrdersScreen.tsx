import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useOrders} from '../../hooks/useOrders';
import {Order} from '../../interfaces/Order.interface';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {TopScreen} from '../../components/TopScreen';
import { formatToCurrency } from '../../utils/formatToCurrency';

export const OrdersScreen = () => {
  const {orders} = useOrders();
  const colors = ['#2684FD', '#bae6f7'];
  return (
    <>
      <TopScreen
        colors={colors}
        text="Historial"
        backButton={true}
        height={170}
      />
      <FlatList
          data={orders}
          keyExtractor={(category, index) => index.toString()}
          showsVerticalScrollIndicator={false}
         /*  numColumns={1} */
          // Header
          
          renderItem={({item, index}) =>  <OrderComponent singleOrder={item} key={index.toString()} />}
         
          ListFooterComponent={
            <View style={{height: 70}} />
          
          }
        />
    
    </>
  );
};

const OrderComponent = ({singleOrder}: any) => {
  const navigation = useNavigation();
  const order: Order = singleOrder;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('SingleOrderScreen', {order})}
      style={styles.card}>
      <Text style={styles.firstText}>
        Compra realizada {moment(order.createdAt).calendar()}
      </Text>
      <Text style={styles.firstText}>Valor de compra: {formatToCurrency(order.cost)}</Text>
      <Text style={{...styles.firstText, marginTop: 7, color: '#2684FD'}}>
        Ver Detalles
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
  },
  card: {
    margin: 5,
    backgroundColor: '#f8f7f7',
    borderRadius: 3,
    padding: 5,
  },
  subcategory: {
    marginHorizontal: 5,
    flexDirection: 'row',
  },
  firstText: {
    fontSize: 16,
    fontFamily: 'Merienda-Regular',
  },
});

import React, {createContext, useContext, useEffect, useReducer} from 'react';

import {ShopState, shopReducer} from './shopReducer';
import {Subcategory} from '../../interfaces/Subcategory.interface';
import {CarItemProps, MyShopResponse} from '../../interfaces/Shop.Interface';
import api from '../../api/api';
import {AuthContext} from '../auth/AuthContext';
import {User} from '../../interfaces/User.interface';

type ShopContextProps = {
  car: CarItemProps[];
  message: string;
  setItem: (item: CarItemProps) => void;
  unsetItem: (item: Subcategory) => void;
  emptyCar: () => void;
  removeAlert: () => void;
  makeShop: (total: number, description: string) => void;
};
const shopInicialState: ShopState = {
  car: [],
  message: '',
};

export const ShopContext = createContext({} as ShopContextProps);

export const ShopProvider = ({children}: any) => {
  const {status, user} = useContext(AuthContext);
  const [state, dispatch] = useReducer(shopReducer, shopInicialState);

 

  useEffect(() => {
    if (status === 'authenticated') checkCar();
  }, [status]);
  const checkCar = async () => {
    try {
      const resp = await api.get<Array<MyShopResponse>>('/shop/getMyShop');
      if (resp.data.length && resp.data[0].car.length > 0) {
        resp.data[0].car.map(item => setItem(item));
      }
    } catch (error) {
      console.log(error);
      
    }
   
  };
  const setItem = (item: CarItemProps) => {
    try {
      const subcategoriesCar = state.car.map(item => item.subcategory.id);
      if (subcategoriesCar.includes(item.subcategory.id)) {
        console.log('actualizar Producto');
        const newState = state.car.filter(
          carItem => carItem.subcategory.id !== item.subcategory.id,
        );
        api.post('/shop/setMyShop', {user: user!.id, car: [...newState, item]});
        dispatch({type: 'update_item', payload: item});
      } else {
        console.log('producto Nuevo');
        api.post('/shop/setMyShop', {user: user!.id, car: [...state.car, item]});
        dispatch({type: 'set_item', payload: item});
      } 
    } catch (error) {
      console.log(error);
      
    }
    
  };

  const unsetItem = (item: Subcategory) => {
    try {
      const newState = state.car.filter(
        carItem => carItem.subcategory.id !== item.id,
      );
      api.post('/shop/setMyShop', {user: user!.id, car: [...newState]});
      dispatch({type: 'unset_item', payload: item});
    } catch (error) {
      console.log(error);
      
    }
    
  };

  const emptyCar = () => {
    try {
      api.post('/shop/setMyShop', {user: user!.id, car: []});
    dispatch({type: 'empty_car'});
    } catch (error) {
      console.log(error);
      
    }
    
  };

  const makeShop = async (total: number, description: string) => {
    try {
      const authorized = await api.get<User>(`/users/getOne/${user?.id}`);
    if (!authorized.data.authorized) {
      const a = await api.post('/orders/setOrder', {
        user: user!.id,
        cost: total,
        car: state.car,
        description
      });
      if (a.status === 201) {       
        dispatch({type: 'empty_car'})};
    } else {
      dispatch({
        type: 'show_alert',
        payload:
          'Es necesario contactar con el proveedor para constatar los detalles del envío',
      });
    }
    } catch (error) {
      console.log(error);
      
    }
    
  };
  const removeAlert = () => {
    dispatch({type: 'remove_alert'});
  };
  return (
    <ShopContext.Provider
      value={{
        ...state,
        setItem,
        unsetItem,
        emptyCar,
        makeShop,
        removeAlert,
      }}>
      {children}
    </ShopContext.Provider>
  );
};

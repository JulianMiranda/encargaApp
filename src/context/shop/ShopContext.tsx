import React, {createContext, useContext, useEffect, useReducer} from 'react';

import {ShopState, shopReducer} from './shopReducer';
import {Subcategory} from '../../interfaces/Subcategory.interface';
import {CarItemProps, MyShopResponse} from '../../interfaces/Shop.Interface';
import api from '../../api/api';
import {AuthContext} from '../auth/AuthContext';
import {User} from '../../interfaces/User.interface';
import {useToast} from 'react-native-toast-notifications';
import {Dimensions} from 'react-native';
import {RellenoInterface} from '../../screens/Shop/ShopScreen';
import {Prices} from '../../interfaces/Prices.interface';

type ShopContextProps = {
  addCarLoading: boolean;
  car: CarItemProps[];
  message: string;
  errorAddCar: string;
  setItem: (item: CarItemProps) => void;
  unsetItem: (item: Subcategory) => void;
  updateCarItem: (item: CarItemProps) => void;
  emptyCar: () => Promise<any>;
  removeAlert: () => void;
  clearErrorAdd: () => void;
  makeShop: (
    total: number,
    description: string,
    totalPaqReCalc: number,
    prices: Prices,
    selectedCarnet: string[],
    relleno: RellenoInterface,
  ) => Promise<boolean>;
};
const shopInicialState: ShopState = {
  car: [],
  message: '',
  errorAddCar: '',
  addCarLoading: false,
};

export const ShopContext = createContext({} as ShopContextProps);

export const ShopProvider = ({children}: any) => {
  const {height} = Dimensions.get('window');
  const {status, user} = useContext(AuthContext);
  const [state, dispatch] = useReducer(shopReducer, shopInicialState);
  const toast = useToast();
  useEffect(() => {
    if (status === 'authenticated') {
      checkCar();
    }
  }, [status]);
  const checkCar = async () => {
    try {
      console.log('checkCar');

      const resp = await api.get<Array<MyShopResponse>>('/shop/getMyShop');
      if (resp.data.length && resp.data[0].car.length > 0) {
        resp.data[0].car.map(item =>
          dispatch({type: 'set_item', payload: item}),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const setItem = async (item: CarItemProps) => {
    try {
      dispatch({type: 'add_car_loading', payload: true});

      let isAlreadyInCar = false;
      let newCantidad = 0;
      state.car.forEach(itemCar => {
        if (
          JSON.stringify(itemCar.subcategory.id) ===
          JSON.stringify(item.subcategory.id)
        ) {
          isAlreadyInCar = true;
          newCantidad = itemCar.cantidad + item.cantidad;
        }
      });
      if (!isAlreadyInCar) {
        dispatch({type: 'set_item', payload: item});
        await api.post('/shop/setMyShop', {
          user: user!.id,
          car: [...state.car, item],
        });
        dispatch({type: 'add_car_loading', payload: false});
        toast.show('Añadido al carrito', {
          type: 'normal',
          placement: 'top',
          duration: 1500,
          style: {
            borderRadius: 50,
            paddingHorizontal: 20,
            justifyContent: 'center',
            marginTop: height / 2,
          },
          textStyle: {fontSize: 16},
          animationType: 'slide-in',
        });
      } else {
        const oldCarItems = state.car.filter(
          carItem =>
            JSON.stringify(carItem.subcategory.id) !==
            JSON.stringify(item.subcategory.id),
        );
        await api.post('/shop/setMyShop', {
          user: user!.id,
          car: [
            ...oldCarItems,
            {subcategory: item.subcategory, cantidad: newCantidad},
          ],
        });
        dispatch({
          type: 'update_item',
          payload: {...item, cantidad: newCantidad},
        });
        dispatch({type: 'add_car_loading', payload: false});
        toast.show('Actualizado al carrito', {
          type: 'normal',
          placement: 'top',
          duration: 1500,
          style: {
            borderRadius: 50,
            paddingHorizontal: 20,
            justifyContent: 'center',
            marginTop: height / 2,
          },
          textStyle: {fontSize: 16},
          animationType: 'slide-in',
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({type: 'add_car_loading', payload: false});
      dispatch({
        type: 'error_add_car',
        payload: 'Error al agregar al carrito, intente nuevamente',
      });
    }
  };

  const updateCarItem = async (item: CarItemProps) => {
    if (item.cantidad === 0) {
      return unsetItem(item.subcategory);
    }
    try {
      dispatch({type: 'add_car_loading', payload: true});
      const oldCarItems = state.car.filter(
        carItem =>
          JSON.stringify(carItem.subcategory.id) !==
          JSON.stringify(item.subcategory.id),
      );
      await api.post('/shop/setMyShop', {
        user: user!.id,
        car: [...oldCarItems, item],
      });
      dispatch({
        type: 'update_item',
        payload: {...item},
      });
      dispatch({type: 'add_car_loading', payload: false});
      toast.show('Carrito actualizado', {
        type: 'normal',
        placement: 'top',
        duration: 800,
        style: {
          borderRadius: 50,
          paddingHorizontal: 20,
          justifyContent: 'center',
          marginTop: height / 2,
        },
        textStyle: {fontSize: 16},
        animationType: 'slide-in',
      });
    } catch (error) {
      console.log(error);
      dispatch({type: 'add_car_loading', payload: false});
      toast.show('Error al actualizar del carrito, intente más tarde', {
        type: 'normal',
        placement: 'top',
        duration: 3000,
        style: {
          borderRadius: 50,
          paddingHorizontal: 20,
          justifyContent: 'center',
          marginTop: height / 2,
        },
        textStyle: {fontSize: 16},
        animationType: 'slide-in',
      });
    }
  };

  const clearErrorAdd = () => {
    dispatch({type: 'error_add_car', payload: ''});
  };

  const unsetItem = async (item: Subcategory) => {
    try {
      console.log('deletin item');
      dispatch({type: 'add_car_loading', payload: true});
      const newState = state.car.filter(
        carItem => JSON.stringify(carItem.subcategory) !== JSON.stringify(item),
      );
      await api.post('/shop/setMyShop', {user: user!.id, car: [...newState]});
      dispatch({type: 'unset_item', payload: item});
      dispatch({type: 'add_car_loading', payload: false});
      toast.show('Eliminado del carrito', {
        type: 'normal',
        placement: 'top',
        duration: 1000,
        style: {
          borderRadius: 50,
          paddingHorizontal: 20,
          justifyContent: 'center',
          marginTop: height / 2,
        },
        textStyle: {fontSize: 16},
        animationType: 'slide-in',
      });
    } catch (error) {
      console.log(error);

      dispatch({type: 'add_car_loading', payload: false});
      toast.show('Error al eliminar del carrito, intente más tarde', {
        type: 'normal',
        placement: 'top',
        duration: 3000,
        style: {
          borderRadius: 50,
          paddingHorizontal: 20,
          justifyContent: 'center',
          marginTop: height / 2,
        },
        textStyle: {fontSize: 16},
        animationType: 'slide-in',
      });
    }
  };

  const emptyCar = async (): Promise<any> => {
    try {
      api.post('/shop/setMyShop', {user: user!.id, car: []});
      dispatch({type: 'empty_car'});
    } catch (error) {
      console.log('Empty car error');
      console.log(error);
    }
  };

  const makeShop = async (
    total: number,
    description: string,
    totalPaqReCalc: number,
    prices: Prices,
    selectedCarnet: string[],
    relleno: RellenoInterface,
  ): Promise<boolean> => {
    try {
      dispatch({type: 'add_car_loading', payload: true});
      const authorized = await api.get<User>(`/users/getOne/${user?.id}`);
      if (!authorized.data.authorized) {
        const a = await api.post('/orders/setOrder', {
          user: user!.id,
          cost: total,
          car: state.car,
          description,
          totalPaqReCalc,
          prices,
          selectedCarnet,
          relleno,
        });
        if (a.status === 201) {
          dispatch({type: 'empty_car'});
          dispatch({type: 'add_car_loading', payload: false});
          return true;
        } else {
          dispatch({type: 'add_car_loading', payload: false});
          return false;
        }
      } else {
        dispatch({type: 'add_car_loading', payload: false});
        toast.show('Error al realizar la compra', {
          type: 'normal',
          placement: 'top',
          duration: 3000,
          style: {
            borderRadius: 50,
            paddingHorizontal: 20,
            justifyContent: 'center',
            marginTop: height / 2,
          },
          textStyle: {fontSize: 16},
          animationType: 'slide-in',
        });
        return false;
      }
    } catch (error) {
      console.log(error);

      dispatch({type: 'add_car_loading', payload: false});
      toast.show('Error al realizar la compra', {
        type: 'normal',
        placement: 'top',
        duration: 3000,
        style: {
          borderRadius: 50,
          paddingHorizontal: 20,
          justifyContent: 'center',
          marginTop: height / 2,
        },
        textStyle: {fontSize: 16},
        animationType: 'slide-in',
      });
      return false;
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
        clearErrorAdd,
        updateCarItem,
      }}>
      {children}
    </ShopContext.Provider>
  );
};

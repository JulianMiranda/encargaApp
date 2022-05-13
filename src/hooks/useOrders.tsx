import React, {useState, useEffect, useContext} from 'react';
import api from '../api/api';
import {AuthContext} from '../context/auth/AuthContext';
import {Order, OrderResponse} from '../interfaces/Order.interface';

export const useOrders = () => {
  const {user} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);

  const loadOrders = async () => {
    const body = {
      filter: {user: ['=', user?.id]},
    };
    try {
      const resp = await api.post<OrderResponse>('/orders/getList', body);
      setOrders(resp.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return {
    isLoading,
    orders,
  };
};

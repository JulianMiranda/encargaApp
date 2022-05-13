import React, {useState, useEffect, useContext} from 'react';
import api from '../api/api';
import {AuthContext} from '../context/auth/AuthContext';
import {Carnet, CarnetResponse} from '../interfaces/CarnetResponse.interface';

export const useCarnets = () => {
  const {user} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [carnets, setCarnets] = useState<Carnet[]>([]);

  const loadCarnets = async () => {
    const body = {
      filter: {user: ['=', user?.id]},
    };
    try {
      const resp = await api.post<CarnetResponse>('/carnets/getList', body);
      setCarnets(resp.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCarnets();
  }, []);

  return {
    isLoading,
    carnets,
  };
};

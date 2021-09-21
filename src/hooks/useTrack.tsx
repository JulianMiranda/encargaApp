import {useState, useEffect, useContext} from 'react';
import api from '../api/api';
import { AuthContext } from '../context/auth/AuthContext';
import { User } from '../interfaces/User.interface';

export const useTrack = (id: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [codes, setCodes] = useState<string[]>([]);

  const loadSubcategories = async () => {
    const {user} = useContext(AuthContext);
    try {
      const resp = await api.get<User>('/orders/getList'+user?.id  );
      //setCodes(resp.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
    
  };

  useEffect(() => {
    loadSubcategories();
  }, []);

  return {
    isLoading,
    codes,
  };
};

import {useState, useEffect, useContext} from 'react';
import api from '../api/api';
import { AuthContext } from '../context/auth/AuthContext';
import { User } from '../interfaces/User.interface';

export const useTrack = () => {
  const [isLoading, setIsLoading] = useState(false);
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

  const deleteCode = async (deletecode: string) => {
    const {user} = useContext(AuthContext);
    try {
      if(user){

        const newCodes = user.codes.filter((code)=> code !== deletecode );
      
       
      }
     
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
    
  };

  return {
    isLoading,
    codes,
    deleteCode
  };
};

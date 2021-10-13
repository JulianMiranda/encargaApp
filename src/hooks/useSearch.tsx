import {useState, useEffect} from 'react';
import api from '../api/api';
import {
  SubcategoryResp,
  Subcategory,
} from '../interfaces/Subcategory.interface';

export const useSearch = (term: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Subcategory[]>([]);

  const loadSubcategories = async () => {
    const body = {      
                
        docsPerPage:  10,
        sort: "desc",
        search: {text: term, fields: ["name"]},
        population: [
          {
            path: 'category',
            filter: {status: true},
            fields: {
              name: true,
            },
          },
          {
            path: 'images',
            filter: {status: true},
            fields: {
              url: true,
            },
          },
        ],
      };
    
    try {
        api.post<SubcategoryResp>('/subcategories/getList',body)
            
        .then((response) => {
            setProducts(response.data.data);
        });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
    
  };

  /* useEffect(() => {
    loadSubcategories();
  }, []); */

  return {
    isLoading,
    products,
  };
};

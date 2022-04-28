import {useEffect, useState} from 'react';
import api from '../api/api';

import {CategoriesPaginated, Category} from '../interfaces/Category.interface';
import {Datum, PromoResponse} from '../interfaces/Promo.interface';

export const useHome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mostSale, setMostSale] = useState<any[]>([]);
  const [mostSaleLastMonth, setMostSaleLastMonth] = useState<any[]>([]);
  const [lastSubcategories, setLastSubcategories] = useState<any[]>([]);
  const [imagesPromo, setImagesPromo] = useState<string[]>([]);

  const loadHome = async () => {
    setIsLoading(true);

    try {
      const resp = await api.post<any>('/queries/home');
      const body = {
        population: [
          {
            path: 'image',
            fields: {
              url: true,
            },
          },
        ],
      };
      const promos = await api.post<PromoResponse>('/promotions/getList', body);
      const images = promos.data.data.map((promo: Datum) => promo.image.url);
      setImagesPromo(images);
      setMostSale(resp.data.data[0]);
      setMostSaleLastMonth(resp.data.data[1]);
      setLastSubcategories(resp.data.data[2]);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadHome();
  }, []);

  return {
    isLoading,
    mostSale,
    mostSaleLastMonth,
    lastSubcategories,
    imagesPromo,
    loadHome,
  };
};

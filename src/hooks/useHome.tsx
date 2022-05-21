import {useEffect, useState} from 'react';
import api from '../api/api';

import {CategoriesPaginated, Category} from '../interfaces/Category.interface';
import {Datum, PromoResponse} from '../interfaces/Promo.interface';

export const useHome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [offers, setOffers] = useState<any[]>([]);
  const [mostSaleLastMonth, setMostSaleLastMonth] = useState<any[]>([]);
  const [lastSubcategories, setLastSubcategories] = useState<any[]>([]);
  const [imagesPromo, setImagesPromo] = useState<string[]>([]);
  const [errorHome, setErrorHome] = useState<boolean>(false);

  const loadHome = async () => {
    setIsLoading(true);
    setErrorHome(false);
    try {
      const body = {
        filter: {status: ['=', true]},
        population: [
          {
            path: 'image',
            fields: {
              url: true,
            },
          },
        ],
      };
      const [promos, resp] = await Promise.all([
        api.post<PromoResponse>('/promotions/getList', body),
        api.post<any>('/queries/home'),
      ]);

      const images = promos.data.data.map((promo: Datum) => promo.image.url);
      setImagesPromo(images);

      setOffers(resp.data[0]);
      setMostSaleLastMonth(resp.data[1]);
      setLastSubcategories(resp.data[2]);

      setIsLoading(false);
    } catch (error) {
      setErrorHome(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadHome();
  }, []);

  return {
    isLoading,
    offers,
    mostSaleLastMonth,
    lastSubcategories,
    imagesPromo,
    loadHome,
    errorHome,
  };
};

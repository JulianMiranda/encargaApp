import {useEffect, useState} from 'react';
import api from '../api/api';

import {Datum, PromoResponse} from '../interfaces/Promo.interface';
import {
  PromoFinal,
  PromoFinalResponse,
} from '../interfaces/PromoFinal.interface';

export const useHome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [offers, setOffers] = useState<any[]>([]);
  const [mostSaleLastMonth, setMostSaleLastMonth] = useState<any[]>([]);
  const [lastSubcategories, setLastSubcategories] = useState<any[]>([]);
  const [imagesPromo, setImagesPromo] = useState<string[]>([]);
  const [imagesPromoFinal, setImagesPromoFinal] = useState<PromoFinal[]>([]);
  const [errorHome, setErrorHome] = useState<boolean>(false);

  const loadHome = async () => {
    setIsLoading(true);
    setErrorHome(false);
    try {
      const body = {
        filter: {status: ['=', true]},
        sort: {updatedAt: 'ASC'},
        population: [
          {
            path: 'image',
            fields: {
              url: true,
            },
          },
        ],
      };
      const bodyFinal = {
        filter: {status: ['=', true]},
        sort: {updatedAt: 'ASC'},
        population: [
          {
            path: 'image',
            fields: {
              url: true,
            },
          },
          {
            path: 'subcategory',
            fields: {
              status: true,
              soldOut: true,
              name: true,
              category: true,
              createdAt: true,
              updatedAt: true,
              images: true,
              description: true,
              aviableSizes: true,
              id: true,
              price: true,
              priceGalore: true,
              priceDiscount: true,
              priceGaloreDiscount: true,
              weight: true,
              currency: true,
              aviableColors: true,
            },
            populate: [
              {
                path: 'images',
                fields: {
                  url: true,
                },
              },
            ],
          },
        ],
      };
      const [promos, resp, promoFinal] = await Promise.all([
        api.post<PromoResponse>('/promotions/getList', body),
        api.post<any>('/queries/home'),
        api.post<PromoFinalResponse>('/promotionsFinal/getList', bodyFinal),
      ]);

      const images = promos.data.data.map((promo: Datum) => promo.image.url);
      setImagesPromo(images);

      setImagesPromoFinal(promoFinal.data.data);

      setOffers(resp.data[0]);
      setMostSaleLastMonth(resp.data[1]);
      setLastSubcategories(resp.data[2]);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
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
    imagesPromoFinal,
    loadHome,
    errorHome,
  };
};

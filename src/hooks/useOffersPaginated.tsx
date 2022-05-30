import {useState, useEffect, useRef} from 'react';
import api from '../api/api';
import {
  SubcategoryResp,
  Subcategory,
} from '../interfaces/Subcategory.interface';

export const useOffersPaginated = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const nextPage = useRef(1);
  const totalPages = useRef(2);

  const loadSubcategories = async () => {
    const body = {
      filter: {
        priceDiscount: ['>', 0],
        priceGaloreDiscount: ['>', 0],
        status: ['=', true],
      },
      docsPerPage: 12,
      sort: 'ASC',
      page: nextPage.current,
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
          options: {sort: {updatedAt: 1}},
        },
      ],
    };
    try {
      if (nextPage.current <= totalPages.current + 2) {
        setIsLoading(true);
        const resp = await api.post<SubcategoryResp>(
          '/subcategories/getList',
          body,
        );

        nextPage.current = resp.data.page + 1;
        totalPages.current = resp.data.totalPages;
        setSubcategories([...subcategories, ...resp.data.data]);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSubcategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
    subcategories,
    loadSubcategories,
  };
};

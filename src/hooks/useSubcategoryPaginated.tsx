import {useState, useEffect, useRef} from 'react';
import api from '../api/api';
import {
  SubcategoryResp,
  Subcategory,
} from '../interfaces/Subcategory.interface';

export const useSubcategoryPaginated = (id: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const nextPage = useRef(1);
  const totalPages = useRef(2);

  const loadSubcategories = async () => {
    const body = {
      filter: {category: ['=', id], status: ['=', true]},
      docsPerPage: 10,
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

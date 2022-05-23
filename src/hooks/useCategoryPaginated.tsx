import {useEffect, useRef, useState} from 'react';
import api from '../api/api';

import {CategoriesPaginated, Category} from '../interfaces/Category.interface';

export const useCategoryPaginated = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const nextPage = useRef(1);
  const totalPages = useRef(2);

  const loadCategories = async () => {
    setIsLoading(true);
    const body = {
      filter: {status: ['=', true]},
      page: nextPage.current,
      sort: {createdAt: 'ASC'},
      population: [
        {
          path: 'image',
          fields: {
            url: true,
          },
        },
      ],
    };
    try {
      if (nextPage.current <= totalPages.current + 2) {
        setIsLoading(true);

        const resp = await api.post<CategoriesPaginated>(
          '/categories/getList',
          body,
        );

        nextPage.current = resp.data.page + 1;
        totalPages.current = resp.data.totalPages;
        setCategoryList([...categoryList, ...resp.data.data]);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return {
    isLoading,
    categoryList,
    loadCategories,
  };
};

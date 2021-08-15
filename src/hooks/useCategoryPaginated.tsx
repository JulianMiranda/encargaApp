import {useEffect, useState} from 'react';
import api from '../api/api';

import {CategoriesPaginated, Category} from '../interfaces/Category.interface';

export const useCategoryPaginated = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  const loadCategories = async () => {
    setIsLoading(true);
    const body = {
      filter: {status: ['=', true]},
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
    const resp = await api.post<CategoriesPaginated>(
      '/categories/getList',
      body,
    );

    setCategoryList([...categoryList, ...resp.data.data]);
    setIsLoading(false);
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

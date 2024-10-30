import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig/instanc';
import { Product } from '../types/product';

const useAllProducts = (page: number = 1) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/products?page=${page}&limit=8`,
        );
        setProducts(response.data.data);
        console.log('productssss', response.data.data);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  return { products, loading, error };
};

export default useAllProducts;

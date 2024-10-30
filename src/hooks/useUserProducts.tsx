// hooks/useProducts.ts
import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig/instanc';
import { Product } from '../types/product';

const useUserProducts = (userId: number) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/api/products/users/${userId}`,
        );
        setProducts(response.data.data);
        // console.log(response.data.data);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching products.');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [userId]);

  return { products, loading, error };
};

export default useUserProducts;

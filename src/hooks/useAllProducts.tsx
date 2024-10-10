import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig/instanc';

interface Product {
  id: number;
  product_name: string;
  price: string;
  date: string;
  thumbnail: string;
  is_banned: number;
  isActivated: number;
  author: string;
  category_name: string;
}

const useAllProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get(
          '/api/products?page=0&limit=8',
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
  }, []);

  return { products, loading, error };
};

export default useAllProducts;

// hooks/useProducts.ts
import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig/instanc';

// Define the Product interface
interface Product {
  price: string;
  id: number;
  date: string;
  thumbnail: string;
  videos: string[];
  isActivated: number;
  is_banned: number;
  date_of_ban: string | null;
  ban_reason: string | null;
  images: string[];
  author: string;
  author_id: number;
  product_name: string;
  oc_product_description_description: string;

  category_name: string;
  category_id: number;
  category_description: string;
}

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

import { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../../axiosConfig/instanc';

// Define the types for product and response data
interface Product {
  price: string;
  id: number;
  date: string;
  thumbnail: string;
  videos: string | null;
  isActivated: number;
  is_banned: number;
  date_of_ban: string | null;
  ban_reason: string | null;
  author: string;
  author_id: number;
  product_name: string;
  oc_product_description_description: string;
  category_name: string;
  category_id: number;
  category_description: string;
  images: string[];
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: Product[];
}

interface UseFetchProductsByType {
  products: Product[] | null;
  loading: boolean;
  error: string | null;
}

const useProductsByType = (
  type: string,
  page: number = 1,
  limit = 8,
): UseFetchProductsByType => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Define async function to call the API
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get<ApiResponse>(
          `/api/products/type/${type}?page=${page}&limit=${limit}`,
        );

        // Check if the response is successful and update state
        if (response.data.success) {
          setProducts(response.data.data);
        } else {
          setError('Failed to fetch products');
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [type, page, limit]);

  return { products, loading, error };
};

export default useProductsByType;

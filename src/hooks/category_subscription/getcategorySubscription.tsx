import { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../../axiosConfig/instanc';

interface CategorySubscription {
  category_subscription_id: number;
  customer_id: number;
  oc_category_id: number;
  oc_sub_category_id: number;
  transaction_image: string;
  verification_period: number;
  verified_by: number;
  verified_at: string | null;
  STATUS: string;
  created_at: string;
  name: string;
  category_name: string;
  sub_name: string;
}

interface UseCategorySubscriptionsReturn {
  data: CategorySubscription[] | null;
  loading: boolean;
  error: string | null;
}

const useCategorySubscriptions = (): UseCategorySubscriptionsReturn => {
  const [data, setData] = useState<CategorySubscription[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategorySubscriptions = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/category_subscription?page=0&limit=8&q=3`,
        );
        setData(response.data.data); // Assuming data is inside `data`
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchCategorySubscriptions();
  }, []);

  return { data, loading, error };
};

export default useCategorySubscriptions;

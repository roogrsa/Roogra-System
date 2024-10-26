import { useState, useEffect } from 'react';
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

interface UseCategorySubscriptionsByStatusReturn {
  data: CategorySubscription[] | null;
  loading: boolean;
  error: string | null;
}

const useCategorySubscriptionsByStatus = (
  status: string,
  currentPage: number,
): UseCategorySubscriptionsByStatusReturn => {
  const [data, setData] = useState<CategorySubscription[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategorySubscriptionsByStatus = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/category_subscription/status/${status}?page=${currentPage}&limit=8`,
        );
        setData(response.data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchCategorySubscriptionsByStatus();
  }, [status, currentPage]); // Re-fetch data when `status` changes

  return { data, loading, error };
};

export default useCategorySubscriptionsByStatus;

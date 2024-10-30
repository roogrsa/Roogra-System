import { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig/instanc';
import { useParams } from 'react-router-dom';
import { CategorySubscription } from '../../types/CategorySubscription';

interface UseCategorySubscriptionsByStatusReturn {
  data: CategorySubscription[] | null;
  loading: boolean;
  error: string | null;
}

const CategorySubscriptionsByUserid = (
  status: string,
  //   currentPage: number,
): UseCategorySubscriptionsByStatusReturn => {
  console.log(status);

  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<CategorySubscription[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategorySubscriptionsByStatus = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/category_subscription/users/${id}`,
        );
        setData(response.data.data);
        // console.log(response.data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchCategorySubscriptionsByStatus();
  }, [status]); // Re-fetch data when `status` changes

  return { data, loading, error };
};

export default CategorySubscriptionsByUserid;

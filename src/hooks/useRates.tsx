import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig/instanc';

interface UserRate {
  rating: number;
  comment: string | null;
  date_added: string;
  name: string;
  customer_id: number;
}

interface UseUserRatesReturn {
  data: UserRate[] | null;
  loading: boolean;
  error: string | null;
}

const useUserRates = (): UseUserRatesReturn => {
  const [data, setData] = useState<UserRate[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRates = async () => {
      try {
        const response = await axiosInstance.get(`/api/users/74/rates`);
        setData(response.data.data);
        console.log(response.data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchUserRates();
  }, []);

  return { data, loading, error };
};

export default useUserRates;

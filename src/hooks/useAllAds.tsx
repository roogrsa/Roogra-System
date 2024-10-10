import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig/instanc';

interface Ad {
  id: number;
  name: string;
  image: string;
  url: string;
  period: number;
  created_at: string;
}

const useAllAds = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axiosInstance.get('/api/ads');
        setAds(response.data.data);
        // console.log('ads', response.data.data);
      } catch (err) {
        setError('Failed to fetch ads');
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  return { ads, loading, error };
};

export default useAllAds;

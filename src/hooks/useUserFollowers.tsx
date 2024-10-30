import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig/instanc';
import { Follower } from '../types/follower';

interface FollowersApiResponse {
  success: boolean;
  message: string;
  data: Follower[];
}

interface UseFollowersResult {
  followers: Follower[];
  loading: boolean;
  error: string | null;
}

const useFollowers = (userId: number): UseFollowersResult => {
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFollowers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get<FollowersApiResponse>(
          `/api/users/${userId}/followers`,
        );
        const { data } = response.data;
        setFollowers(data);
        // console.log(data);
      } catch (err) {
        setError('Failed to fetch followers');
      } finally {
        setLoading(false);
      }
    };

    fetchFollowers();
  }, [userId]);

  return { followers, loading, error };
};

export default useFollowers;

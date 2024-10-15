import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig/instanc';

// Define types based on API response
interface IsActivated {
  account: boolean;
  email: boolean;
}

interface Follower {
  id: number;
  name: string;
  email: string;
  phone: string;
  telephone: string;
  type: string;
  isActivated: IsActivated;
  status: number;
  isBanned: boolean;
  ban_reason: string;
  regDate: string;
  address: string;
  countery_id: number | null;
  bio: string;
  rating: number;
  image: string;
  alias: string;
}

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
        console.log(data);
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

import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig/instanc'; // Import the axios config

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  telephone: string;
  type: 'customer' | 'advertiser';
  isActivated: {
    account: boolean;
    email: boolean;
  };
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

interface UseUserResponse {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const useUser = (id: number): UseUserResponse => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);

        // Use axiosInstance for the GET request
        const response = await axiosInstance.get(`/api/users/${id}`);
        const { success, data } = response.data;
        // console.log(data);

        if (success) {
          setUser(data);
        } else {
          setError('Failed to fetch user data');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch product');
      } finally {
        setLoading(false);
      }
      //   } catch (err) {
      //     // Customize error handling based on the error object
      //     if (axiosInstance.isAxiosError(err)) {
      //       setError(err.response?.data?.message || 'Error fetching user data');
      //     } else {
      //       setError('Unexpected error occurred');
      //     }
      //   } finally {
      //     setLoading(false);
      //   }
    };

    fetchUser();
  }, [id]);

  return { user, loading, error };
};

export default useUser;

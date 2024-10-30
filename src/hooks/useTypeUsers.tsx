import { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig/instanc';
import { User } from '../types/user';

interface ApiResponse {
  success: boolean;
  message: string;
  data: User[];
}

const useFetchUsers = (
  type: 'customer' | 'advertiser',
  page: number = 0,
  limit: number = 8,
) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get<ApiResponse>(
          `/api/users/type/${type}?page=${page}&limit=${limit}`,
        );
        if (response.data.success) {
          setUsers(response.data.data);
          console.log('customers', response.data.data);
        } else {
          setError(response.data.message || 'Error fetching users');
        }
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [type, page, limit]);

  return { users, loading, error };
};

export default useFetchUsers;

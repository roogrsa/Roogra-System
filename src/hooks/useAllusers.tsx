import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig/instanc';
import { User } from '../types/user';

interface ApiResponse {
  success: boolean;
  message: string;
  data: User[];
}

const useUsers = (page: number = 0) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get<ApiResponse>(
          `/api/users?page=${page}&limit=8`,
        );
        if (response.data.success) {
          setUsers(response.data.data);
          console.log(response.data.data);
        } else {
          setError('Failed to fetch users');
        }
      } catch (err) {
        setError('Error fetching data');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page]);

  return { users, loading, error };
};

export default useUsers;

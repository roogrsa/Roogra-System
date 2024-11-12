import { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig/instanc';
import { User } from '../../types/user';

interface ApiResponse {
  success: boolean;
  message: string;
  data: User[];
}

const useUsers = (page: number = 0 , userName:string='') => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get<ApiResponse>(
        `/api/users?page=${page}&limit=8`,{
          params:{
            q:userName || ''
          }
        },
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
  useEffect(() => {
    fetchUsers();
  }, [page]);
  const refreshUsers = () => {
    fetchUsers();
  };

  return { users, loading, error, refreshUsers };
};

export default useUsers;

import { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../axiosConfig/instanc';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  telephone: string;
  type: string; // 'customer' or 'advertiser'
  isActivated: {
    account: boolean;
    email: boolean;
  };
  status: number;
  isBanned: boolean;
  ban_reason: string;
  regDate: string;
  address: string;
  country_id: number | null;
  bio: string;
  rating: number | string;
  image: string;
  alias: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: User[];
}

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get<ApiResponse>('/api/users');
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
  }, []);

  return { users, loading, error };
};

export default useUsers;

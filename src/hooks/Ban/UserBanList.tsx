import { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig/instanc';

const useBannedUsers = () => {
  const [bannedUsers, setBannedUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchBannedUsers = async () => {
    try {
      const response = await axiosInstance.get(
        '/api/users/banned?page=0&limit=8',
      );
      if (response.data.success) {
        setBannedUsers(response.data.data.banned);
        // console.log(response.data.data.banned);
      } else {
        throw new Error(
          response.data.message || 'Failed to fetch banned chats',
        );
      }
    } catch (err) {
      console.log(err);

      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBannedUsers();
  }, []);
  // Expose refresh function to manually update banned products list
  const refreshBannedUsers = () => {
    fetchBannedUsers();
  };

  return { bannedUsers, loading, error, refreshBannedUsers };
};

export default useBannedUsers;

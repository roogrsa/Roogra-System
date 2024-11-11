import { useState } from 'react';
import axiosInstance from '../../axiosConfig/instanc';

const useBanAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const banAdmin = async (adminId: number, reason: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.patch(`/api/admins/${adminId}`, {
        key: reason,
      });

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Failed to ban user with ID: ${adminId}`);
      }

      // console.log('Admin banned:', response.data);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { banAdmin, loading, error };
};

export default useBanAdmin;

import { useState } from 'react';
import axiosInstance from '../axiosConfig/instanc'; // Ensure correct path to axios instance

const useBanAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const banAdmin = async (adminId: number, reason: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.patch(`/api/admins/${adminId}`, {
        key: reason, // Sending the reason as part of the body
      });

      // Check if the response status is in the successful range (200-299)
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Failed to ban user with ID: ${adminId}`);
      }

      console.log('Admin banned:', response.data);
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

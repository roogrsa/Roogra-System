import { useState } from 'react';
import axiosInstance from '../../axiosConfig/instanc';

const useUnBanChat = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const unbanChat = async (chatId: number, reason: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.patch(`/api/chats/${chatId}`, {
        key: reason,
      });

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Failed to ban user with ID: ${chatId}`);
      }

      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { unbanChat, loading, error };
};

export default useUnBanChat;

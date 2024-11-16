import { useState } from 'react';
import axiosInstance from '../../axiosConfig/instanc';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const useRemoveUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const removeUser = async (userId: number) => {
    const { t } = useTranslation();

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axiosInstance.delete(`/api/users/${userId}`);

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Failed to remove user with ID: ${userId}`);
      }

      const responseData = response.data;

      if (responseData.success) {
        setSuccess(true);
        toast.success(t('toast.deleted'));
      } else {
        throw new Error(`API response unsuccessful: ${responseData.message}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      toast.error(t('toast.error'));
    } finally {
      setLoading(false);
    }
  };

  return { removeUser, loading, error, success };
};

export default useRemoveUser;

import { useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../axiosConfig/instanc';

interface UseDeleteAdminsReturn {
  deleteAdmins: (adminIds: number[]) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
}

const useDeleteAdmins = (): UseDeleteAdminsReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const deleteAdmins = async (adminIds: number[]): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    const queryParams = adminIds.map((id) => `admins[]=${id}`).join('&');
    const url = `/api/admins/delete?${queryParams}`;

    try {
      const response = await axiosInstance.delete(url);
      if (response.status === 204) {
        toast.success('Admins successfully deleted');
        setIsSuccess(true);
      } else {
        throw new Error('Failed to delete admins');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'An unknown error occurred');
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteAdmins, isLoading, error, isSuccess };
};

export default useDeleteAdmins;

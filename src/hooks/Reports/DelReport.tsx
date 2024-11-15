import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../axiosConfig/instanc';

const useDeleteReport = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const deleteReport = useCallback(async (type: string, id: number) => {
    setLoading(true);
    try {
      const response = await axiosInstance.delete(
        `/api/reports/type/${type}/${id}`,
      );

      // Handle HTTP 204 status
      if (response.status === 204) {
        toast.success('Report successfully deleted');
        setIsDeleted(true);
        setError(null);
      }
    } catch (err) {
      setIsDeleted(false);
      console.log(err);

      setError(err instanceof Error ? err.message : 'An error occurred');
      toast.error(err.response?.data?.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const resetDeleteStatus = () => setIsDeleted(false);

  return { loading, error, isDeleted, deleteReport, resetDeleteStatus };
};

export default useDeleteReport;

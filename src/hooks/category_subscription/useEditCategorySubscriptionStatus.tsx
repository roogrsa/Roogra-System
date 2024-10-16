import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import axiosInstance from '../../axiosConfig/instanc';

interface EditResponse {
  status: string;
}

interface EditCategorySubscriptionStatusResult {
  editCategorySubscriptionStatus: (
    id: number,
    newStatus: string,
  ) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const useEditCategorySubscriptionStatus =
  (): EditCategorySubscriptionStatusResult => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const editCategorySubscriptionStatus = async (
      id: number,
      newStatus: string,
    ): Promise<void> => {
      setLoading(true);
      setError(null);
      setSuccess(false);

      try {
        const response = await axiosInstance.patch<EditResponse>(
          `/api/category_subscription/${id}`,
          {
            status: newStatus, // Updating the status field only
          },
        );

        if (response.status === 200) {
          setSuccess(true);
        }
      } catch (err) {
        const axiosError = err as AxiosError;
        setError(axiosError.response?.data?.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    return { editCategorySubscriptionStatus, loading, error, success };
  };

export default useEditCategorySubscriptionStatus;

import { useState } from 'react';
import axiosInstance from '../../axiosConfig/instanc';
import { toast } from 'react-toastify';

interface EditResponse {
  status: string;
}

interface EditVerificationRequestResult {
  EditVerificationRequest: (id: number, newStatus: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const useEditVerificationRequest = (): EditVerificationRequestResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const EditVerificationRequest = async (
    id: number,
    newStatus: string,
  ): Promise<void> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axiosInstance.patch<EditResponse>(
        `/api/verification_request/${id}`,
        {
          status: newStatus,
        },
      );

      if (response.status === 200) {
        setSuccess(true);
        toast.success(`updated sucessfully`);
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.response?.data?.message || 'An error occurred');
      toast.error(`Error updating`);
    } finally {
      setLoading(false);
    }
  };

  return { EditVerificationRequest, loading, error, success };
};

export default useEditVerificationRequest;

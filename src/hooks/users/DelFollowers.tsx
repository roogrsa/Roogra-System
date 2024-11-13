import { useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../axiosConfig/instanc';

interface UseDeleteFollowersReturn {
  deleteFollowers: (userId: number, followersIds: number[]) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
}

const useDeleteFollowers = (): UseDeleteFollowersReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const deleteFollowers = async (
    userId: number,
    followersIds: number[],
  ): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    const queryParams = followersIds.map((id) => `followers[]=${id}`).join('&');
    const url = `/api/users/${userId}/followers-delete?${queryParams}`;

    try {
      console.log(url);

      const response = await axiosInstance.delete(url);
      console.log('response', response);

      if (response.status === 204) {
        toast.success(`Followers successfully deleted`);
        setIsSuccess(true);
      } else {
        throw new Error('Failed to delete followers');
      }
    } catch (err: any) {
      console.log(err);

      toast.error(err.response?.data?.message || 'An unknown error occurred');

      setError(
        err instanceof Error ? err.message : 'An unknown error occurred',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteFollowers, isLoading, error, isSuccess };
};

export default useDeleteFollowers;

import { useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../axiosConfig/instanc';

interface UseDeleteProductsReturn {
  deleteProducts: (productIds: number[]) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
}

const useDeleteProducts = (): UseDeleteProductsReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const deleteProducts = async (productIds: number[]): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    const queryParams = productIds.map((id) => `products[]=${id}`).join('&');
    const url = `/api/products/delete?${queryParams}`;

    try {
      // console.log(url);

      const response = await axiosInstance.delete(url);
      if (response.status === 204) {
        toast.success(`products successfully deleted`);

        setIsSuccess(true);
      } else {
        throw new Error('Failed to delete products');
      }
    } catch (err) {
      console.log(err);

      toast.error(error?.response?.data?.message);

      setError(
        err instanceof Error ? err.message : 'An unknown error occurred',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteProducts, isLoading, error, isSuccess };
};

export default useDeleteProducts;

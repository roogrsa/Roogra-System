import { useState } from 'react';
import axiosInstance from '../axiosConfig/instanc'; // Ensure correct path to axios instance

const useBanProduct = () => {
  const [loadingPrdBan, setLoadingPrdBan] = useState(false);
  const [banPrdError, setError] = useState<string | null>(null);

  const banProduct = async (productId: number, reason: string) => {
    setLoadingPrdBan(true);
    setError(null);
    try {
      const response = await axiosInstance.patch(`/api/products/${productId}`, {
        key: reason, // Sending the reason as part of the body
      });

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Failed to ban product with ID: ${productId}`);
      }

      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      throw err; // Re-throw the error for external handling
    } finally {
      setLoadingPrdBan(false);
    }
  };

  return { banProduct, loadingPrdBan, banPrdError };
};

export default useBanProduct;

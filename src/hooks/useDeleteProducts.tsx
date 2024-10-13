import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const useDeleteProducts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteProducts = async (productIds: number[]) => {
    try {
      setLoading(true);
      setError(null);

      // Construct query string for product IDs
      const queryString = productIds.map((id) => `products[]=${id}`).join('&');
      const apiUrl = `/api/products/delete?${queryString}`;

      // Call the API to delete products
      const response = await axios.delete(apiUrl);

      // Success message
      Swal.fire({
        icon: 'success',
        title: 'Deleted Successfully',
        text: `${productIds.length} products have been deleted successfully.`,
      });

      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');

      // Error message
      Swal.fire({
        icon: 'error',
        title: 'Deletion Failed',
        text: `Failed to delete products. Error: ${error}`,
      });
    } finally {
      setLoading(false);
    }
  };

  return { deleteProducts, loading, error };
};

export default useDeleteProducts;

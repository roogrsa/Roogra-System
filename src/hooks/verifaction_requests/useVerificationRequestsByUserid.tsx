import { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig/instanc';
import { useParams } from 'react-router-dom';

interface VerificationRequest {
  verification_request_id: number;
  customer_id: number;
  verification_type: string;
  verification_type_number: string;
  verification_type_image: string;
  verified: number;
  transaction_image: string;
  verification_period: number;
  verified_by: number;
  verified_at: string | null;
  STATUS: string;
  created_at: string;
  verification_required: number;
  customer_name: string | null;
  name: string | null;
}

interface VerificationRequestResponse {
  success: boolean;
  message: string;
  data: VerificationRequest[];
}

interface UseVerificationRequestsByStatusReturn {
  data: VerificationRequest[] | null;
  loading: boolean;
  error: string | null;
}

const VerificationRequestsByUserid = (
  status: string,
  currentPage: number = 0,
  limit: number = 8,
): UseVerificationRequestsByStatusReturn => {
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<VerificationRequest[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVerificationRequestsByStatus = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error state

      try {
        const response = await axiosInstance.get<VerificationRequestResponse>(
          `/api/verification_request/users/${id}?page=${currentPage}&limit=${limit}`,
        );

        // Handle the success response
        if (response.data.success) {
          setData(response.data.data);
          console.log(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        // Handle errors
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchVerificationRequestsByStatus();
  }, [status, currentPage, limit]); // Re-fetch data when `status`, `currentPage`, or `limit` changes

  return { data, loading, error };
};

export default VerificationRequestsByUserid;

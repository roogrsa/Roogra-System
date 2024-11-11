import { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig/instanc';
import { VerificationRequest } from '../../types/VerificationRequest';

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

const useVerificationRequestsByStatus = (
  status: string,
  currentPage: number = 0,
  query?: string,
  refresh?: boolean, // Optional `refresh` parameter
  limit: number = 8,
): UseVerificationRequestsByStatusReturn => {
  const [data, setData] = useState<VerificationRequest[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVerificationRequestsByStatus = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error state

      try {
        const response = await axiosInstance.get<VerificationRequestResponse>(
          `/api/verification_request/status/${status}?page=${currentPage}&limit=${limit}`, {
          params: {
            q: query || ''
          }
        }
        );

        // Handle the success response
        if (response.data.success) {
          setData(response.data.data);
          // console.log(response.data.data);
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
  }, [status, currentPage, limit, refresh, query]); // Re-fetch data when `status`, `currentPage`, or `limit` changes

  return { data, loading, error };
};

export default useVerificationRequestsByStatus;
// import { useState, useEffect } from 'react';
// import axiosInstance from '../../axiosConfig/instanc';
// import { VerificationRequest } from '../../types/VerificationRequest';

// interface VerificationRequestResponse {
//   success: boolean;
//   message: string;
//   data: VerificationRequest[];
// }

// interface UseVerificationRequestsByStatusReturn {
//   data: VerificationRequest[] | null;
//   loading: boolean;
//   error: string | null;
// }

// const useVerificationRequestsByStatus = (
//   status: string,
//   currentPage: number = 0,
//   limit: number = 8,
//   refresh?: boolean, // Optional `refresh` parameter
// ): UseVerificationRequestsByStatusReturn => {
//   const [data, setData] = useState<VerificationRequest[] | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchVerificationRequestsByStatus = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const response = await axiosInstance.get<VerificationRequestResponse>(
//           `/api/verification_request/status/${status}?page=${currentPage}&limit=${limit}`,
//         );

//         if (response.data.success) {
//           setData(response.data.data);
//         } else {
//           setError(response.data.message);
//         }
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Unknown error occurred');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVerificationRequestsByStatus();
//   }, [status, currentPage, limit, refresh]); // `refresh` can be undefined

//   return { data, loading, error };
// };

// export default useVerificationRequestsByStatus;

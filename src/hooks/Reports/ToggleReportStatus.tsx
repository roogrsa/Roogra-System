// import { useState, useCallback } from 'react';
// import axiosInstance from '../../axiosConfig/instanc';
// import { toast } from 'react-toastify';

// const useToggleReportStatus = () => {
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [status, setStatus] = useState<Record<number, number>>({}); // Store status per report ID
//   const [isSuccess, setIsSuccess] = useState<boolean>(false);

//   const toggleStatus = useCallback(
//     async (type: string, id: number) => {
//       setLoading(true);
//       setIsSuccess(false);

//       try {
//         const currentStatus = status[id] ?? 0;
//         const newStatus = currentStatus === 1 ? 0 : 1;

//         const response = await axiosInstance.patch(
//           `/api/reports/type/${type}/${id}`,
//           {
//             status: newStatus,
//           },
//         );

//         if (response.data.success) {
//           toast.success('Status successfully updated');
//           setStatus((prev) => ({
//             ...prev,
//             [id]: newStatus,
//           }));
//           setIsSuccess(true);
//           setError(null);
//         } else {
//           throw new Error(response.data.message || 'Failed to update status');
//         }
//       } catch (err) {
//         setIsSuccess(false);
//         setError(err instanceof Error ? err.message : 'An error occurred');
//         toast.error(err.response?.data?.message || 'An unknown error occurred');
//       } finally {
//         setLoading(false);
//       }
//     },
//     [status],
//   );

//   return { loading, error, status, isSuccess, toggleStatus };
// };

// export default useToggleReportStatus;
import { useState, useCallback } from 'react';
import axiosInstance from '../../axiosConfig/instanc';
import { toast } from 'react-toastify';

const useToggleReportStatus = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Record<number, number>>({});
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const toggleStatus = useCallback(
    async (type: string, id: number) => {
      setLoading(true);
      setIsSuccess(false);

      try {
        const currentStatus = status[id] ?? 0;
        const newStatus = currentStatus === 1 ? 0 : 1;

        const response = await axiosInstance.patch(
          `/api/reports/type/${type}/${id}`,
          { status: newStatus },
        );

        if (response.data.success) {
          toast.success('Status successfully updated');
          setStatus((prev) => ({
            ...prev,
            [id]: newStatus,
          }));
          setIsSuccess(true);
          setError(null);
        } else {
          throw new Error(response.data.message || 'Failed to update status');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        toast.error('Failed to update status');
      } finally {
        setLoading(false);
      }
    },
    [status],
  );

  return { loading, error, status, isSuccess, toggleStatus, setIsSuccess };
};

export default useToggleReportStatus;

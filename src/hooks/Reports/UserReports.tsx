import { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig/instanc';
import { useParams } from 'react-router-dom';
import { ReportData } from '../../types/ReportData';

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    chats: ReportData[];
    products: ReportData[];
  };
}

// Custom Hook for fetching user reports
export const useUserReports = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id, 'profile');

  const [data, setData] = useState<{
    chats: ReportData[];
    products: ReportData[];
  }>({ chats: [], products: [] });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get<ApiResponse>(
        `/api/reports/users/${id}`,
      );

      if (response.data.success) {
        setData(response.data.data);
        //   console.log('userreportttt', response.data.data);
      } else {
        setError('Failed to fetch reports');
      }
    } catch (err) {
      setError('An error occurred while fetching the data');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchReports();
  }, [id]);
  const refreshUserReports = () => {
    fetchReports();
  };
  return { data, loading, error, refreshUserReports };
};

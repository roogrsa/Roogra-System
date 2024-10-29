import { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig/instanc';
import { useParams } from 'react-router-dom';

// Define the data structure for the response
interface ReportData {
  report_id: number;
  chat_report_id: number;
  customer_id: number;
  product_id: number;
  content: string;
  created_at: string;
  product_name: string;
  reported: string;
  reporter: string;
  status: number;
  close_date: string | null;
  name: string;
}

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

  const [data, setData] = useState<{
    chats: ReportData[];
    products: ReportData[];
  }>({ chats: [], products: [] });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

    fetchReports();
  }, [id]);

  return { data, loading, error };
};

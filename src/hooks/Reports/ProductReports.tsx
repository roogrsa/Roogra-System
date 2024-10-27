import { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../../axiosConfig/instanc';

// Define the data structure for the response
interface ReportData {
  report_id: number;
  customer_id: number;
  product_id: number;
  content: string;
  created_at: string;
  status: number;
  close_date: string | null;
  name: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: ReportData[];
}

// Custom Hook with parameters for type and status
export const useProductReports = (type: string, status: number = 0) => {
  const [data, setData] = useState<ReportData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get<ApiResponse>(
          `/api/reports/type/${type}/status/${status}`,
        );

        if (response.data.success) {
          setData(response.data.data);
          console.log(response.data.data);
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
  }, [type, status]);

  return { data, loading, error };
};

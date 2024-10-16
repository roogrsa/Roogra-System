import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig/instanc';

// Define the type of data you expect from the API response
interface LogData {
  customer_activity_id: number;
  customer_id: number;
  key: string;
  data: string;
  ip: string;
  date_added: string;
}

interface LogsApiResponse {
  success: boolean;
  message: string;
  data: LogData[];
}

// Custom hook to fetch logs
const useLogs = (page: number = 0) => {
  const [logs, setLogs] = useState<LogData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get<LogsApiResponse>(
          `/api/logs?page=${page}&limit=8`,
        );

        if (response.data.success) {
          setLogs(response.data.data);
          // console.log('logs', response.data.data);
        } else {
          setError('Failed to fetch logs');
        }
      } catch (err) {
        setError('An error occurred while fetching logs');
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, [page]);

  return { logs, loading, error };
};

export default useLogs;

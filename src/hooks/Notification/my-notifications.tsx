import { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../../axiosConfig/instanc';

interface Notification {
  system_notification_id: number;
  date_add: string;
  expiry_date: string;
  title: string;
  message: string;
  customers: number;
  advertisers: number;
  admin_group: string;
  sender: number;
  created_at: string;
  delegates: number;
  observers: number;
  supervisors: number;
}

interface NotificationsResponse {
  success: boolean;
  message: string;
  data: Notification[];
}

const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get<NotificationsResponse>(
          '/api/notifications/my-notifications',
        );
        if (response.data.success) {
          setNotifications(response.data.data);
        } else {
          setError(response.data.message || 'Failed to fetch notifications');
        }
      } catch (err) {
        setError('An error occurred while fetching notifications');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return { notifications, loading, error };
};

export default useNotifications;

import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig/instanc';
import { ChartData } from '../types/chart';

const useChartData = () => {
  const [customerChartData, setCustomerChartData] = useState<ChartData | null>(
    null,
  );
  const [advertiserChartData, setAdvertiserChartData] =
    useState<ChartData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axiosInstance.get('/api/users/chart');

        const { customer, advertisers } = response.data.data;

        const customerData: ChartData = {
          series: [customer.active, customer.lazy, customer.inactive],
          labels: ['Active', 'Lazy', 'Inactive'],
          statesData: [
            { label: 'Active', count: customer.active, color: '#5FDD54' },
            { label: 'Lazy', count: customer.lazy, color: '#019CF6' },
            { label: 'Inactive', count: customer.inactive, color: '#D0D0D0' },
          ],
          total: customer.total, // Include total here
        };

        // Advertisers chart data
        const advertiserData: ChartData = {
          series: [advertisers.active, advertisers.lazy, advertisers.inactive],
          labels: ['Active', 'Lazy', 'Inactive'],
          statesData: [
            { label: 'Active', count: advertisers.active, color: '#5FDD54' },
            { label: 'Lazy', count: advertisers.lazy, color: '#019CF6' },
            {
              label: 'Inactive',
              count: advertisers.inactive,
              color: '#D0D0D0',
            },
          ],
          total: advertisers.total, // Include total here
        };

        setCustomerChartData(customerData);
        setAdvertiserChartData(advertiserData);
        setLoading(false);
      } catch (error) {
        setError('Failed to load chart data');
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  return { customerChartData, advertiserChartData, loading, error };
};

export default useChartData;

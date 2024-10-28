import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig/instanc';
import axios, { AxiosError } from 'axios';
import ReusableInput from '../../components/products/ReusableInput';

// Define the response type for the update function
interface UpdatePeriodResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    verification_period: number;
    status: string;
  } | null;
}

// Define the API call function to update verification period and status
const updatePeriod = async (
  id: number,
  newPeriod: number = 4000,
  STATUS: string,
): Promise<UpdatePeriodResponse | void> => {
  try {
    const response = await axiosInstance.patch<UpdatePeriodResponse>(
      `/api/category_subscription/${id}`,
      {
        verification_period: newPeriod,
        status: STATUS,
      },
    );

    if (response.data.success) {
      console.log('Update successful:', response.data.message);
      return response.data;
    } else {
      console.error('Update failed:', response.data.message);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Axios error updating period:',
        (error as AxiosError).message,
      );
    } else {
      console.error('Unexpected error updating period:', error);
    }
  }
};
//
const VerifiedUpdatePeriod = async (
  id: number,
  newPeriod: number = 4000,
  STATUS: string,
): Promise<UpdatePeriodResponse | void> => {
  try {
    const response = await axiosInstance.patch<UpdatePeriodResponse>(
      `/api/verification_request/${id}`,
      {
        verification_period: newPeriod,
        status: STATUS,
      },
    );

    if (response.data.success) {
      console.log('Update successful:', response.data.message);
      return response.data;
    } else {
      console.error('Update failed:', response.data.message);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Axios error updating period:',
        (error as AxiosError).message,
      );
    } else {
      console.error('Unexpected error updating period:', error);
    }
  }
};

// Define the interface for props
interface PeriodInputProps {
  item: {
    verification_period: number;
    category_subscription_id?: number;
    verification_request_id?: number;
    STATUS: string;
  };
}

const PeriodInput: React.FC<PeriodInputProps> = ({ item }) => {
  const [inputValue, setInputValue] = useState<string>(
    `${item.verification_period} ي`,
  );

  useEffect(() => {
    const handleUpdatePeriod = async () => {
      const numericValue = parseInt(inputValue.replace(/\D/g, '')); // Parse numeric value only
      let response;

      if (item.category_subscription_id) {
        response = await updatePeriod(
          item.category_subscription_id,
          numericValue,
          item.STATUS,
        );
      } else if (item.verification_request_id) {
        response = await VerifiedUpdatePeriod(
          item.verification_request_id,
          numericValue,
          item.STATUS,
        );
      }

      if (response && response.success) {
        console.log('Update successful:', response.message);
      } else {
        console.error('Failed to update verification period');
      }
    };

    if (inputValue !== `${item.verification_period} ي`) {
      handleUpdatePeriod();
      console.log('Input Value Updated:', inputValue);
    }
  }, [
    inputValue,
    item.category_subscription_id,
    item.verification_request_id,
    item.STATUS,
  ]); // Dependencies for the effect

  return (
    <ReusableInput
      label=""
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)} // Update state on input change
      widthClass="w-20"
      extraClass="bg-Input-blue text-center"
    />
  );
};

export default PeriodInput;

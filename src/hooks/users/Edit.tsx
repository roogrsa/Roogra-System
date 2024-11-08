import { useState } from 'react';
import axiosInstance from '../../axiosConfig/instanc';
import { User } from '../../types/user';

const useEditUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editUser = async (id: string, updatedData: User) => {
    setLoading(true);
    setError(null);
    console.log(id, updatedData);

    try {
      const response = await axiosInstance.put(`/api/users/${id}`, updatedData);
      setLoading(false);
      console.log(response.data);

      return response.data; // or handle the data as needed
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      console.log(err);
      //   console.log(err.message);

      setLoading(false);
      throw err;
    }
  };

  return { editUser, loading, error };
};

export default useEditUser;

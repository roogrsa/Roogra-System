// import { useState } from 'react';
// import axiosInstance from '../../axiosConfig/instanc';

// interface UpdateVerificationResponse {
//   success: boolean;
//   message?: string;
// }

// const useUpdateVerification = () => {
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const updateVerificationRequired = async (
//     id: string,
//     verificationRequired: number,
//   ): Promise<UpdateVerificationResponse | null> => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axiosInstance.put(
//         `/api/verification_request/${id}`,
//         {
//           verification_required: verificationRequired,
//         },
//       );

//       return { success: true, message: response.data.message };
//     } catch (err: unknown) {
//       setError((err as Error).message);
//       return null;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { updateVerificationRequired, loading, error };
// };

// export default useUpdateVerification;
import { useState } from 'react';
import axiosInstance from '../../axiosConfig/instanc';
import { toast, ToastContainer } from 'react-toastify';

interface UpdateVerificationResponse {
  success: boolean;
  message?: string;
}

const useToggleVerification = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const toggleVerificationRequired = async (
    id: number,
    currentVerificationRequired: number,
  ): Promise<UpdateVerificationResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const newVerificationRequired = currentVerificationRequired === 1 ? 0 : 1;
      //   console.log(newVerificationRequired, 'newVerificationRequired');

      const response = await axiosInstance.put(
        `/api/verification_request/${id}`,
        {
          verified: newVerificationRequired,
        },
      );
      toast.success(`updated sucessfully`);

      return { success: true, message: response.data.message };
    } catch (err: unknown) {
      console.log(err);

      setError((err as Error).message);
      toast.error(`Error updating`);

      return null;
    } finally {
      setLoading(false);
    }
  };

  return { toggleVerificationRequired, loading, error };
};

export default useToggleVerification;

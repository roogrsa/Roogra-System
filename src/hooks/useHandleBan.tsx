import { useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

const useHandleBan = () => {
  const [loading, setLoading] = useState(false);

  const handleBan = async (
    id: number,
    isBanned: boolean,
    banApi: (id: number, reason: string) => Promise<void>,
  ) => {
    const action = isBanned ? 'unban' : 'ban';

    // Show SweetAlert2 prompt to get the reason for banning/unbanning
    const { value: reason } = await Swal.fire({
      title: `Enter the reason for ${action}ning`,
      input: 'textarea',
      inputPlaceholder: `Type the reason to ${action} here...`,
      showCancelButton: true,
      confirmButtonText: `${
        action.charAt(0).toUpperCase() + action.slice(1)
      } Item`,
      cancelButtonText: 'Cancel',
      customClass: {
        popup:
          'bg-secondaryBG-light dark:bg-secondaryBG-dark shadow-lg rounded-lg p-3',
        title: 'text-xl font-bold dark:text-white text-black',
        input: 'border-Input-border block sm:text-sm border p-2 rounded-md',
        confirmButton: 'bg-BlockIconBg text-white font-bold py-2 px-4 rounded',
        cancelButton: 'bg-gray-300 text-black font-bold py-2 px-4 rounded',
      },
    });

    try {
      setLoading(true);
      await banApi(id, reason);

      // Success alert
      Swal.fire({
        icon: 'success',
        title: `${isBanned ? 'Unbanned' : 'Banned'} Successfully`,
        text: `Item ${id} has been ${
          isBanned ? 'unbanned' : 'banned'
        } for: ${reason}`,
        customClass: {
          popup: 'bg-white shadow-lg rounded-lg p-6',
        },
      });

      window.location.reload();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: `Failed to ${isBanned ? 'Unban' : 'Ban'} Item`,
        text: `Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
        customClass: {
          popup: 'bg-white shadow-lg rounded-lg p-6',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return { handleBan, loading };
};

export default useHandleBan;

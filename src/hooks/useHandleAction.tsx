// import { useState } from 'react';
// import Swal from 'sweetalert2';
// import 'sweetalert2/src/sweetalert2.scss';

// const useHandleAction = () => {
//   const [loading, setLoading] = useState(false);

//   const handleAction = async (
//     id: number,
//     isBanned: boolean,
//     actionType: 'ban' | 'remove',
//     apiCall: (id: number, reason?: any) => Promise<void>,
//     buttonClasses: { confirmButtonClass: string; cancelButtonClass: string }, // Pass button classes as argument
//   ) => {
//     let action = actionType === 'ban' ? (isBanned ? 'unban' : 'ban') : 'remove';

//     let messageTitle = '';
//     let messageText = '';
//     let confirmButtonText = '';

//     if (actionType === 'ban') {
//       if (isBanned) {
//         messageTitle = 'Confirm Unban';
//         messageText = `Are you sure you want to unban   ID: ${id}?`;
//         confirmButtonText = 'Unban ';
//       } else {
//         messageTitle = 'Confirm Ban';
//         messageText = `Are you sure you want to ban   ID: ${id}?`;
//         confirmButtonText = 'Ban ';
//       }
//     } else if (actionType === 'remove') {
//       messageTitle = 'Confirm Removal';
//       messageText = `Are you sure you want to remove  ID: ${id}? This action cannot be undone.`;
//       confirmButtonText = 'Remove ';
//     }

//     const { isConfirmed, value: reason } = await Swal.fire({
//       title: messageTitle,
//       text: messageText,
//       input: actionType === 'ban' ? 'textarea' : undefined,
//       inputPlaceholder:
//         actionType === 'ban' ? 'Enter reason for ban/unban here...' : undefined,
//       showCancelButton: true,
//       confirmButtonText: confirmButtonText,
//       cancelButtonText: 'Cancel',
//       customClass: {
//         popup:
//           'bg-secondaryBG-light dark:bg-secondaryBG-dark shadow-lg rounded-lg p-3',
//         title: 'text-xl font-bold dark:text-white text-black',
//         input: 'border-Input-border block sm:text-sm border p-2 rounded-md',
//         confirmButton: `text-white font-bold py-2 px-4 rounded
// ${buttonClasses.confirmButtonClass}`, // Use passed confirm button class
//         cancelButton: `bg-gray-300 text-black font-bold py-2 px-4 rounded${buttonClasses.cancelButtonClass}`, // Use passed cancel button class
//       },
//     });

//     if (!isConfirmed) {
//       return;
//     }

//     try {
//       setLoading(true);
//       await apiCall(id, reason);

//       Swal.fire({
//         icon: 'success',
//         title: `${
//           actionType === 'ban' ? (isBanned ? 'Unbanned' : 'Banned') : 'Removed'
//         } Successfully`,
//         text: `User ${id} has been ${
//           actionType === 'ban' ? (isBanned ? 'unbanned' : 'banned') : 'removed'
//         }${actionType === 'ban' ? ` for: ${reason}` : ''}.`,
//         customClass: {
//           popup: 'bg-white shadow-lg rounded-lg p-6',
//         },
//       });

//       window.location.reload();
//     } catch (err) {
//       Swal.fire({
//         icon: 'error',
//         title: `Failed to ${
//           actionType === 'ban' ? (isBanned ? 'Unban' : 'Ban') : 'Remove'
//         } User`,
//         text: `Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
//         customClass: {
//           popup: 'bg-white shadow-lg rounded-lg p-6',
//         },
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { handleAction, loading };
// };

// export default useHandleAction;

import { useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

const useHandleAction = () => {
  const [loading, setLoading] = useState(false);

  const handleAction = async (
    id: number,
    isBanned: boolean,
    actionType: 'ban' | 'remove',
    apiCall: (id: number, reason?: any) => Promise<void>,
    buttonClasses: { confirmButtonClass: string; cancelButtonClass: string },
    onComplete?: () => void,
  ) => {
    let action = actionType === 'ban' ? (isBanned ? 'unban' : 'ban') : 'remove';

    let messageTitle = '';
    let messageText = '';
    let confirmButtonText = '';

    if (actionType === 'ban') {
      if (isBanned) {
        messageTitle = 'Confirm Unban';
        messageText = `Are you sure you want to unban ID: ${id}?`;
        confirmButtonText = 'Unban';
      } else {
        messageTitle = 'Confirm Ban';
        messageText = `Are you sure you want to ban ID: ${id}?`;
        confirmButtonText = 'Ban';
      }
    } else if (actionType === 'remove') {
      messageTitle = 'Confirm Removal';
      messageText = `Are you sure you want to remove ID: ${id}? This action cannot be undone.`;
      confirmButtonText = 'Remove';
    }

    const { isConfirmed, value: reason } = await Swal.fire({
      title: messageTitle,
      text: messageText,
      input: actionType === 'ban' ? 'textarea' : undefined,
      inputPlaceholder:
        actionType === 'ban' ? 'Enter reason for ban/unban here...' : undefined,
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: 'Cancel',
      customClass: {
        popup:
          'bg-secondaryBG-light dark:bg-secondaryBG-dark shadow-lg rounded-lg p-3',
        title: 'text-xl font-bold dark:text-white text-black',
        input: 'border-Input-border block sm:text-sm border p-2 rounded-md',
        confirmButton: `text-white font-bold py-2 px-4 rounded ${buttonClasses.confirmButtonClass}`,
        cancelButton: `bg-gray-300 text-black font-bold py-2 px-4 rounded ${buttonClasses.cancelButtonClass}`,
      },
    });

    if (!isConfirmed) {
      return;
    }

    try {
      setLoading(true);
      await apiCall(id, reason);

      Swal.fire({
        icon: 'success',
        title: `${
          actionType === 'ban' ? (isBanned ? 'Unbanned' : 'Banned') : 'Removed'
        } Successfully`,
        text: `User ${id} has been ${
          actionType === 'ban' ? (isBanned ? 'unbanned' : 'banned') : 'removed'
        }${actionType === 'ban' ? ` for: ${reason}` : ''}.`,
        customClass: {
          popup: 'bg-white shadow-lg rounded-lg p-6',
        },
      });

      // Call the onComplete callback if provided
      if (onComplete) {
        onComplete();
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: `Failed to ${
          actionType === 'ban' ? (isBanned ? 'Unban' : 'Ban') : 'Remove'
        } User`,
        text: `Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
        customClass: {
          popup: 'bg-white shadow-lg rounded-lg p-6',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return { handleAction, loading };
};

export default useHandleAction;

// import MainTable from '../../components/lastnews/MainTable';
// import useFetchUsers from '../../hooks/useTypeUsers';
// const BannedIconSrc = './../../../public/block.svg';
// const NotBannedIconSrc = './../../../public/unblock.svg';
// const ActivatedEmailIconSrc = './../../../public/true.png';
// const NotActivatedEmailIconSrc = './../../../public/x.png';
// const ActivatedAccountIconSrc = './../../../public/true.png';
// const NotActivatedAccountIconSrc = './../../../public/x.png';
// interface UserTypeProps {
//   userType: 'customer' | 'advertiser';
// }

// const UserType: React.FC<UserTypeProps> = ({ userType }) => {
//   const { users, loading, error } = useFetchUsers(userType, 0, 10);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   // Transform the data into a format that the MainTable expects
//   const logs = users.map((user) => ({
//     id: user.id,
//     type: user.type === 'advertiser' ? 2 : 1, // 2 for advertiser, 1 for customer
//     columns: [
//       {
//         key: 'id',
//         content: user.id,
//         className: 'dark:text-white text-black',
//       },

//       {
//         key: 'name',
//         content: user.name.split(' ').slice(0, 2).join(' ').slice(0, 12),
//         className: 'dark:text-[#32E26B] text-[#0E1FB2]',
//       },
//       {
//         key: 'alias',
//         content: user.alias.split(' ').slice(0, 2).join(' ').slice(0, 12),
//         className: 'dark:text-white text-black',
//       },
//       {
//         key: 'regDate',
//         content: user.regDate.split(' ')[0],
//         className: 'flex dark:text-white text-black',
//       },
//       {
//         key: 'isActivatedAccount',
//         content: (
//           <img
//             src={
//               user.isActivated.account
//                 ? ActivatedAccountIconSrc
//                 : NotActivatedAccountIconSrc
//             }
//             alt={
//               user.isActivated.account
//                 ? 'Account Activated'
//                 : 'Account Not Activated'
//             }
//             className="w-6 h-6 text-center"
//           />
//         ),
//         className: 'flex  justify-center',
//       },

//       {
//         key: 'isActivatedEmail',
//         content: (
//           <img
//             src={
//               user.isActivated.email
//                 ? ActivatedEmailIconSrc
//                 : NotActivatedEmailIconSrc
//             }
//             alt={
//               user.isActivated.email ? 'Email Activated' : 'Email Not Activated'
//             }
//             className="w-6 h-6 text-center"
//           />
//         ),
//         className: 'flex justify-center',
//       },

//       {
//         key: 'isBanned',
//         content: (
//           <img
//             src={user.isBanned ? BannedIconSrc : NotBannedIconSrc}
//             alt={user.isBanned ? 'Banned' : 'Not Banned'}
//             className="w-6 h-6 text-center"
//           />
//         ),
//         className: 'flex justify-center',
//       },
//     ],
//   }));
//   // header
//   const headers = [
//     { key: 'id', content: 'ID', className: 'text-' },
//     { key: 'name', content: 'Name', className: 'text-' },
//     { key: 'alias', content: 'alias', className: 'text-' },
//     { key: 'regDate', content: 'regDate', className: 'text-' },
//     {
//       key: 'mobileconfirm',
//       content: 'mobileconfirm',
//       className: 'text-center',
//     },
//     {
//       key: 'emailleconfirm',
//       content: 'emailleconfirm',
//       className: 'text-center',
//     },
//     { key: 'BanStatus', content: 'BanStatus', className: 'text-center' },
//   ];
//   return (
//     <>
//       <MainTable logs={logs} headers={headers} />
//     </>
//   );
// };

// export default UserType;
import React from 'react';
import MainTable from '../../components/lastnews/MainTable';
import useFetchUsers from '../../hooks/useTypeUsers';
import useBanUser from '../../hooks/useBanUser'; // Import the custom hook
import { useState } from 'react';

const BannedIconSrc = './../../../public/block.svg';
const NotBannedIconSrc = './../../../public/unblock.svg';
const ActivatedEmailIconSrc = './../../../public/true.png';
const NotActivatedEmailIconSrc = './../../../public/x.png';
const ActivatedAccountIconSrc = './../../../public/true.png';
const NotActivatedAccountIconSrc = './../../../public/x.png';

interface UserTypeProps {
  userType: 'customer' | 'advertiser';
}

const UserType: React.FC<UserTypeProps> = ({ userType }) => {
  const { users, loading, error } = useFetchUsers(userType, 0, 10);
  const { banUser, loading: banLoading, error: banError } = useBanUser(); // Destructure the hook for banning users

  const handleBanClick = async (userId: number) => {
    const reason = prompt('Enter the reason for banning the user:'); // Ask for ban reason
    if (reason) {
      try {
        await banUser(userId, reason);
        alert(`User ${userId} has been banned for: ${reason}`);
        window.location.reload();
      } catch (err) {
        alert(`Failed to ban user: ${err}`);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Transform the data into a format that the MainTable expects
  const logs = users.map((user) => ({
    id: user.id,
    type: user.type === 'advertiser' ? 2 : 1, // 2 for advertiser, 1 for customer
    columns: [
      {
        key: 'id',
        content: user.id,
        className: 'dark:text-white text-black',
      },
      {
        key: 'name',
        content: user.name.split(' ').slice(0, 2).join(' ').slice(0, 12),
        className: 'dark:text-[#32E26B] text-[#0E1FB2]',
      },
      {
        key: 'alias',
        content: user.alias.split(' ').slice(0, 2).join(' ').slice(0, 12),
        className: 'dark:text-white text-black',
      },
      {
        key: 'regDate',
        content: user.regDate.split(' ')[0],
        className: 'flex dark:text-white text-black',
      },
      {
        key: 'isActivatedAccount',
        content: (
          <img
            src={
              user.isActivated.account
                ? ActivatedAccountIconSrc
                : NotActivatedAccountIconSrc
            }
            alt={
              user.isActivated.account
                ? 'Account Activated'
                : 'Account Not Activated'
            }
            className="w-6 h-6 text-center"
          />
        ),
        className: 'flex justify-center',
      },
      {
        key: 'isActivatedEmail',
        content: (
          <img
            src={
              user.isActivated.email
                ? ActivatedEmailIconSrc
                : NotActivatedEmailIconSrc
            }
            alt={
              user.isActivated.email ? 'Email Activated' : 'Email Not Activated'
            }
            className="w-6 h-6 text-center"
          />
        ),
        className: 'flex justify-center',
      },
      {
        key: 'isBanned',
        content: (
          <img
            src={user.isBanned ? BannedIconSrc : NotBannedIconSrc}
            alt={user.isBanned ? 'Banned' : 'Not Banned'}
            className="w-6 h-6 text-center cursor-pointer"
            onClick={() => handleBanClick(user.id)} // Apply the ban action on click
          />
        ),
        className: 'flex justify-center',
      },
    ],
  }));

  // Header
  const headers = [
    { key: 'id', content: 'ID', className: 'text-center' },
    { key: 'name', content: 'Name', className: 'text-center' },
    { key: 'alias', content: 'Alias', className: 'text-center' },
    { key: 'regDate', content: 'RegistrationDate', className: 'text-center' },
    {
      key: 'mobileconfirm',
      content: 'MobileConfirm',
      className: 'text-center',
    },
    {
      key: 'emailleconfirm',
      content: 'EmailConfirm',
      className: 'text-center',
    },
    { key: 'BanStatus', content: 'BanStatus', className: 'text-center' },
  ];

  return (
    <>
      {banLoading && <p>Banning user...</p>}
      {banError && <p>{banError}</p>}
      <MainTable logs={logs} headers={headers} />
    </>
  );
};

export default UserType;

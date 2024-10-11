// // import React from 'react';
// import useUsers from '../../hooks/useAllusers';
// import MainTable from '../../components/lastnews/MainTable';
// import useBanUser from '../../hooks/useBanUser';
// import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

// const BannedIconSrc = '/block.svg';
// const NotBannedIconSrc = '/unblock.svg';
// const ActivatedEmailIconSrc = '/true.png';
// const NotActivatedEmailIconSrc = '/x.png';
// const ActivatedAccountIconSrc = '/true.png';
// const NotActivatedAccountIconSrc = '/x.png';

// const Users: React.FC = () => {
//   const { users, loading, error } = useUsers();
//   const { banUser, loading: banLoading, error: banError } = useBanUser();

//   const handleBanClick = async (userId: number) => {
//     const reason = prompt('Enter the reason for banning the user:');
//     if (reason) {
//       try {
//         await banUser(userId, reason);
//         alert(`User ${userId} has been banned for: ${reason}`);
//         window.location.reload();
//       } catch (err) {
//         alert(`Failed to ban user: ${err}`);
//       }
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   // Map users to the LogData format
//   const logs = users.map((user) => ({
//     id: user.id,
//     type: user.type === 'customer' ? 1 : 2,
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
//         content: user.alias.split(' '),
//         className: 'dark:text-white text-black',
//       },
//       {
//         key: 'type',
//         content: user.type === 'customer' ? 'Customer' : 'Advertiser',
//         className: 'dark:text-white text-black text-right',
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
//             className="w-6 h-6 text-center" // Set appropriate size
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
//             className="w-6 h-6 text-center" // Set appropriate size
//             onClick={() => handleBanClick(user.id)} // Apply the ban action on click
//           />
//         ),
//         className: 'flex justify-center',
//       },
//     ],
//   }));
//   //
//   const headers = [
//     { key: 'id', content: 'ID', className: 'text-' },
//     { key: 'name', content: 'Name', className: 'text-' },
//     { key: 'alias', content: 'alias', className: 'text-' },
//     { key: 'type', content: 'type', className: 'text-' },
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
//   //
//   const breadcrumbLinks = [{ label: 'المستخدمين/', path: '/' }];
//   return (
//     <div>
//       <Breadcrumb breadcrumbLinks={breadcrumbLinks} pageName="الكل" />
//       <MainTable logs={logs} headers={headers} />
//     </div>
//   );
// };

// export default Users;
import React from 'react';
import useUsers from '../../hooks/useAllusers';
import MainTable from '../../components/lastnews/MainTable';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import useHandleBan from '../../hooks/useHandleBan'; // Import the new hook
import useBanUser from '../../hooks/useBanUser';

const BannedIconSrc = '/block.svg';
const NotBannedIconSrc = '/unblock.svg';
const ActivatedEmailIconSrc = '/true.png';
const NotActivatedEmailIconSrc = '/x.png';
const ActivatedAccountIconSrc = '/true.png';
const NotActivatedAccountIconSrc = '/x.png';

const Users: React.FC = () => {
  const { users, loading, error } = useUsers();
  const { handleBan, loading: banLoading } = useHandleBan(); // Use the new hook
  const { banUser, loading: banUserLoading, error: banError } = useBanUser(); // Renamed loading

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Map users to the LogData format
  const logs = users.map((user) => ({
    id: user.id,
    type: user.type === 'customer' ? 1 : 2,
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
        content: user.alias.split(' '),
        className: 'dark:text-white text-black',
      },
      {
        key: 'type',
        content: user.type === 'customer' ? 'Customer' : 'Advertiser',
        className: 'dark:text-white text-black text-right',
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
            onClick={() => handleBan(user.id, user.isBanned, banUser)} // Use the new handleBan from the hook
          />
        ),
        className: 'flex justify-center',
      },
    ],
  }));

  const headers = [
    { key: 'id', content: 'ID', className: 'text-' },
    { key: 'name', content: 'Name', className: 'text-' },
    { key: 'alias', content: 'Alias', className: 'text-' },
    { key: 'type', content: 'Type', className: 'text-' },
    { key: 'regDate', content: 'RegDate', className: 'text-' },
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

  const breadcrumbLinks = [{ label: 'المستخدمين/', path: '/' }];

  return (
    <div>
      <Breadcrumb breadcrumbLinks={breadcrumbLinks} pageName="الكل" />
      <MainTable logs={logs} headers={headers} />
      {(banLoading || banUserLoading) && <p>Processing ban action...</p>}{' '}
      {/* Display loading message when banning */}
    </div>
  );
};

export default Users;

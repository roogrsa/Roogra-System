// import React from 'react';
import useUsers from '../../hooks/useAllusers';
import MainTable from '../../components/lastnews/MainTable';

// Define your SVG paths (adjust the paths based on your project structure)
const BannedIconSrc = './../../../public/block.svg';
const NotBannedIconSrc = './../../../public/unblock.svg';
const ActivatedEmailIconSrc = './../../../public/true.png';
const NotActivatedEmailIconSrc = './../../../public/x.png';
const ActivatedAccountIconSrc = './../../../public/true.png';
const NotActivatedAccountIconSrc = './../../../public/x.png';

const Users: React.FC = () => {
  const { users, loading, error } = useUsers();

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
        className: 'flex  justify-center',
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
            className="w-6 h-6 text-center" // Set appropriate size
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
            className="w-6 h-6 text-center" // Set appropriate size
          />
        ),
        className: 'flex justify-center',
      },
    ],
  }));
  //
  const headers = [
    { key: 'id', content: 'ID', className: 'text-' },
    { key: 'name', content: 'Name', className: 'text-' },
    { key: 'alias', content: 'alias', className: 'text-' },
    { key: 'type', content: 'type', className: 'text-' },
    { key: 'regDate', content: 'regDate', className: 'text-' },
    {
      key: 'mobileconfirm',
      content: 'mobileconfirm',
      className: 'text-center',
    },
    {
      key: 'emailleconfirm',
      content: 'emailleconfirm',
      className: 'text-center',
    },
    { key: 'BanStatus', content: 'BanStatus', className: 'text-center' },
  ];
  return (
    <div>
      <MainTable logs={logs} headers={headers} />
    </div>
  );
};

export default Users;

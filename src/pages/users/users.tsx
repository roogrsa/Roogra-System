import React from 'react';
import useUsers from '../../hooks/useAllusers';
import MainTable from '../../components/lastnews/MainTable';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import useBanUser from '../../hooks/useBanUser';
import { useNavigate } from 'react-router-dom';
import useHandleAction from '../../hooks/useHandleAction';

const BannedIconSrc = '/block.svg';
const NotBannedIconSrc = '/unblock.svg';
const ActivatedEmailIconSrc = '/true.png';
const NotActivatedEmailIconSrc = '/x.png';
const ActivatedAccountIconSrc = '/true.png';
const NotActivatedAccountIconSrc = '/x.png';

const Users: React.FC = () => {
  const { users, loading, error } = useUsers();
  const { handleAction, loading: actionLoading } = useHandleAction();

  const { banUser, loading: banUserLoading, error: banError } = useBanUser();
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  //
  const handleClickName = (userId: number) => {
    navigate(`/profile/${userId}`);
  };
  //
  const logs = users.map((user) => ({
    id: user.id,
    type: user.type === 'customer' ? 1 : 2,
    columns: [
      {
        key: 'id',
        content: user.id,
        className: 'dark:text-white text-black text-center',
      },
      {
        key: 'name',
        content: (
          <span
            className="cursor-pointer dark:text-TextGreen text-TextBlue"
            onClick={() => handleClickName(user.id)}
          >
            {user.name.split(' ').slice(0, 2).join(' ').slice(0, 12)}
          </span>
        ),
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
            onClick={() =>
              !actionLoading &&
              user?.id &&
              handleAction(user.id, user.isBanned === 1, 'ban', banUser, {
                confirmButtonClass: 'bg-BlockIconBg ',
                cancelButtonClass: '',
              })
            }
          />
        ),
        className: 'flex justify-center',
      },
    ],
  }));
  //
  const headers = [
    { key: 'id', content: 'ID', className: 'text-center' },
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
  //
  const breadcrumbLinks = [{ label: 'المستخدمين/', path: '/' }];
  //
  return (
    <div>
      <Breadcrumb breadcrumbLinks={breadcrumbLinks} pageName="الكل" />
      <MainTable logs={logs} headers={headers} />
      {banUserLoading && <p>Processing ban action...</p>}{' '}
    </div>
  );
};

export default Users;

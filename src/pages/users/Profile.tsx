import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import ProfileAccordion from '../../components/users/ProfileAccordion';
import CoverOne from './../../images/cover/cover-01.png';
import userSix from './../../../public/Defualt.png';
import { useParams } from 'react-router-dom';
import useUser from '../../hooks/useGetUser';
import useRemoveUser from '../../hooks/useRemoveUser';
import useHandleAction from '../../hooks/useHandleAction';
import useBanUser from '../../hooks/useBanUser';

const SaveIconSrc = '/save.svg';
const BannedIconSrc = '/block.svg';
const NotBannedIconSrc = '/unblock.svg';
const RemoveIconSrc = '/remove.svg';

const Profile = () => {
  const breadcrumbLinks = [{ label: 'المستخدمين/', path: '/' }];
  const { id } = useParams<{ id: string }>();
  const { user, loading, error } = useUser(Number(id));
  const { banUser } = useBanUser();
  const { removeUser } = useRemoveUser();
  const { handleAction, loading: actionLoading } = useHandleAction();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Breadcrumb breadcrumbLinks={breadcrumbLinks} pageName="العملاء" />

      <div className="overflow-hidden">
        <div className="relative z-20 h-35 md:h-65">
          <img
            src={CoverOne}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          />
        </div>
        <div className="px-4 pb-2 text-center lg:pb-6 xl:pb-11.5">
          {/* <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3"> */}
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur ">
            <img
              src={
                user?.image === 'https://roogr.sa/api/image/'
                  ? userSix
                  : user?.image || userSix
              }
              className="rounded-full text-center"
              alt="profile"
            />
          </div>
        </div>

        <div className="max-w-4xl mx-auto flex justify-end gap-x-8">
          <div className="bg-SaveIconBg rounded-md">
            <img
              src={SaveIconSrc}
              className="w-6 h-6 text-center p-1 cursor-pointer"
              // onClick={() => handleEditClick(user.id)}
            />
          </div>

          <div className="bg-BlockIconBg rounded-md">
            <img
              src={user?.isBanned ? BannedIconSrc : NotBannedIconSrc}
              className="w-6 h-6 text-center p-1 cursor-pointer"
              onClick={() =>
                !actionLoading &&
                user?.id &&
                handleAction(user.id, user.isBanned === 1, 'ban', banUser, {
                  confirmButtonClass: 'bg-BlockIconBg ', // Ban button class
                  cancelButtonClass: '', // Cancel button class
                })
              }
            />
          </div>

          <div className="bg-RemoveIconBg rounded-md">
            <img
              src={RemoveIconSrc}
              className="w-6 h-6 text-center p-1 cursor-pointer"
              onClick={() =>
                !actionLoading &&
                user?.id &&
                handleAction(user.id, false, 'remove', removeUser, {
                  confirmButtonClass: 'bg-RemoveIconBg ', // Remove button class
                  cancelButtonClass: '', // Cancel button class
                })
              }
            />
          </div>
        </div>

        <ProfileAccordion user={user} loading={loading} error={error} />
      </div>
    </>
  );
};

export default Profile;

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
import StarRating from '../../components/users/StarRating';

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
        {/* image cover */}

        <div className="relative z-20 h-35 md:h-65">
          <img
            src={
              user?.image === 'https://roogr.sa/api/image/'
                ? CoverOne
                : user?.image || CoverOne
            }
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
            alt="profile cover"
          />
        </div>
        {/* image profile */}
        <div className="px-4  text-center ">
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

        {/* Rating section */}
        <div className="mx-auto text-center my-4">
          <div className="flex justify-end gap-x-3 text-xl">
            <span className="text-gray-500">
              {user?.rating ? parseFloat(user?.rating).toFixed(1) : '0.0'}
            </span>
            <StarRating rating={user?.rating ? user.rating : 0} />{' '}
          </div>
        </div>
        {/* icons section */}
        <div className=" mx-auto flex justify-end gap-x-8">
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

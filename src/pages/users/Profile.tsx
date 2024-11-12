import React from 'react';
import ProfileAccordion from '../../components/users/ProfileAccordion';
import { useParams } from 'react-router-dom';
import useHandleAction from '../../hooks/useHandleAction';
import StarRating from '../../components/users/StarRating';
import ProfileImages from '../../components/users/ProfileImages';
import useUser from '../../hooks/users/useGetUser';
import useBanUser from '../../hooks/users/useBanUser';
import useRemoveUser from '../../hooks/users/useRemoveUser';
const BannedIconSrc = '/block.svg';
const NotBannedIconSrc = '/unblock.svg';
const RemoveIconSrc = '/remove.svg';

const Profile = () => {
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
      <div className="overflow-hidden">
        {/* image section */}
        <ProfileImages user={user} />

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
          {/* <div className="bg-SaveIconBg rounded-md">
            <img
              src={SaveIconSrc}
              className="w-6 h-6 text-center p-1 cursor-pointer"
              // onClick={() => handleEditClick(user.id)}
            />
          </div> */}

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
        {/* accordion section */}
        <ProfileAccordion user={user} loading={loading} error={error} />
      </div>
    </>
  );
};

export default Profile;

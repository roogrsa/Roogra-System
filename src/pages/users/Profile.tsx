import React, { useEffect } from 'react';
import ProfileAccordion from '../../components/users/ProfileAccordion';
import { useParams } from 'react-router-dom';
import useHandleAction from '../../hooks/useHandleAction';
import StarRating from '../../components/users/StarRating';
import ProfileImages from '../../components/users/ProfileImages';
import useUser from '../../hooks/users/useGetUser';
import useBanUser from '../../hooks/users/useBanUser';
import useRemoveUser from '../../hooks/users/useRemoveUser';
import { ToastContainer } from 'react-toastify';

const BannedIconSrc = '/block.svg';
const NotBannedIconSrc = '/whiteblock.png';
const RemoveIconSrc = '/remove.svg';

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const { user, loading, error, refreshProfile } = useUser(Number(id));
  const { banUser, isSuccess } = useBanUser();
  const { removeUser, success: removeSuccess } = useRemoveUser();
  const { handleAction, loading: actionLoading } = useHandleAction();

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p>Error: {error}</p>;
  // }
  useEffect(() => {
    if (isSuccess || removeSuccess) {
      refreshProfile();
    }
  }, [isSuccess, refreshProfile]);
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
                handleAction(
                  user.id,
                  user.isBanned === 1,
                  'ban',
                  banUser,
                  {
                    confirmButtonClass: 'bg-BlockIconBg ',
                    cancelButtonClass: '',
                  },
                  refreshProfile,
                )
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
                handleAction(
                  user.id,
                  false,
                  'remove',
                  removeUser,
                  {
                    confirmButtonClass: 'bg-RemoveIconBg ',
                    cancelButtonClass: '',
                  },
                  refreshProfile,
                )
              }
            />
          </div>
        </div>
        {/* accordion section */}
        <ProfileAccordion user={user} loading={loading} error={error} />
      </div>
      {/* <ToastContainer position="top-right" autoClose={5000} /> */}
    </>
  );
};

export default Profile;

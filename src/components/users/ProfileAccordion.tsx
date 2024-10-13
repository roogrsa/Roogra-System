import React from 'react';
import Accordion from '../Accordion/Accordion';
import UserForm from './UserFormDetials';
import MainTable from '../lastnews/MainTable';
import useFollowers from '../../hooks/useUserFollowers';
import { useNavigate } from 'react-router-dom';
import useHandleAction from '../../hooks/useHandleAction';
import useBanUser from '../../hooks/useBanUser';
//
const EditIconSrc = '/Edit.svg';
const CheckboxIconSrc = '/checkbox.svg';
const NotBannedIconSrc = '/unblock.svg';
const BannedIconSrc = '/block.svg';
//
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  telephone: string;
  type: 'advertiser' | 'customer';
  isActivated: {
    account: boolean;
    email: boolean;
  };
  status: number; // Status of the account (e.g., 1 = Active)
  isBanned: boolean;
  ban_reason: string;
  regDate: string; // Registration date in "YYYY-MM-DD HH:MM:SS" format
  address: string;
  countery_id: number | null;
  bio: string;
  rating: number;
  image: string;
  alias: string;
}

interface ProfileAccordionProps {
  user: User;
  loading: boolean;
  error: string | null;
}

const ProfileAccordion: React.FC<ProfileAccordionProps> = ({
  user,
  loading,
  error,
}) => {
  const { handleAction, loading: actionLoading } = useHandleAction();
  const { banUser, loading: banUserLoading, error: banError } = useBanUser();

  const navigate = useNavigate();

  const {
    followers,
    loading: followersLoading,
    error: followersError,
  } = useFollowers(user.id);

  const handleEditClick = (followerId: number) => {
    navigate(`/profile/${followerId}`);
  };

  const logs = followers.map((follower, index) => {
    const createdAtDate = new Date(follower.regDate);
    const datePart = createdAtDate.toLocaleDateString();

    return {
      id: follower.id,
      type: 2,
      columns: [
        {
          key: 'index',
          content: index + 1, // Display the index number starting from 1
          className: 'flex justify-center ',
        },

        // {
        //   key: 'id',
        //   content: follower.id,
        //   className: 'flex justify-center',
        // },
        {
          key: 'name',
          content: (
            <span
              className="cursor-pointer "
              onClick={() => handleEditClick(follower.id)}
            >
              {follower.name.split(' ').slice(0, 2).join(' ')}
            </span>
          ),
          className: 'text-TextBlue dark:text-TextGreen',
        },
        {
          key: 'alias',
          content:
            follower.alias.split(' ').slice(0, 2).join(' ') || 'not found',

          className: '',
        },
        { key: 'reg_date', content: datePart, className: 'date-class' },
        {
          key: 'Edit',
          content: (
            <div className="bg-EditIconBg rounded-md">
              <img
                src={EditIconSrc}
                className="w-6 h-6 text-center p-1 cursor-pointer"
                onClick={() => handleEditClick(follower.id)}
              />
            </div>
          ),
          className: 'flex justify-center',
        },
        {
          key: 'isBanned',
          content: (
            <img
              src={follower.isBanned ? BannedIconSrc : NotBannedIconSrc}
              alt={follower.isBanned ? 'Banned' : 'Not Banned'}
              className="w-6 h-6 text-center cursor-pointer"
              onClick={() =>
                !actionLoading &&
                follower?.id &&
                handleAction(
                  follower.id,
                  follower.isBanned === 1,
                  'ban',
                  banUser,
                  {
                    confirmButtonClass: 'bg-BlockIconBg ',
                    cancelButtonClass: '',
                  },
                )
              }
            />
          ),
          className: 'flex justify-center',
        },
        {
          key: 'remove',
          content: (
            <img
              src={CheckboxIconSrc}
              alt="Remove"
              className={`w-5 h-5 text-center cursor-pointer ${
                banUserLoading ? 'opacity-50' : ''
              }`}
            />
          ),
          className: 'flex justify-center',
        },
      ],
    };
  });

  // const headers2 = [
  //   { key: 'id', content: 'رقم الاعلان', className: 'text-center' },
  //   { key: 'name', content: 'أسم المعلن', className: 'text-center' },
  //   { key: 'alias', content: 'التاريخ', className: 'text-center' },
  // ];
  return (
    <div className="">
      {/* User Data Accordion */}

      <Accordion title="البيانات">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        {/* Render user form if data is available */}
        {user && <UserForm user={user} loading={loading} error={error} />}
      </Accordion>

      {/* Additional Information Accordion */}
      <Accordion title="المعلومات">
        <MainTable logs={logs} />

        <div className="text-gray-700"></div>
      </Accordion>

      {/* Ads Information Accordion */}
      <Accordion title="الاعلانات">
        <div className="text-gray-700"></div>
      </Accordion>

      {/* Subscription Tickets Accordion */}
      <Accordion title="تذاكر الاشتراك">
        <div className="text-gray-700"></div>
      </Accordion>

      {/* Chats Accordion */}
      <Accordion title="المحادثات">
        <div className="text-gray-700"></div>
      </Accordion>

      {/* Contact Us Accordion */}
      <Accordion title="تواصل معنا">
        <div className="text-gray-700"></div>
      </Accordion>

      {/* Reports Accordion */}
      <Accordion title="البلاغات">
        <div className="text-gray-700"></div>
      </Accordion>

      {/* Blocklist Accordion */}
      <Accordion title="قائمة الحظر">
        <div className="text-gray-700"></div>
      </Accordion>
    </div>
  );
};

export default ProfileAccordion;

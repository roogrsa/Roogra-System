import React from 'react';
import Accordion from '../Accordion/Accordion';
import UserForm from './UserFormDetials';
import MainTable from '../lastnews/MainTable';
import useFollowers from '../../hooks/useUserFollowers';
import { useNavigate } from 'react-router-dom';
import useHandleAction from '../../hooks/useHandleAction';
import useBanUser from '../../hooks/useBanUser';
import AccordionHeader2 from '../Accordion/AccordionHeader2';
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

  const logsFollowers = followers.map((follower, index) => {
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
        // { key: 'space', content: '', className: 'date-class' },

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
              {follower.name.split(' ').slice(0, 2).join(' ').slice(0, 12)}
            </span>
          ),
          className: 'text-TextBlue dark:text-TextGreen',
        },
        { key: 'space', content: '', className: 'date-class' },

        {
          key: 'alias',
          content:
            follower.alias.split(' ').slice(0, 2).join(' ') || 'notfound',

          className: '',
        },
        { key: 'space', content: '', className: 'date-class' },

        { key: 'reg_date', content: datePart, className: 'date-class' },
        { key: 'space', content: '', className: 'date-class' },

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
  const logsRates = followers.map((follower, index) => {
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
  //
  const accordioHeader2Items = [
    {
      title: 'Title 1',
      children: <div>Content for Title 1</div>,
      footerItems: [
        <span key="1">(3)</span>,
        <span key="2">
          <img src="/users.svg" alt="Users" />
        </span>,
        <span key="3">
          <img src="/redRemove.svg" alt="Remove" />
        </span>,
      ],
    },
    {
      title: 'Title 2',
      children: <div>Content for Title 2</div>,
      footerItems: [
        <span key="4">(5)</span>,
        <span key="5">
          <img src="/users.svg" alt="Users" />
        </span>,
        <span key="6">
          <img src="/redRemove.svg" alt="Remove" />
        </span>,
      ],
    },
    {
      title: 'Title 3',
      children: <div>Content for Title 3</div>,
      footerItems: [
        <span key="7">(2)</span>,
        <span key="8">
          <img src="/users.svg" alt="Users" />
        </span>,
        <span key="9">
          <img src="/redRemove.svg" alt="Remove" />
        </span>,
      ],
    },
  ];

  // const headers2 = [
  //   { key: 'id', content: 'رقم الاعلان', className: 'text-center' },
  //   { key: 'name', content: 'أسم المعلن', className: 'text-center' },
  //   { key: 'alias', content: 'التاريخ', className: 'text-center' },
  //   { key: 'alias', content: '', className: 'text-center' },
  //   { key: 'alias', content: '', className: 'text-center' },
  //   { key: 'alias', content: '', className: 'text-center' },
  //   { key: 'alias', content: 'التاريخ', className: 'text-center' },
  // ];
  return (
    <div className="">
      {/* User Data Accordion */}

      <Accordion title="البيانات">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        {/*  */}
        {user && <UserForm user={user} loading={loading} error={error} />}
      </Accordion>

      {/*  */}
      <Accordion title="المعلومات">
        <AccordionHeader2
          titles={['عدد المتابعين', 'عدد التقييم', 'نبذة']}
          children={[
            <MainTable logs={logsFollowers} header2={true} />,
            <MainTable logs={logsRates} header2={true} />,
            <div>Content for Title 3</div>,
          ]}
          footerItems={[
            <div className="flex gap-5">
              <span key="1">(3)</span>
              <span key="2">
                <img src="/users.svg" alt="Users" />
              </span>

              <span key="3">
                <img src="/redRemove.svg" alt="Remove" />
              </span>
            </div>,
            <div className="flex gap-5">
              <span key="1">(10)</span>
              <span key="2" className="">
                <img src="/Star 23.svg" alt="Users" />
              </span>

              <span key="3">
                <img src="/redRemove.svg" alt="Remove" />
              </span>
            </div>,
          ]}
        />
      </Accordion>

      {/*  */}
      <Accordion title="الاعلانات">
        <div className="text-gray-700"></div>
      </Accordion>

      {/*  */}
      <Accordion title="تذاكر الاشتراك">
        <div className="text-gray-700"></div>
      </Accordion>

      {/*  */}
      <Accordion title="المحادثات">
        <div className="text-gray-700"></div>
      </Accordion>

      {/*  */}
      <Accordion title="تواصل معنا">
        <div className="text-gray-700"></div>
      </Accordion>

      {/*  */}
      <Accordion title="البلاغات">
        <div className="text-gray-700"></div>
      </Accordion>

      {/* */}
      <Accordion title="قائمة الحظر">
        <div className="text-gray-700"></div>
      </Accordion>
    </div>
  );
};

export default ProfileAccordion;

import React from 'react';
import Accordion from '../Accordion/Accordion';
import UserForm from './UserFormDetials';
import MainTable from '../lastnews/MainTable';
import useFollowers from '../../hooks/useUserFollowers';
import useHandleAction from '../../hooks/useHandleAction';
import useBanUser from '../../hooks/useBanUser';
import AccordionHeader2 from '../Accordion/AccordionHeader2';
import Bio from './bio';
import { MdOutlineStarOutline } from 'react-icons/md';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import useUserRates from '../../hooks/useRates';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';
import ReactDOMServer from 'react-dom/server';

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
//
//
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
  //
  const {
    data: rates,
    loading: ratesLoading,
    error: ratesError,
  } = useUserRates();

  //
  const handleEditClick = (
    CustomerName: string,
    rateComment: string,
    rating: number,
  ) => {
    Swal.fire({
      // title: ,
      html: `
                  <div class="flex justify-between gap-2">

      <span class=" dark:text-TextGreen text-TextBlue text-lg">${CustomerName}</span>
            <span> comment</span>

      </div>
      <div class="custom-modal-content bg-primaryBG-light dark:bg-primaryBG-dark p-4 rounded-lg">
    

      <div class="">
          <div class="flex justify-start  gap-2">
          
            ${ReactDOMServer.renderToString(
              <StarRating rating={parseFloat(rating)} />,
            )}
              <span class="rating-value text-sm text-gray-400">${parseFloat(
                rating,
              ).toFixed(1)}</span>
          </div>
        </div>
        <div class="comment-section mt-4 text-gray-700">${rateComment}</div>
      </div>
    `,
      showConfirmButton: false,
      confirmButtonText: 'Close',
      customClass: {
        popup:
          'custom-popup bg-secondaryBG-light dark:bg-secondaryBG-dark border rounded-md',
        title: '',
        confirmButton:
          'custom-confirm-button bg-blue-500 text-white py-2 px-4 rounded-md',
      },
    });
  };

  //
  const handleClick = (CustomerId: number) => {
    navigate(`/profile/${CustomerId}`);
  };
  //
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

        {
          key: 'name',
          content: (
            <span
              className="cursor-pointer "
              onClick={() => handleClick(follower.id)}
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
        { key: 'space', content: '', className: 'date-class' },

        {
          key: 'isBanned',
          content: (
            <img
              src={follower.isBanned ? BannedIconSrc : NotBannedIconSrc}
              alt={follower.isBanned ? 'Banned' : 'Not Banned'}
              className="w-6 h-6 text-center cursor-pointer"
              // onClick={() =>
              //   !actionLoading &&
              //   follower?.id &&
              //   handleAction(
              //     follower.id,
              //     follower.isBanned === 1,
              //     'ban',
              //     banUser,
              //     {
              //       confirmButtonClass: 'bg-BlockIconBg ',
              //       cancelButtonClass: '',
              //     },
              //   )
              // }
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
  const logsRates = rates?.map((rate, index) => {
    const createdAtDate = new Date(rate.date_added);
    const datePart = createdAtDate.toLocaleDateString();

    return {
      id: rate.customer_id,
      type: 2,
      columns: [
        {
          key: 'index',
          content: index + 1,
          className: 'flex justify-center',
        },
        {
          key: 'name',
          content: (
            <span
              className="cursor-pointer"
              onClick={() => handleClick(rate.customer_id)}
            >
              {rate.name}
            </span>
          ),
          className: 'text-TextBlue dark:text-TextGreen',
        },
        { key: 'space', content: '', className: 'date-class' },
        {
          key: 'rating',
          content: rate.rating,
          className: '',
        },
        { key: 'space', content: '', className: 'date-class' },
        {
          key: 'date_added',
          content: datePart,
          className: 'date-class',
        },
        { key: 'space', content: '', className: 'date-class' },
        { key: 'space', content: '', className: 'date-class' },

        {
          key: 'Edit',
          content: (
            <div className="bg-EditIconBg rounded-md">
              <img
                src={EditIconSrc}
                className="w-6 h-6 text-center p-1 cursor-pointer"
                onClick={() =>
                  handleEditClick(
                    rate?.name,
                    rate?.comment || 'not found yet',
                    rate.rating,
                  )
                }
              />
            </div>
          ),
          className: 'flex justify-center',
        },
        {
          key: 'isBanned',
          content: (
            <img
              // src={follower.isBanned ? BannedIconSrc : NotBannedIconSrc}
              src={BannedIconSrc}
              // alt={follower.isBanned ? 'Banned' : 'Not Banned'}
              alt={'Banned'}
              className="w-6 h-6 text-center cursor-pointer"
              // onClick={() =>
              //   !actionLoading &&
              //   rate.customer_id &&
              //   handleAction(
              //     rate.customer_id,
              //     follower.isBanned === 1,
              //     'ban',
              //     banUser,
              //     {
              //       confirmButtonClass: 'bg-BlockIconBg ',
              //       cancelButtonClass: '',
              //     },
              //   )
              // }
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
            <MainTable logs={logsRates || []} header2={true} />,
            <Bio Bio={user.bio} />,
          ]}
          footerItems={[
            <div className="flex gap-5">
              <span key="1">({followers?.length})</span>
              <span key="2">
                <img src="/users.svg" alt="Users" />
              </span>

              <span key="3">
                <img src="/redRemove.svg" alt="Remove" />
              </span>
            </div>,
            <div className="flex gap-5">
              <span key="1">({rates?.length || 0})</span>
              <span key="2" className=" text-black dark:text-white text-xl">
                <MdOutlineStarOutline />
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

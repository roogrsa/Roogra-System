import React from 'react';
import AccordionHeader2 from '../../Accordion/AccordionHeader2';
import MainTable from '../../lastnews/MainTable';
import Bio from '../bio';
import { MdOutlineStarOutline } from 'react-icons/md';
import ReactDOMServer from 'react-dom/server';

import { useNavigate } from 'react-router-dom';
import useHandleAction from '../../../hooks/useHandleAction';
import StarRating from '../StarRating';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import useUserRates from '../../../hooks/users/useRates';
import { User } from '../../../types/user';
import { useTranslation } from 'react-i18next';
import useBanUser from '../../../hooks/users/useBanUser';
import useFollowers from '../../../hooks/users/useUserFollowers';
//
const EditIconSrc = '/Edit.svg';
const CheckboxIconSrc = '/checkbox.svg';
const NotBannedIconSrc = '/unblock.svg';
const BannedIconSrc = '/block.svg';

interface ProfileAccordionProps {
  user: User;
  //   loading: boolean;
  //   error: string | null;
}
const UserInfo: React.FC<ProfileAccordionProps> = ({ user }) => {
  const { t } = useTranslation();

  const { handleAction, loading: actionLoading } = useHandleAction();
  const { banUser, loading: banUserLoading, error: banError } = useBanUser();
  const navigate = useNavigate();
  //
  const handleEditClick = (
    CustomerName: string,
    rateComment: string,
    rating: number,
  ) => {
    Swal.fire({
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

  const {
    followers,
    loading: followersLoading,
    error: followersError,
  } = useFollowers(user.id);
  const {
    data: rates,
    loading: ratesLoading,
    error: ratesError,
  } = useUserRates(user.id);

  const handleClickName = (CustomerId: number) => {
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
          content: index + 1,
          className: 'flex justify-center ',
        },

        {
          key: 'name',
          content: (
            <span
              className="cursor-pointer "
              onClick={() => handleClickName(follower.id)}
            >
              {follower.name.split(' ').slice(0, 2).join(' ').slice(0, 12)}
            </span>
          ),
          className: 'text-TextBlue dark:text-TextGreen',
        },
        { key: 'space1', content: '', className: 'date-class' },

        {
          key: 'alias',
          content:
            follower.alias.split(' ').slice(0, 2).join(' ') || 'notfound',

          className: '',
        },
        { key: 'space2', content: '', className: 'date-class' },

        { key: 'reg_date', content: datePart, className: 'date-class' },
        { key: 'space3', content: '', className: 'date-class' },
        { key: 'space4', content: '', className: 'date-class' },

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
              onClick={() => handleClickName(rate.customer_id)}
            >
              {rate.name}
            </span>
          ),
          className: 'text-TextBlue dark:text-TextGreen',
        },
        { key: 'space5', content: '', className: 'date-class' },
        {
          key: 'rating',
          content: rate.rating,
          className: '',
        },
        { key: 'space6', content: '', className: 'date-class' },
        {
          key: 'date_added',
          content: datePart,
          className: 'date-class',
        },
        { key: 'space7', content: '', className: 'date-class' },
        { key: 'space8', content: '', className: 'date-class' },

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
              src={rate.isBanned ? BannedIconSrc : NotBannedIconSrc}
              // src={BannedIconSrc}
              alt={rate.isBanned ? 'Banned' : 'Not Banned'}
              className="w-6 h-6 text-center cursor-pointer"
              onClick={() =>
                !actionLoading &&
                rate.customer_id &&
                handleAction(
                  rate.customer_id,
                  rate.isBanned === 1,
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
  return (
    <div>
      <AccordionHeader2
        titles={[
          t('profile.UserInfo.follower'),
          t('profile.UserInfo.rates'),
          t('profile.UserInfo.bio'),
        ]}
        children={[
          <React.Fragment key="followers-section">
            {/* <NotFoundSection data={logsFollowers} /> */}
            <MainTable
              logs={logsFollowers}
              header2={true}
              key="followers-table"
            />
          </React.Fragment>,
          <React.Fragment key="rates-section">
            {/* <NotFoundSection data={logsRates} /> */}
            <MainTable
              logs={logsRates || []}
              header2={true}
              key="rates-table"
            />
          </React.Fragment>,
          <Bio Bio={user.bio} key="bio" />,
        ]}
        footerItems={[
          <div className="flex gap-5" key="footer-followers">
            <span key="followers-count">({followers?.length})</span>
            <span key="users-icon">
              <img src="/users.svg" alt="Users" />
            </span>
            <span key="remove-icon-1">
              <img src="/redRemove.svg" alt="Remove" />
            </span>
          </div>,
          <div className="flex gap-5" key="footer-rates">
            <span key="rates-count">({rates?.length || 0})</span>
            <span
              key="star-icon"
              className="text-black dark:text-white text-xl"
            >
              <MdOutlineStarOutline />
            </span>
            <span key="remove-icon-2">
              <img src="/redRemove.svg" alt="Remove" />
            </span>
          </div>,
        ]}
      />
    </div>
  );
};

export default UserInfo;

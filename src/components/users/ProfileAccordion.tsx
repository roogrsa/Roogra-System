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
import useUserProducts from '../../hooks/useUserProducts';
import useBanProduct from '../../hooks/useBanProduct';

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
  const {
    products: logsUserProducts,
    loading: productsLoading,
    error: productsError,
  } = useUserProducts(user.id);
  // console.log(logsUserProducts);

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
  // Handle the click on the edit icon to navigate to the product edit page
  const handleProdProfile = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  //
  const { banProduct, loadingPrdBan, banPrdError } = useBanProduct();

  // Handle ban/unban action
  const handleBan = (productId: number, isBanned: boolean) => {
    handleAction(productId, isBanned, 'ban', banProduct, {
      confirmButtonClass: 'bg-BlockIconBg',
      cancelButtonClass: 'bg-gray-300',
    });
  };
  //
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
          content: index + 1, // Display the index number starting from 1
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
  //
  const logsProducts = logsUserProducts?.map((product) => {
    const createdAtDate = new Date(product.date);
    const datePart = createdAtDate.toLocaleDateString();
    const timePart = createdAtDate.toLocaleTimeString();

    return {
      id: product.id,
      type: 2,
      columns: [
        {
          key: 'id',
          content: product.id,
          className: 'flex justify-center',
        },

        { key: 'created_at_date', content: datePart, className: 'date-class' },
        { key: 'created_at_time', content: timePart, className: 'time-class' },
        {
          key: 'category',
          content: product.category_name,
          className: 'flex justify-center',
        },
        {
          key: 'product_name',
          content: product.product_name
            .split(' ')
            .slice(0, 2)
            .join(' ')
            .slice(0, 12),
          className: 'flex justify-center',
        },
        {
          key: 'thumbnail',
          content: (
            <img
              src={product.thumbnail}
              alt={product.product_name}
              className="w-10 h-10 object-cover"
            />
          ),
          className: 'flex justify-center',
        },
        {
          key: 'Edit',
          content: (
            <div className="bg-EditIconBg rounded-md">
              <img
                src={EditIconSrc}
                className="w-6 h-6 text-center p-1 cursor-pointer"
                onClick={() => handleProdProfile(product.id)}
              />
            </div>
          ),
          className: 'flex justify-center',
        },
        {
          key: 'isBanned',
          content: (
            <img
              src={product.is_banned === 0 ? NotBannedIconSrc : BannedIconSrc}
              className={`w-8 h-8 text-center p-1 cursor-pointer ${
                actionLoading ? 'opacity-50' : ''
              }`}
              onClick={() =>
                !actionLoading && handleBan(product.id, product.is_banned === 1)
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
              className={`w-5 h-5 text-center cursor-pointer 
              
              `}
            />
          ),
          className: 'flex justify-center',
        },
      ],
    };
  });
  //
  const headers = [
    { key: 'id', content: 'رقم الاعلان', className: 'text-center' },
    { key: 'alias', content: 'التاريخ', className: 'text-center' },
    { key: 'type', content: 'الوقت', className: 'text-center' },
    { key: 'regDate', content: 'القسم', className: 'text-center' },
    { key: 'mobileconfirm', content: 'أسم الاعلان', className: 'text-center' },
    { key: 'emailleconfirm', content: 'الصورة', className: 'text-center' },
    { key: 'emailleconfirm', content: 'تحرير', className: 'text-center' },
    { key: 'BanStatus', content: 'الحالة', className: 'text-center' },
    {
      key: 'removeStatus',
      content: (
        <img
          src={CheckboxIconSrc}
          alt="Remove"
          className={`w-5 h-5 text-center cursor-pointer
        
          `}
        />
      ),
      className: 'text-center flex justify-center',
    },
  ];

  return (
    <div className="">
      {/*  Data  */}
      <Accordion title="البيانات">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
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

      {/* products section */}
      <Accordion title="الاعلانات">
        {logsProducts ? (
          <div className="my-3 ">
            <MainTable logs={logsProducts || []} headers={headers} />
          </div>
        ) : (
          <div>
            <p>لا توجد أعلانات حتى ال��ن.</p>
          </div>
        )}
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

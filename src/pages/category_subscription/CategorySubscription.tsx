import { useEffect, useState } from 'react';
import MainTable from '../../components/lastnews/MainTable';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import useCategorySubscriptionsByStatus from '../../hooks/category_subscription/CatSubscriptionByStatus';
import cofirmIcon from '/true2.svg';
import rejectIcon from '/false2.svg';
import ReusableInput from '../../components/products/ReusableInput';
import NotFoundSection from '../../components/Notfound/NotfoundSection';
import AccordionHeader2 from '../../components/Accordion/AccordionHeader2';
import useEditCategorySubscriptionStatus from '../../hooks/category_subscription/useEditCategorySubscriptionStatus';
import ImageWithFullscreen from '../../components/Fullscreen/Fulllscreen';
import handleEditSubscribtionClick from '../../hooks/category_subscription/handleEditSubscribtionClick';
import { useTranslation } from 'react-i18next';
import PeriodInput from './PeriodInput';
import Pagination from '../../components/pagination/Pagination';
import axiosInstance from '../../axiosConfig/instanc';
import handleStatus from '../../hooks/category_subscription/handleStatus';
import { useLocation } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
//
const ApprovedSubscription = '/true.png';
const EditIconSrc = '/Edit.svg';

const CategorySubscription = () => {
  const { t } = useTranslation();

  //
  const { editCategorySubscriptionStatus, success: editSuccess } =
    useEditCategorySubscriptionStatus();
  //
  const breadcrumbLinks = [
    { label: t('verification_request.label.label'), path: '/' },
  ];

  // State to handle dynamic status
  const [status, setStatus] = useState('processing');
  const [currentPage, setCurrentPage] = useState(0);
  const [categorySubscriptionCount, setCategorySubscriptionCount] = useState(0);
  const [Count, setCount] = useState(0);
  const location = useLocation();
  const { id } = location.state || {};
  //
  useEffect(() => {
    const fetchUsersCount = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/category_subscription/status/${status}/count`,
        );
        setCategorySubscriptionCount(response.data.data.count / 8);
        setCount(response.data.data.count);
      } catch (err) {}
    };
    fetchUsersCount();
  }, [Count, status]);
  const totalPages = Math.ceil(categorySubscriptionCount);
  const { data, refreshRequest } = useCategorySubscriptionsByStatus(
    status,
    currentPage,
    id,
  );
  useEffect(() => {
    if (editSuccess) {
      refreshRequest();
    }
  }, [editSuccess]);
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;
  //
  const headers = [
    {
      key: 'id',
      content: t('subscriptions.headers.id'),
      className: 'text-center',
    },
    {
      key: 'category_name',
      content: t('subscriptions.headers.category_name'),
      className: 'text-center',
    },
    {
      key: 'sub_name',
      content: t('subscriptions.headers.sub_name'),
      className: 'text-center',
    },
    {
      key: 'transaction_image',
      content: t('subscriptions.headers.transaction_image'),
      className: 'text-center',
    },
    {
      key: 'created_at',
      content: t('subscriptions.headers.created_at'),
      className: 'text-center',
    },
    {
      key: 'verification_period',
      content: t('subscriptions.headers.verification_period'),
      className: 'text-center',
    },

    {
      key: 'verified_by_accept',
      content:
        status === 'processing'
          ? t('subscriptions.headers.verified_by_accept')
          : t('subscriptions.headers.edit'),
      className: 'text-center',
    },
    {
      key: 'verified_by_reject',
      content:
        status === 'rejected'
          ? t('subscriptions.headers.verified_by_accept')
          : t('subscriptions.headers.verified_by_reject'),
      className: 'text-center',
    },
  ];
  //

  const logs = Array.isArray(data)
    ? data.map((item) => {
        const createdAtDate = new Date(item.created_at);
        const datePart = createdAtDate.toLocaleDateString();

        return {
          id: item.category_subscription_id,
          type: 2,
          columns: [
            {
              key: 'id',
              content: 'RS-' + item.category_subscription_id,
              className: 'flex justify-center',
            },
            {
              key: 'category_name',
              content: (
                <ReusableInput
                  label=""
                  type="text"
                  value={item.category_name}
                  widthClass="w-15"
                  extraClass="bg-Input-blue text-center"
                />
              ),
              className: 'flex justify-center',
            },
            {
              key: 'sub_name',
              content: (
                <ReusableInput
                  label=""
                  type="text"
                  value={item.sub_name}
                  widthClass="w-15"
                  extraClass="bg-Input-blue text-center"
                />
              ),
              className: 'flex justify-center',
            },
            {
              key: 'transaction_image',
              content:
                item.STATUS === 'processing' ? (
                  <ImageWithFullscreen
                    src={item.transaction_image}
                    alt="Transaction"
                    className="w-10 h-10 object-cover"
                  />
                ) : (
                  <img
                    src={ApprovedSubscription}
                    alt="Approved"
                    className="w-6 h-6 text-center"
                  />
                ),
              className: 'flex justify-center',
            },
            {
              key: 'created_at',
              content: `${datePart}`,
              className: 'flex justify-center',
            },
            {
              key: 'verification_period',

              content:
                status === 'expired' ? (
                  <PeriodInput
                    item={item}
                    ItemStatus="expired"
                    refreshRequest={refreshRequest}
                  />
                ) : (
                  <PeriodInput item={item} refreshRequest={refreshRequest} />
                ),

              className: 'flex justify-center',
            },

            {
              key: 'verified_by_approved OR Edit',
              content:
                item.STATUS === 'processing' ? (
                  <img
                    src={cofirmIcon}
                    alt="Accept"
                    className="w-6 h-6 bg-ConfirmIconBg p-1 rounded-lg cursor-pointer"
                    onClick={() =>
                      handleStatus(
                        'adminName', // Pass the admin name
                        'approved', // Set the new status
                        undefined, // Pass the verification request ID
                        item.category_subscription_id, // Pass category subscription ID if needed

                        undefined, // Pass undefined if EditVerificationRequest is not used

                        editCategorySubscriptionStatus, // Function for updating category subscription status
                      )
                    }
                  />
                ) : (
                  <div className="bg-EditIconBg rounded-md">
                    <img
                      src={EditIconSrc}
                      className="w-6 h-6 text-center p-1 cursor-pointer"
                      onClick={() =>
                        handleEditSubscribtionClick(
                          item.category_subscription_id,
                          datePart,
                          item.name || item.category_name,
                          item.transaction_image,
                        )
                      }
                    />
                  </div>
                ),
              className: 'flex justify-center',
            },
            {
              key: 'verified_by_reject',
              content:
                status === 'rejected' ? (
                  <img
                    src={cofirmIcon}
                    alt="Accept"
                    className="w-6 h-6 bg-ConfirmIconBg p-1 rounded-lg cursor-pointer"
                    onClick={() =>
                      handleStatus(
                        'adminName', // Pass the admin name
                        'approved', // Set the new status
                        undefined, // Pass the verification request ID
                        item.category_subscription_id, // Pass category subscription ID if needed

                        undefined, // Pass undefined if EditVerificationRequest is not used

                        editCategorySubscriptionStatus, // Function for updating category subscription status
                      )
                    }
                  />
                ) : (
                  <>
                    <img
                      src={rejectIcon}
                      alt="Reject"
                      className="w-6 h-6 bg-RejectIconBg p-1 rounded-lg cursor-pointer"
                      onClick={() =>
                        handleStatus(
                          'adminName', // Pass the admin name
                          'rejected', // Set the new status
                          undefined, // Pass the verification request ID
                          item.category_subscription_id, // Pass category subscription ID if needed

                          undefined, // Pass undefined if EditVerificationRequest is not used

                          editCategorySubscriptionStatus, // Function for updating category subscription status
                        )
                      }
                    />
                  </>
                ),
              className: 'flex justify-center',
            },
          ],
        };
      })
    : [];

  return (
    <div>
      <Breadcrumb
        breadcrumbLinks={breadcrumbLinks}
        pageName={t('verification_request.label.Part')}
      />

      <AccordionHeader2
        titles={[
          t('subscriptions.titles.processing'),
          t('subscriptions.titles.approved'),
          t('subscriptions.titles.rejected'),
          t('subscriptions.titles.expired'),
        ]}
        onTitleClick={(index) => {
          const statusMap = ['processing', 'approved', 'rejected', 'expired'];
          setStatus(statusMap[index]);
        }}
        footerItems={[
          <div>({Count})</div>,
          <div>({Count})</div>,
          <div>({Count})</div>,
          <div>({Count})</div>,
        ]}
        children={[
          <div>
            <MainTable logs={logs} headers={headers} />
            <NotFoundSection data={logs} />
          </div>,
          <div>
            <MainTable logs={logs} headers={headers} />
            <NotFoundSection data={logs} />
          </div>,
          <div>
            <MainTable logs={logs} headers={headers} />
            <NotFoundSection data={logs} />
          </div>,
          <div>
            <MainTable logs={logs} headers={headers} />
            <NotFoundSection data={logs} />
          </div>,
        ]}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default CategorySubscription;

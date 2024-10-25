import React, { useState } from 'react';
import MainTable from '../../components/lastnews/MainTable';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import useCategorySubscriptionsByStatus from '../../hooks/category_subscription/CatSubscriptionByStatus';
import cofirmIcon from '/true2.svg';
import rejectIcon from '/false2.svg';
import ReusableInput from '../../components/products/ReusableInput';
import NotFoundSection from '../../components/Notfound/NotfoundSection';
import AccordionHeader2 from '../../components/Accordion/AccordionHeader2';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import useEditCategorySubscriptionStatus from '../../hooks/category_subscription/useEditCategorySubscriptionStatus';
import ImageWithFullscreen from '../../components/Fullscreen/Fulllscreen';
import handleCategorySubscriptionStatus from '../../hooks/category_subscription/handleCategorySubscriptionStatus';
import handleEditSubscribtionClick from '../../hooks/category_subscription/handleEditSubscribtionClick';
import { useTranslation } from 'react-i18next';
//
const ApprovedSubscription = '/true.png';
const EditIconSrc = '/Edit.svg';

const CategorySubscription = () => {
  const { t } = useTranslation();
  //
  const {
    editCategorySubscriptionStatus,
    loading: editLoading,
    error: editError,
    success: editSuccess,
  } = useEditCategorySubscriptionStatus();
  //
  const breadcrumbLinks = [{ label: 'تذاكر الاشتراك', path: '/' }];

  // State to handle dynamic status
  const [status, setStatus] = useState('processing');

  const { data, loading, error } = useCategorySubscriptionsByStatus(status);
  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
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
                  widthClass="w-20"
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
                  widthClass="w-20"
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
                item.STATUS === 'expired' ? (
                  <ReusableInput
                    label=""
                    type="text"
                    value={`منتهية`}
                    widthClass="w-20"
                    extraClass="bg-Input-red text-Input-TextRed  w-40"
                  />
                ) : (
                  <ReusableInput
                    label=""
                    type="text"
                    value={`${item.verification_period} ي`}
                    widthClass="w-20"
                    extraClass="bg-Input-blue text-center"
                  />
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
                      handleCategorySubscriptionStatus(
                        item.category_subscription_id,
                        'approved',
                        'adminName',
                        editCategorySubscriptionStatus,
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
                      handleCategorySubscriptionStatus(
                        item.category_subscription_id,
                        'approved',
                        'adminName',
                        editCategorySubscriptionStatus,
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
                        handleCategorySubscriptionStatus(
                          item.category_subscription_id,
                          'rejected',
                          'adminName',
                          editCategorySubscriptionStatus,
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
      <Breadcrumb breadcrumbLinks={breadcrumbLinks} pageName="قسم" />

      <AccordionHeader2
        titles={[
          t('subscriptions.titles.processing'),
          t('subscriptions.titles.approved'),
          t('subscriptions.titles.rejected'),
          t('subscriptions.titles.expired'),
        ]}
        onTitleClick={(index) => {
          const statusMap = ['processing', 'approved', 'rejected', 'expired'];
          setStatus(statusMap[index]); // Set the correct status based on the tab clicked
        }}
        footerItems={[
          <div>({logs.length})</div>,
          <div>({logs.length})</div>,
          <div>({logs.length})</div>,
          <div>({logs.length})</div>,
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
    </div>
  );
};

export default CategorySubscription;

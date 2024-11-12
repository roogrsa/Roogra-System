import React, { useEffect, useState } from 'react';
import cofirmIcon from '/true2.svg';
import rejectIcon from '/false2.svg';

import { useTranslation } from 'react-i18next';
import useEditCategorySubscriptionStatus from '../../../hooks/category_subscription/useEditCategorySubscriptionStatus';
import CategorySubscriptionsByUserid from '../../../hooks/category_subscription/getCategorySubscriptionByUserId';
import ReusableInput from '../../products/ReusableInput';
import ImageWithFullscreen from '../../Fullscreen/Fulllscreen';
import PeriodInput from '../../../pages/category_subscription/PeriodInput';
import handleStatus from '../../../hooks/category_subscription/handleStatus';
import handleEditSubscribtionClick from '../../../hooks/category_subscription/handleEditSubscribtionClick';
import MainTable from '../../lastnews/MainTable';
import NotFoundSection from '../../Notfound/NotfoundSection';
import AccordionHeader2 from '../../Accordion/AccordionHeader2';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';

//
const ApprovedSubscription = '/true.png';
const EditIconSrc = '/Edit.svg';

const CategorySubscriptionUserid = () => {
  const { t } = useTranslation();

  //
  const {
    editCategorySubscriptionStatus,
    loading: editLoading,
    error: editError,
    success: editSuccess,
  } = useEditCategorySubscriptionStatus();
  //
  const breadcrumbLinks = [{ label: '', path: '/' }];
  const [status, setStatus] = useState('processing');

  //
  const { data, loading, error, refreshRequest } =
    CategorySubscriptionsByUserid(
      status,
      // currentPage,
    );
  // console.log(data);
  useEffect(() => {
    if (editSuccess) {
      refreshRequest();
    }
  }, [refreshRequest]);
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
                  <PeriodInput item={item} />
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
        footerItems={[]}
        children={[
          <div key="processing">
            <MainTable logs={logs} headers={headers} />
            <NotFoundSection data={logs} />
          </div>,
          <div key="approved">
            <MainTable logs={logs} headers={headers} />
            <NotFoundSection data={logs} />
          </div>,
          <div key="rejected">
            <MainTable logs={logs} headers={headers} />
            <NotFoundSection data={logs} />
          </div>,
          <div key="expired">
            <MainTable logs={logs} headers={headers} />
            <NotFoundSection data={logs} />
          </div>,
        ]}
      />
    </div>
  );
};

export default CategorySubscriptionUserid;

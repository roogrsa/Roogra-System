import React, { useState } from 'react';
import MainTable from '../../components/lastnews/MainTable';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import useCategorySubscriptionsByStatus from '../../hooks/category_subscription/CatSubscriptionByStatus';
import cofirmIcon from '../../../public/true2.svg';
import rejectIcon from '../../../public/false2.svg';
import ReusableInput from '../../components/products/ReusableInput';
import NotFoundSection from '../../components/Notfound/NotfoundSection';
import AccordionHeader2 from '../../components/Accordion/AccordionHeader2';

const CategorySubscription = () => {
  const breadcrumbLinks = [{ label: 'تذاكر الاشتراك/', path: '/' }];

  // State to handle dynamic status
  const [status, setStatus] = useState('processing'); // Default to "processing"

  const { data, loading, error } = useCategorySubscriptionsByStatus(status);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const headers = [
    { key: 'id', content: 'رقم التذكرة', className: 'text-center' },
    {
      key: 'category_name',
      content: 'القسم الرئيسي',
      className: 'text-center',
    },
    { key: 'sub_name', content: 'القسم الفرعي', className: 'text-center' },
    {
      key: 'transaction_image',
      content: 'صورة التحويل',
      className: 'text-center',
    },
    { key: 'created_at', content: 'تاريخ الطلب', className: 'text-center' },
    { key: 'verification_period', content: 'المدة', className: 'text-center' },
    { key: 'verified_by', content: 'قبول', className: 'text-center' },
    { key: 'verified_by', content: 'رفض', className: 'text-center' },
  ];
  console.log(data);

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
              content: item.category_subscription_id,
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
              content: (
                <img
                  src={item.transaction_image}
                  alt="Transaction"
                  className="w-10 h-10 object-cover"
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
              content: (
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
              key: 'verified_by_accept',
              content: (
                <img
                  src={cofirmIcon}
                  alt="Accept"
                  className="w-6 h-6 bg-ConfirmIconBg p-1 rounded-lg cursor-pointer"
                  onClick={() =>
                    handleActionClick(item.category_subscription_id, 'accept')
                  }
                />
              ),
              className: 'flex justify-center',
            },
            {
              key: 'verified_by_reject',
              content: (
                <img
                  src={rejectIcon}
                  alt="Reject"
                  className="w-6 h-6 bg-RejectIconBg p-1 rounded-lg cursor-pointer"
                  onClick={() =>
                    handleActionClick(item.category_subscription_id, 'reject')
                  }
                />
              ),
              className: 'flex justify-center',
            },
          ],
        };
      })
    : [];

  // const logs = formatLogs(data);

  const handleActionClick = (id, action) => {
    console.log(`Action: ${action}, ID: ${id}`);
  };

  return (
    <div>
      <Breadcrumb breadcrumbLinks={breadcrumbLinks} pageName="قسم" />
      {/* <AccordionHeader2
        titles={['طلب', 'فعال', 'منتهي', 'رفض']}
        onTitleClick={(index) => {
          const statusMap = [
            'processing',
            'approved',
            'processing',
            'processing',
          ];
          setStatus(statusMap[index]); // Set the status based on the tab clicked
        }}
        children={[
          <NotFoundSection data={logs}>
            <MainTable logs={logs} headers={headers} />
          </NotFoundSection>,
          <NotFoundSection data={logs}>
            <MainTable logs={logs} headers={headers} />
          </NotFoundSection>,
          <NotFoundSection data={logs}>
            <MainTable logs={logs} headers={headers} />
          </NotFoundSection>,
          <NotFoundSection data={logs}>
            <MainTable logs={logs} headers={headers} />
          </NotFoundSection>,
        ]}
      /> */}
      <AccordionHeader2
        titles={['طلب', 'فعال', 'رفض', 'منتهي']}
        onTitleClick={(index) => {
          const statusMap = ['processing', 'approved', 'rejected', 'expired'];
          setStatus(statusMap[index]); // Set the correct status based on the tab clicked
        }}
        footerItems={['Footer 1', 'Footer 2', 'Footer 3', 'Footer 4']}
        children={[
          <NotFoundSection data={logs}>
            <MainTable logs={logs} headers={headers} />
          </NotFoundSection>,
          <NotFoundSection data={logs}>
            <MainTable logs={logs} headers={headers} />
          </NotFoundSection>,
          <NotFoundSection data={logs}>
            <MainTable logs={logs} headers={headers} />
          </NotFoundSection>,
          <NotFoundSection data={logs}>
            <MainTable logs={logs} headers={headers} />
          </NotFoundSection>,
        ]}
      />
    </div>
  );
};

export default CategorySubscription;

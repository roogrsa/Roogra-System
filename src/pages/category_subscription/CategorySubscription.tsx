import React from 'react';
import MainTable from '../../components/lastnews/MainTable';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import useCategorySubscriptionsByStatus from '../../hooks/category_subscription/CatSubscriptionByStatus';
import cofirmIcon from '../../../public/true2.svg';
import rejectIcon from '../../../public/false2.svg';
import CheckboxIconSrc from '../../assets/icons/checkbox.svg';
import ReusableInput from '../../components/products/ReusableInput';

const CategorySubscription = () => {
  const breadcrumbLinks = [{ label: 'تذاكر الاشتراك/', path: '/' }];
  const status = 'processing'; // Set status to "processing"
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
      content: 'صورة التحويل ',
      className: 'text-center',
    },
    { key: 'created_at', content: 'تاريخ الطلب', className: 'text-center' },
    { key: 'verification_period', content: 'المدة', className: 'text-center' },
    { key: 'verified_by', content: 'قبول', className: 'text-center' },
    { key: 'verified_by', content: 'رفض', className: 'text-center' },
  ];

  const logs = data?.map((item) => {
    const createdAtDate = new Date(item.created_at);
    const datePart = createdAtDate.toLocaleDateString();
    const timePart = createdAtDate.toLocaleTimeString();

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
            <>
              <ReusableInput
                label=""
                type="text"
                value={item.category_name}
                extraClass="bg-Input-blue text-center w-20"
              />
            </>
          ),
          className: 'flex justify-center',
        },
        {
          key: 'sub_name',
          content: (
            <>
              <ReusableInput
                label=""
                type="text"
                value={item.sub_name}
                extraClass="bg-Input-blue text-center w-20"
              />
            </>
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
          content: item.verification_period,
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
  });

  const handleActionClick = (id: number, action: string) => {
    // Handle accept/reject action here
    console.log(`Action: ${action}, ID: ${id}`);
  };

  return (
    <div>
      <Breadcrumb breadcrumbLinks={breadcrumbLinks} pageName="قسم" />

      <MainTable logs={logs} headers={headers} />
    </div>
  );
};

export default CategorySubscription;

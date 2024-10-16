import React, { useState } from 'react';
import MainTable from '../../components/lastnews/MainTable';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import useCategorySubscriptionsByStatus from '../../hooks/category_subscription/CatSubscriptionByStatus';
import cofirmIcon from '../../../public/true2.svg';
import rejectIcon from '../../../public/false2.svg';
import ReusableInput from '../../components/products/ReusableInput';
import NotFoundSection from '../../components/Notfound/NotfoundSection';
import AccordionHeader2 from '../../components/Accordion/AccordionHeader2';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
//
const ApprovedSubscription = '/true.png'; // Image for approved transactions
const EditIconSrc = '/Edit.svg';

const CategorySubscription = () => {
  const breadcrumbLinks = [{ label: 'تذاكر الاشتراك/', path: '/' }];

  // State to handle dynamic status
  const [status, setStatus] = useState('processing'); // Default to "processing"

  const { data, loading, error } = useCategorySubscriptionsByStatus(status);
  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  //
  const handleEditClick = (ID, Date, Name, Image) => {
    Swal.fire({
      html: `
      <div class="flex justify-between gap-2">
        <span class="dark:text-TextGreen text-TextBlue text-lg">${Name}</span>
        <span>${ID}</span>
      </div>
      <div class="custom-modal-content bg-primaryBG-light dark:bg-primaryBG-dark p-4 rounded-lg">
        <div>
          <div class="flex justify-start gap-2">${Date}</div>
        </div>
        <div class="comment-section mt-4 text-gray-700">
          <img src="${Image}" alt="Transaction" class="w-10 h-10 object-cover" />
        </div>
      </div>
    `,
      showConfirmButton: false,
      confirmButtonText: 'Close',
      customClass: {
        popup:
          'custom-popup bg-secondaryBG-light dark:bg-secondaryBG-dark border rounded-md',
        confirmButton:
          'custom-confirm-button bg-blue-500 text-white py-2 px-4 rounded-md',
      },
    });
  };

  // const handleEditClick = (
  //   ID: number,
  //   Date: date,
  //   Name: string,
  //   Image: string,
  // ) => {
  //   Swal.fire({
  //     // title: ,
  //     html: `
  //   <div class="flex justify-between gap-2">
  //     <span class=" dark:text-TextGreen text-TextBlue text-lg">${Name}</span>
  //      <span> ${ID}</span>
  //     </div>
  //     <div class="custom-modal-content bg-primaryBG-light dark:bg-primaryBG-dark p-4 rounded-lg">
  //     <div class="">
  //         <div class="flex justify-start  gap-2">
  //         ${Date}
  //         </div>
  //       </div>
  //       <div class="comment-section mt-4 text-gray-700">
  //         <img
  //                   src={${Image}}
  //                   alt="Transaction"
  //                   className="w-10 h-10 object-cover"
  //                 />
  //       </div>
  //     </div>
  //   `,
  //     showConfirmButton: false,
  //     confirmButtonText: 'Close',
  //     customClass: {
  //       popup:
  //         'custom-popup bg-secondaryBG-light dark:bg-secondaryBG-dark border rounded-md',
  //       title: '',
  //       confirmButton:
  //         'custom-confirm-button bg-blue-500 text-white py-2 px-4 rounded-md',
  //     },
  //   });
  // };
  //
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
      content: 'صورةالتحويل',
      className: 'text-center',
    },
    { key: 'created_at', content: 'تاريخ الطلب', className: 'text-center' },
    { key: 'verification_period', content: 'المدة', className: 'text-center' },
    { key: 'verified_by_accept', content: 'قبول', className: 'text-center' },
    { key: 'verified_by_reject', content: 'رفض', className: 'text-center' },
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
              content:
                item.STATUS === 'processing' ? (
                  <img
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
            // {
            //   key: 'Edit',
            //   content:
            //     item.STATUS === 'processing' ? (
            //       <img
            //         src={cofirmIcon}
            //         alt="Accept"
            //         className="w-6 h-6 bg-ConfirmIconBg p-1 rounded-lg cursor-pointer"
            //         onClick={() =>
            //           handleActionClick(item.category_subscription_id, 'accept')
            //         }
            //       />
            //     ) : (
            //       <div className="bg-EditIconBg rounded-md">
            //         <img
            //           src={EditIconSrc}
            //           className="w-6 h-6 text-center p-1 cursor-pointer"
            //           onClick={() =>
            //             handleEditClick(
            //               item.category_subscription_id,
            //               item.created_at,
            //               item.name,
            //               item.transaction_image,
            //             )
            //           }
            //         />
            //       </div>
            //     ),
            //   className: 'flex justify-center',
            // },
            {
              key: 'Edit',
              content:
                item.STATUS === 'processing' ? (
                  <img
                    src={cofirmIcon}
                    alt="Accept"
                    className="w-6 h-6 bg-ConfirmIconBg p-1 rounded-lg cursor-pointer"
                    onClick={() =>
                      handleActionClick(item.category_subscription_id, 'accept')
                    }
                  />
                ) : (
                  <div className="bg-EditIconBg rounded-md">
                    <img
                      src={EditIconSrc}
                      className="w-6 h-6 text-center p-1 cursor-pointer"
                      onClick={() =>
                        handleEditClick(
                          item.category_subscription_id,
                          item.created_at,
                          item.name || item.category_name, // Choose the name or category
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

  const handleActionClick = (id, action) => {
    console.log(`Action: ${action}, ID: ${id}`);
  };

  return (
    <div>
      <Breadcrumb breadcrumbLinks={breadcrumbLinks} pageName="قسم" />

      <AccordionHeader2
        titles={['طلب', 'فعال', 'رفض', 'منتهي']}
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

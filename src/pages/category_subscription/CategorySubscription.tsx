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
import useHandleAction from '../../hooks/useHandleAction';
import useEditCategorySubscriptionStatus from '../../hooks/category_subscription/useEditCategorySubscriptionStatus';
//

const ApprovedSubscription = '/true.png'; // Image for approved transactions
const EditIconSrc = '/Edit.svg';

const CategorySubscription = () => {
  const {
    editCategorySubscriptionStatus,
    loading: editLoading,
    error: editError,
    success: editSuccess,
  } = useEditCategorySubscriptionStatus();
  //
  const handleCategorySubscriptionStatus = async (categoryId, newStatus) => {
    try {
      await editCategorySubscriptionStatus(categoryId, newStatus);
      window.location.reload();

      console.log(`${newStatus}`);
    } catch (error) {
      console.log(error);
    }
  };

  //
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
    <div class="text-center ">
      <h3 class="text-xl font-semibold  text-text-light dark:text-text-dark mb-2">تحرير تذكرة القسم</h3>
      <div class="grid grid-cols-3 gap-4">
   
       
        <div class="bg-primaryBG-light dark:bg-primaryBG-dark border border-Input-border p-2 rounded-lg">
          <span class="block text-lg text-text-light dark:text-text-dark ">بواسطة</span>
          <span class="text-lg font-">${Name}</span>
        </div>
       
         <div class="bg-primaryBG-light dark:bg-primaryBG-dark  p-2 border border-Input-border rounded-lg">
          <span class="block text-lg text-text-light dark:text-text-dark ">تاريخ التفعيل</span>
          <span class="text-lg font-">${Date}</span>
        </div>
              <div class="bg-primaryBG-light dark:bg-primaryBG-dark border border-Input-border  p-2 rounded-lg">
          <span class="block text-lg text-text-light dark:text-text-dark ">رقم التذكرة</span>
          <span class="text-lg font-">RS-${ID}</span>
        </div>
      </div>
      <div class="mt-4   flex justify-center    p-2">
       <div class="w-40 bg-primaryBG-light dark:bg-primaryBG-dark rounded-lg  border border-Input-border">
        <span class="block text-lg text-text-light dark:text-text-dark  mb-2">صورة التحويل</span>
        <img src=${Image} alt="Transaction" class="w-32 h-30 object-cover mx-auto my-2 rounded-md" />
      </div>
      </div>
     
    </div>
  `,
      showConfirmButton: false,
      customClass: {
        popup:
          'custom-popup bg-secondaryBG-light dark:bg-secondaryBG-dark border rounded-lg  p-2',
      },
    });
  };

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

    {
      key: 'verified_by_accept',
      content: status === 'processing' ? 'قبول' : 'تحرير',
      className: 'text-center',
    },
    {
      key: 'verified_by_reject',
      content: status === 'rejected' ? 'قبول' : 'رفض',
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
                      )
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
                        )
                      }
                    />
                  </>
                ),
              className: 'flex justify-center',
            },

            // {
            //   key: 'verified_by_approved OR Edit',
            //   content:
            //     item.STATUS === 'processing' ? (
            //       <img
            //         src={cofirmIcon}
            //         alt="Accept"
            //         className="w-6 h-6 bg-ConfirmIconBg p-1 rounded-lg cursor-pointer"
            //         onClick={() =>

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
            //               datePart,
            //               item.name || item.category_name, // Choose the name or category
            //               item.transaction_image,
            //             )
            //           }
            //         />
            //       </div>
            //     ),
            //   className: 'flex justify-center',
            // },
            // {
            //   key: 'verified_by_reject',
            //   content: (
            //     <img
            //       src={rejectIcon}
            //       alt="Reject"
            //       className="w-6 h-6 bg-RejectIconBg p-1 rounded-lg cursor-pointer"
            //       onClick={() =>
            //       }
            //     />
            //   ),
            //   className: 'flex justify-center',
            // },
          ],
        };
      })
    : [];

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

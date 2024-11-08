import React, { useEffect, useState } from 'react';
import MainTable from '../../components/lastnews/MainTable';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import cofirmIcon from '/true2.svg';
import rejectIcon from '/false2.svg';
import ReusableInput from '../../components/products/ReusableInput';
import NotFoundSection from '../../components/Notfound/NotfoundSection';
import AccordionHeader2 from '../../components/Accordion/AccordionHeader2';
import ImageWithFullscreen from '../../components/Fullscreen/Fulllscreen';
import { useTranslation } from 'react-i18next';
import Pagination from '../../components/pagination/Pagination';
import axiosInstance from '../../axiosConfig/instanc';
import PeriodInput from '../category_subscription/PeriodInput';
import useEditVerificationRequest from '../../hooks/category_subscription/useEditVerficationReq';
import handleStatus from '../../hooks/category_subscription/handleStatus';
import handleEditVerificationRequest from '../../hooks/verifaction_requests/handleEditVerificationReq';
import useVerificationRequestsByStatus from '../../hooks/verifaction_requests/useVerificationRequestsByStatus';
import DeletePopup from '../../components/popups/DeletePopup';
import useToggleVerification from '../../hooks/verifaction_requests/useUpdateVerification';
import { ToastContainer } from 'react-toastify';

//
const ApprovedSubscription = '/true.png';
const EditIconSrc = '/Edit.svg';
const RemoveIconSrc = '/remove.svg';

const verifaction_requestByStatus = () => {
  const { t } = useTranslation();

  //
  const {
    EditVerificationRequest,
    loading: editLoading,
    error: editError,
    success: editSuccess,
  } = useEditVerificationRequest();
  //
  const breadcrumbLinks = [
    { label: t('verification_request.label.label'), path: '/' },
  ];

  // State to handle dynamic status
  const [status, setStatus] = useState('processing');
  const [refresh, setRefresh] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [verificationRequestCount, setverificationRequestCount] = useState(0);
  const [Count, setCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteName, setDeleteName] = useState<string>('');
  //
  const display = async () => {
    // setRefresh(true);
  };
  //
  useEffect(() => {
    const fetchUsersCount = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/verification_request/status/${status}/count`,
        );
        setverificationRequestCount(response.data.data.count / 8);
        setCount(response.data.data.count);
        // console.log(status, response.data.data.count);
      } catch (err) {}
    };
    fetchUsersCount();
  }, [Count, status]);
  const totalPages = Math.ceil(verificationRequestCount);

  //

  const { data, loading, error } = useVerificationRequestsByStatus(
    status,
    currentPage,
    // refresh,
  );

  const handleOpenDeleteModal = (id: number, name: string) => {
    setDeleteId(id);
    setDeleteName(name);
    setIsModalOpen(true);
  };
  const { toggleVerificationRequired } = useToggleVerification();
  // console.log(data);

  const headers = [
    {
      key: 'id',
      content: t('verification_request.headers.id'),
      className: 'text-center text-sm',
    },
    {
      key: 'verification_type',
      content: t('verification_request.headers.verification_type'),
      className: 'text-center text-sm',
    },
    {
      key: 'verification_type_number',
      content: t('verification_request.headers.verification_type_number'),
      className: 'text-center text-sm',
    },
    {
      key: 'verification_type_image',
      content: t('verification_request.headers.verification_type_image'),
      className: 'text-center text-sm',
    },
    {
      key: 'verification_required',
      content: t('verification_request.headers.verification_required'),
      className: 'text-center text-sm',
    },
    {
      key: 'transaction_image',
      content: t('verification_request.headers.transaction_image'),
      className: 'text-center text-sm',
    },
    {
      key: 'created_at',
      content: t('verification_request.headers.created_at'),
      className: 'text-center text-sm',
    },
    ...(status === 'expaired' || status === 'approved'
      ? [
          {
            key: 'verified_at',
            content: t('verification_request.headers.verified_at'),
            className: 'text-center text-sm',
          },
        ]
      : []),
    {
      key: 'verification_period',
      content: t('verification_request.headers.verification_period'),
      className: 'text-center text-sm',
    },
    ...(status === 'rejected'
      ? [
          {
            key: 'By-admin',
            content: t('verification_request.headers.By-admin'),
            className: 'text-center text-sm',
          },
        ]
      : []),
    {
      key: 'verified_by_accept',
      content:
        status === 'processing'
          ? t('subscriptions.headers.verified_by_accept')
          : t('subscriptions.headers.edit'),
      className: 'text-center text-sm',
    },
    {
      key: 'verified_by_reject',
      content:
        status === 'rejected'
          ? t('verification_request.headers.verified_by_accept')
          : t('verification_request.headers.verified_by_reject'),
      className: 'text-center text-sm',
    },
    ...(status === 'rejected'
      ? [
          {
            key: 'verified_at',
            content: t('verification_request.headers.remove'),
            className: 'text-center text-sm',
          },
        ]
      : []),
  ];

  //
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;
  const logs = Array.isArray(data)
    ? data.map((item) => {
        const createdAtDate = new Date(item.created_at);
        const datePart = createdAtDate.toLocaleDateString();
        //
        const VerifiedDate = item.verified_at
          ? new Date(item.verified_at)
          : null;
        const VerifiedDatePart = VerifiedDate
          ? VerifiedDate.toLocaleDateString()
          : 'N/A';

        return {
          id: item.verification_request_id,
          type: 2,
          columns: [
            {
              key: 'id',
              content: 'RS-' + item.verification_request_id,
              className: 'flex justify-center text-sm',
            },
            {
              key: 'verification_type',
              content: item.verification_type,
              className: 'flex justify-center text-sm',
            },
            {
              key: 'verification_type_number',
              content: item.verification_type_number,
              className: 'flex justify-center text-sm',
            },
            {
              key: 'transaction_image',
              content:
                item.STATUS === 'processing' ? (
                  <ImageWithFullscreen
                    src={item.verification_type_image}
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
              className: 'flex justify-center text-sm',
            },
            {
              key: 'verification_required',
              content: (
                <button
                  onClick={() => {
                    toggleVerificationRequired(
                      item.verification_request_id,
                      item.verification_required,
                    );
                    // setStatus('approved');
                    // setStatus('rejected');
                    setRefresh(!refresh);
                  }}
                  // disabled={updateLoading}
                  className={`w-10 rounded-xl text-center text-sm ${
                    item.verification_required
                      ? !refresh
                        ? 'bg-Input-green text-Input-TextGreen border-Input-TextGreen'
                        : 'bg-Input-red text-Input-TextRed border-Input-TextRed'
                      : !refresh
                      ? 'bg-Input-red text-Input-TextRed border-Input-TextRed'
                      : 'bg-Input-green text-Input-TextGreen border-Input-TextGreen'
                  }`}
                >
                  {item.verification_required
                    ? !refresh
                      ? 'نعم'
                      : 'لا'
                    : !refresh
                    ? 'لا'
                    : 'نعم'}
                </button>
              ),
              className: 'flex justify-center text-sm',
            },
            {
              key: 'image',
              content:
                item.STATUS === 'processing' ? (
                  <ImageWithFullscreen
                    src={item.transaction_image}
                    alt="Transaction"
                    className="w-10 h-10 object-cover text-sm"
                  />
                ) : (
                  <img
                    src={ApprovedSubscription}
                    alt="Approved"
                    className="w-6 h-6 text-center text-sm"
                  />
                ),
              className: 'flex justify-center text-sm',
            },
            {
              key: 'date',
              content: `${datePart}`,
              className: 'flex justify-center text-sm',
            },
            ...(item.STATUS === 'expaired' || item.STATUS === 'approved'
              ? [
                  {
                    key: 'created_at',
                    content: `${VerifiedDatePart}`,
                    className: 'flex justify-center text-sm',
                  },
                ]
              : []),

            {
              key: 'verification_period',
              content:
                item.STATUS === 'expaired' ? (
                  <ReusableInput
                    label=""
                    type="text"
                    value={`منتهية`}
                    widthClass="w-15"
                    border="border-2 border-Input-TextRed text-Input-TextRed"
                    extraClass="bg-Input-red text-Input-TextRed text-center "
                  />
                ) : (
                  <PeriodInput item={item} />
                ),
              className: 'flex justify-center text-sm',
            },
            ...(item.STATUS === 'rejected'
              ? [
                  {
                    key: 'By',
                    content: `by`,
                    className: 'flex justify-center text-sm',
                  },
                ]
              : []),

            {
              key: 'verified_by_approved OR Edit',
              content:
                item.STATUS === 'processing' ? (
                  <img
                    src={cofirmIcon}
                    alt="Accept"
                    className="w-6 h-6 bg-ConfirmIconBg p-1 rounded-lg cursor-pointer text-sm"
                    onClick={() =>
                      handleStatus(
                        'adminName',
                        'approved',
                        undefined, // Pass undefined if `categoryId` is not relevant here
                        item.verification_request_id,
                        undefined,
                        EditVerificationRequest,
                      )
                    }
                  />
                ) : (
                  <div className="bg-EditIconBg rounded-md text-sm">
                    <img
                      src={EditIconSrc}
                      className="w-6 h-6 text-center p-1 cursor-pointer"
                      onClick={() =>
                        handleEditVerificationRequest(
                          item.verification_request_id,
                          item.verification_type,
                          item.verification_type_number,
                          undefined,
                          item.verification_type_image,
                          item.transaction_image,
                        )
                      }
                    />
                  </div>
                ),
              className: 'flex justify-center text-sm',
            },
            {
              key: 'verified_by_reject',
              content:
                status === 'rejected' ? (
                  <img
                    src={cofirmIcon}
                    alt="Accept"
                    className="w-6 h-6 bg-ConfirmIconBg p-1 rounded-lg cursor-pointer text-sm"
                    onClick={() =>
                      handleStatus(
                        'adminName',
                        'approved',
                        undefined, // Pass undefined if `categoryId` is not relevant here
                        item.verification_request_id,

                        undefined,
                        EditVerificationRequest,
                      )
                    }
                  />
                ) : (
                  <>
                    <img
                      src={rejectIcon}
                      alt="Reject"
                      className="w-6 h-6 bg-RejectIconBg p-1 rounded-lg cursor-pointer text-sm"
                      onClick={() =>
                        handleStatus(
                          'adminName',

                          'rejected',

                          undefined, // Pass undefined if `categoryId` is not relevant here
                          item.verification_request_id,

                          undefined,
                          EditVerificationRequest,
                        )
                      }
                    />
                  </>
                ),
              className: 'flex justify-center text-sm',
            },

            ...(item.STATUS === 'rejected'
              ? [
                  {
                    key: 'remove',
                    content: (
                      <div className="bg-RemoveIconBg rounded-md">
                        <img
                          src={RemoveIconSrc}
                          className="w-6 h-6 text-center p-1 cursor-pointer"
                          onClick={() =>
                            handleOpenDeleteModal(
                              item.verification_request_id,
                              `RS-${item.verification_request_id}`,
                            )
                          }
                        />
                      </div>
                    ),
                    className: 'flex justify-center text-sm',
                  },
                ]
              : []),
          ],
        };
      })
    : [];

  return (
    <div>
      <Breadcrumb
        breadcrumbLinks={breadcrumbLinks}
        pageName={t('verification_request.label.confirm')}
      />

      <AccordionHeader2
        titles={[
          t('verification_request.titles.processing'),
          t('verification_request.titles.approved'),
          t('verification_request.titles.rejected'),
          t('verification_request.titles.expired'),
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
      {/* Delete Popup */}
      {deleteId && (
        <DeletePopup
          deleteName={deleteName}
          deleteId={deleteId}
          url="verification_request" // replace with the appropriate API endpoint path if needed
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          display={display} // Function to refresh data after deletion
        />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default verifaction_requestByStatus;

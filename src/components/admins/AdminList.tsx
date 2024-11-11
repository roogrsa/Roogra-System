import React, { useEffect, useState } from 'react';
import MainTable from '../../components/lastnews/MainTable';
import { Link, useNavigate } from 'react-router-dom';
// import Pagination from '../../components/pagination/Pagination';
import { useTranslation } from 'react-i18next';
import axiosInstance from '../../axiosConfig/instanc';
import AccordionHeader2 from '../Accordion/AccordionHeader2';
import NotFoundSection from '../Notfound/NotfoundSection';
import useAdminsByType from '../../hooks/admins/AbminType';
import useHandleAction from '../../hooks/useHandleAction';
import useBanAdmin from '../../hooks/admins/useBanAdmin';
//
const NotBannedIconSrc = '/unblock.svg';
const BannedIconSrc = '/block.svg';
const CheckboxIconSrc = '/checkbox.svg';
const EditIconSrc = '/Edit.svg';
const AdminsList: React.FC = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const [adminsCount, setAdminsCount] = useState(0);
  const [adminType, setAdminType] = useState('observer');
  const { banAdmin, loading: banLoading, error: banError } = useBanAdmin();
  const { handleAction, loading: actionLoading } = useHandleAction();
  const navigate = useNavigate();
  const roleTypeMap = {
    observer: 2,
    supervisor: 3,
    delegates: 1,
  };
  const {
    admins: observers,
    loading: observerLoading,
    error: observerError,
    refreshAdminsByType: refreshObservers,
  } = useAdminsByType(roleTypeMap['observer']);

  const {
    admins: supervisors,
    loading: supervisorLoading,
    error: supervisorError,
    refreshAdminsByType: refreshSupervisors,
  } = useAdminsByType(roleTypeMap['supervisor']);

  const {
    admins: delegates,
    loading: delegateLoading,
    error: delegateError,
    refreshAdminsByType: refreshDelegates,
  } = useAdminsByType(roleTypeMap['delegates']);

  useEffect(() => {
    const fetchAdminsCount = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/admins/type/${adminType}/count`,
        );
        setAdminsCount(response.data.data.count / 8);
      } catch (err) {
        console.error('Error fetching admin count:', err);
      }
    };
    fetchAdminsCount();
  }, [adminType]);

  useEffect(() => {
    const refreshFunction = getRefreshFunction();
    refreshFunction();
  }, [adminType]);

  const handleClickName = (adminId: number) => {
    navigate(`/profile/${adminId}`);
  };
  const getRefreshFunction = () => {
    switch (adminType) {
      case 'observer':
        return refreshObservers;
      case 'supervisor':
        return refreshSupervisors;
      case 'delegates':
        return refreshDelegates;
      default:
        return () => {};
    }
  };
  const mapAdminLogs = (admins: any) =>
    admins.map((admin: any) => ({
      id: admin.id,
      columns: [
        {
          key: 'name',
          content: (
            <span
              className="cursor-pointer dark:text-TextGreen text-TextBlue"
              onClick={() => handleClickName(admin.id)}
            >
              {admin.first_name.split(' ').slice(0, 2).join(' ').slice(0, 12)}
              {/* {admin.last_name} */}
            </span>
          ),
          className: 'dark:text-[#32E26B] text-[#0E1FB2] text-center',
        },
        {
          key: 'phone',
          content: admin.phone
            ? admin.phone.split(' ').slice(0, 2).join(' ').slice(0, 12)
            : '00000000000',
          className: 'dark:text-white text-black',
        },
        {
          key: 'status',
          content: (
            <div className="flex items-center justify-center">
              <span
                className={`w-3 h-3 rounded-full mr-2 ${
                  admin.status === 1 ? 'bg-TextGreen' : 'bg-gray-400'
                }`}
              ></span>
            </div>
          ),
          className: 'text-center',
        },
        {
          key: 'date_added',
          content: new Date(admin.date_added).toLocaleDateString(),

          className: 'flex dark:text-white text-black',
        },
        {
          key: 'start_working_hour',
          content: admin.start_working_hour
            ? new Date(
                `1970-01-01T${admin.start_working_hour}`,
              ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : 'N/A',
          className: 'flex dark:text-white text-black text-center',
        },
        {
          key: 'finish_working_hour',

          content: admin.finish_working_hour
            ? new Date(
                `1970-01-01T${admin.finish_working_hour}`,
              ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : 'N/A',
          className: 'flex dark:text-white text-black text-center',
        },
        {
          key: 'Edit',
          content: (
            <div className="bg-EditIconBg rounded-md">
              <Link to={`/admins/edit-admin/${admin.id}`}>
                <img
                  src={EditIconSrc}
                  className="w-6 h-6 text-center p-1 cursor-pointer"
                />
              </Link>
            </div>
          ),
          className: 'flex justify-center',
        },
        {
          key: 'isBanned',
          content: (
            <img
              src={admin.is_banned ? BannedIconSrc : NotBannedIconSrc}
              alt={admin.is_banned ? t('admins.banned') : t('admins.notBanned')}
              className={`w-6 h-6 text-center cursor-pointer ${
                actionLoading ? 'opacity-50' : ''
              }`}
              onClick={() => {
                const refreshFunction = getRefreshFunction();

                !actionLoading &&
                  admin?.id &&
                  handleAction(
                    admin.id,
                    admin.is_banned === 1,
                    'ban',
                    banAdmin,
                    {
                      confirmButtonClass: 'bg-BlockIconBg',
                      cancelButtonClass: '',
                    },
                    refreshFunction,
                  );
              }}
            />
          ),
          className: 'flex justify-center',
        },
      ],
    }));

  const logsObserver = mapAdminLogs(observers);
  const logsSupervisor = mapAdminLogs(supervisors);
  const logsDelegates = mapAdminLogs(delegates);

  const headers = [
    {
      key: 'name',
      content: t('admins.adminList.name'),
      className: 'text-center',
    },
    {
      key: 'phone',
      content: t('admins.adminList.phone'),
      className: 'text-center',
    },
    {
      key: 'status',
      content: t('admins.adminList.status'),
      className: 'text-center',
    },
    {
      key: 'date_added',
      content: t('admins.adminList.dateAdded'),
      className: 'text-center',
    },
    {
      key: 'start_working_hour',
      content: t('admins.adminList.start_working_hour'),
      className: 'text-center',
    },
    {
      key: 'finish_working_hour',
      content: t('admins.adminList.finish_working_hour'),
      className: 'text-center',
    },
    {
      key: 'Edit',
      content: t('admins.adminList.edit'),
      className: 'text-center',
    },
    {
      key: 'BanStatus',
      content: t('admins.adminList.BanStatus'),
      className: 'text-center',
    },
  ];

  return (
    <div>
      <AccordionHeader2
        titles={[
          t('admins.observer'),
          t('admins.supervisor'),
          t('admins.delegate'),
        ]}
        onClick={(index: number) => {
          const types = ['observer', 'supervisor', 'delegate'];
          setAdminType(types[index]);
        }}
        children={[
          <>
            <NotFoundSection data={logsObserver} />
            <MainTable logs={logsObserver} header2={true} headers={headers} />
          </>,
          <>
            <NotFoundSection data={logsSupervisor} />
            <MainTable logs={logsSupervisor} header2={true} headers={headers} />
          </>,
          <>
            <NotFoundSection data={logsDelegates} />
            <MainTable logs={logsDelegates} header2={true} headers={headers} />
          </>,
        ]}
        footerItems={[
          <div className="flex gap-5">
            <span key="1">({logsObserver.length || 0})</span>
            <span key="3">
              <img src="/redRemove.svg" alt="Remove" />
            </span>
          </div>,
          <div className="flex gap-5">
            <span key="1">({logsSupervisor.length || 0})</span>
            <span key="3">
              <img src="/redRemove.svg" alt="Remove" />
            </span>
          </div>,
          <div className="flex gap-5">
            <span key="1">({logsDelegates.length || 0})</span>
            <span key="3">
              <img src="/redRemove.svg" alt="Remove" />
            </span>
          </div>,
        ]}
      />
      {/* <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      /> */}
    </div>
  );
};

export default AdminsList;

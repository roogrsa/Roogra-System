import React, { useEffect, useState } from 'react';
import MainTable from '../../components/lastnews/MainTable';
import { useNavigate } from 'react-router-dom';
// import Pagination from '../../components/pagination/Pagination';
import { useTranslation } from 'react-i18next';
import axiosInstance from '../../axiosConfig/instanc';
import AccordionHeader2 from '../Accordion/AccordionHeader2';
import NotFoundSection from '../Notfound/NotfoundSection';
import useAdminsByType from '../../hooks/admins/AbminType';

const AdminsList: React.FC = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const [adminsCount, setAdminsCount] = useState(0);
  const [adminType, setAdminType] = useState('observer');

  const navigate = useNavigate();
  // Define a mapping object for role types
  const roleTypeMap = {
    observer: 2,
    supervisor: 3,
    delegates: 1,
  };

  // Use roleTypeMap to pass the number to `useAdminsByType`
  const {
    admins: observers,
    loading: observerLoading,
    error: observerError,
  } = useAdminsByType(roleTypeMap['observer']);

  const {
    admins: supervisors,
    loading: supervisorLoading,
    error: supervisorError,
  } = useAdminsByType(roleTypeMap['supervisor']);

  const {
    admins: delegates,
    loading: delegateLoading,
    error: delegateError,
  } = useAdminsByType(roleTypeMap['delegates']);

  // const {
  //   admins: observers,
  //   loading: observerLoading,
  //   error: observerError,
  // } = useAdminsByType('observer');
  // const {
  //   admins: supervisors,
  //   loading: supervisorLoading,
  //   error: supervisorError,
  // } = useAdminsByType('supervisor');
  // const {
  //   admins: delegates,
  //   loading: delegateLoading,
  //   error: delegateError,
  // } = useAdminsByType('delegates');

  // Fetch total count of admins for pagination based on adminType
  useEffect(() => {
    const fetchAdminsCount = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/admins/type/${adminType}/count`,
        );
        setAdminsCount(response.data.data.count / 8); // Assume 8 per page
      } catch (err) {
        console.error('Error fetching admin count:', err);
      }
    };
    fetchAdminsCount();
  }, [adminType]); // Re-fetch when adminType changes

  // const totalPages = Math.ceil(adminsCount);

  const handleClickName = (adminId: number) => {
    navigate(`/profile/${adminId}`);
  };

  // Utility function to map admin data to logs
  const mapAdminLogs = (admins) =>
    admins.map((admin) => ({
      id: admin.id,
      columns: [
        {
          key: 'id',
          content: admin.id,
          className: 'dark:text-white text-black text-center',
        },
        {
          key: 'name',
          content: (
            <span
              className="cursor-pointer dark:text-TextGreen text-TextBlue"
              onClick={() => handleClickName(admin.id)}
            >
              {admin.first_name} {admin.last_name}
            </span>
          ),
          className: 'dark:text-[#32E26B] text-[#0E1FB2]',
        },
        {
          key: 'email',
          content: admin.email,
          className: 'dark:text-white text-black',
        },
        {
          key: 'status',
          content: admin.status === 1 ? 'Active' : 'Inactive',
          className: 'dark:text-white text-black text-right',
        },
        {
          key: 'date_added',
          content: admin.date_added.split(' ')[0],
          className: 'flex dark:text-white text-black',
        },
        {
          key: 'last_login',
          content: admin.last_login
            ? new Date(admin.last_login).toLocaleString()
            : 'N/A',
          className: 'flex dark:text-white text-black text-center',
        },
        {
          key: 'phone',
          content: admin.phone || 'N/A',
          className: 'dark:text-white text-black text-center',
        },
      ],
    }));

  const logsObserver = mapAdminLogs(observers);
  const logsSupervisor = mapAdminLogs(supervisors);
  const logsDelegates = mapAdminLogs(delegates);

  const headers = [
    { key: 'id', content: t('admin.id'), className: 'text-center' },
    { key: 'name', content: t('admin.name'), className: 'text-center' },
    { key: 'email', content: t('admin.email'), className: 'text-center' },
    { key: 'status', content: t('admin.status'), className: 'text-center' },
    {
      key: 'date_added',
      content: t('admin.dateAdded'),
      className: 'text-center',
    },
    {
      key: 'last_login',
      content: t('admin.lastLogin'),
      className: 'text-center',
    },
    { key: 'phone', content: t('admin.phone'), className: 'text-center' },
  ];

  return (
    <div>
      <AccordionHeader2
        titles={[
          t('admins.observer'),
          t('admins.supervisor'),
          t('admins.delegate'),
        ]}
        onClick={(index) => {
          const types = ['observer', 'supervisor', 'delegate'];
          setAdminType(types[index]); // Update the adminType based on the clicked title
        }}
        children={[
          observerLoading ? (
            <p>Loading...</p>
          ) : observerError ? (
            <p>Error: {observerError}</p>
          ) : (
            <>
              <NotFoundSection data={logsObserver} />
              <MainTable logs={logsObserver} header2={true} headers={headers} />
            </>
          ),
          supervisorLoading ? (
            <p>Loading...</p>
          ) : supervisorError ? (
            <p>Error: {supervisorError}</p>
          ) : (
            <>
              <NotFoundSection data={logsSupervisor} />
              <MainTable
                logs={logsSupervisor}
                header2={true}
                headers={headers}
              />
            </>
          ),
          delegateLoading ? (
            <p>Loading...</p>
          ) : delegateError ? (
            <p>Error: {delegateError}</p>
          ) : (
            <>
              <NotFoundSection data={logsDelegates} />
              <MainTable
                logs={logsDelegates}
                header2={true}
                headers={headers}
              />
            </>
          ),
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

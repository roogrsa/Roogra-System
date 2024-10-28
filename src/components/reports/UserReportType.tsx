import React, { useEffect, useState } from 'react';
import { useProductReports } from '../../hooks/Reports/ProductReports';
import { useTranslation } from 'react-i18next';
import NotFoundSection from '../../components/Notfound/NotfoundSection';
import MainTable from '../../components/lastnews/MainTable';
import AccordionHeader2 from '../../components/Accordion/AccordionHeader2';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useNavigate } from 'react-router-dom';
import { useUserReports } from '../../hooks/Reports/UserReports';
interface ReportType {
  reportType: 'Userproduct' | 'Userchat';
}
interface ReportData {
  report_id: number;
  chat_report_id: number;
  customer_id: number;
  product_id: number;
  content: string;
  created_at: string;
  status: number;
  close_date: string | null;
  name: string;
}
const EditIconSrc = '/Edit.svg';

const UserReportType: React.FC<ReportType> = ({ reportType }) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState(0);
  const [ReportData, setReportData] = useState<ReportData[]>([]);

  const navigate = useNavigate();

  const breadcrumbLinks = [{ label: '', path: '/' }];
  const { data, loading, error } = useUserReports();

  useEffect(() => {
    if (reportType === 'Userproduct') {
      setReportData(data.products);
      //   console.log('data.products', data.products);
    } else if (reportType === 'Userchat') {
      setReportData(data.chats);
      //   console.log('data.chats', data.chats);
    }
  }, [data, reportType]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  const handleEditClick = (productId: number) => {
    navigate(`/products/${productId}`);
  };
  const headers = [
    {
      key: 'id',
      content: t('Reports.headers.id'),
      className: 'text-center ',
    },
    {
      key: 'name',
      content: t('Reports.headers.name'),
      className: 'text-center ',
    },
    reportType === 'Userproduct'
      ? {
          key: 'product',
          content: t('Reports.headers.product'),
          className: 'text-center ',
        }
      : {
          key: 'speakerTo',
          content: t('Reports.headers.speakerTo'),
          className: 'text-center ',
        },
    {
      key: 'created_at',
      content: t('Reports.headers.created_at'),
      className: 'text-center ',
    },
    {
      key: 'actions',
      content: t('Reports.headers.actions'),
      className: 'text-center ',
    },
  ];

  const logs = Array.isArray(ReportData)
    ? ReportData.map((item) => {
        const createdAtDate = new Date(item.created_at);
        const datePart = createdAtDate.toLocaleDateString();

        return {
          id: item.report_id,
          type: 2,
          columns: [
            {
              key: 'id',
              content:
                reportType === 'Userproduct'
                  ? 'RC-' + item.report_id
                  : 'RC-' + item.chat_report_id,

              className: 'flex justify-center',
            },
            {
              key: 'name',
              content: reportType === 'Userproduct' ? item.name : 'chat name',
              className: 'flex justify-center ',
            },
            reportType === 'Userproduct'
              ? {
                  key: 'product',
                  content: item.product_id,
                  className: 'flex justify-center ',
                }
              : {
                  key: 'reported_customer',
                  content: 'item.reported_customer',
                  className: 'flex justify-center ',
                },
            {
              key: 'created_at',
              content: datePart,
              className: 'flex justify-center ',
            },
            {
              key: 'actions',
              content: (
                <div className="bg-EditIconBg rounded-md ">
                  <img
                    src={EditIconSrc}
                    className="w-6 h-6 text-center p-1 cursor-pointer"
                    onClick={() => handleEditClick(item.product_id)}
                  />
                </div>
              ),
              className: 'flex justify-center ',
            },
          ],
        };
      })
    : [];

  return (
    <div>
      <Breadcrumb
        breadcrumbLinks={breadcrumbLinks}
        pageName={
          reportType === 'Userproduct'
            ? t('Reports.label.product')
            : t('Reports.label.chat')
        }
      />

      <AccordionHeader2
        titles={[t('Reports.titles.reports'), t('Reports.titles.revision')]}
        onTitleClick={(index) => {
          const statusMap = [0, 1];
          setStatus(statusMap[index]);
        }}
        children={[
          <div key={status}>
            <MainTable logs={logs} headers={headers} />
            <NotFoundSection data={logs} />
          </div>,
          <div key={status}>
            <MainTable logs={logs} headers={headers} />
            <NotFoundSection data={logs} />
          </div>,
        ]}
      />
    </div>
  );
};

export default UserReportType;

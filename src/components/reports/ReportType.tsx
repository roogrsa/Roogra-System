import React, { useState } from 'react';
import { useProductReports } from '../../hooks/Reports/ProductReports';
import { useTranslation } from 'react-i18next';
import NotFoundSection from '../Notfound/NotfoundSection';
import MainTable from '../lastnews/MainTable';
import AccordionHeader2 from '../Accordion/AccordionHeader2';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import { Link, useNavigate, useParams } from 'react-router-dom';
interface ReportType {
  reportType: 'product' | 'chat';
}
const EditIconSrc = '/Edit.svg';

const ReportType: React.FC<ReportType> = ({ reportType }) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState(0);
  const navigate = useNavigate();
  const {rc_search} = useParams();
  console.log(rc_search);
  
  const breadcrumbLinks = [{ label: t('Reports.label.label'), path: '/' }];
  const { data, loading, error } = useProductReports(reportType, status);

  //   if (loading) return <p>Loading...</p>;
  //   if (error) return <p>{error}</p>;
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
    reportType === 'product'
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

  const logs = Array.isArray(data)
    ? data.map((item) => {
        const createdAtDate = new Date(item.created_at);
        const datePart = createdAtDate.toLocaleDateString();

        return {
          id: item.report_id,
          type: 2,
          columns: [
            {
              key: 'id',
              content:
                reportType === 'product'
                  ? 'RC-' + item.report_id
                  : 'RC-' + item.chat_report_id,

              className: 'flex justify-center',
            },
            {
              key: 'name',
              content: reportType === 'product' ? item.name : item.reported,
              className: 'flex justify-center ',
            },
            reportType === 'product'
              ? {
                  key: 'product',
                  content: item.product_name,
                  className: 'flex justify-center ',
                }
              : {
                  key: 'reported_customer',
                  content: item.reporter,
                  className: 'flex justify-center ',
                },
            {
              key: 'created_at',
              content: datePart,
              className: 'flex justify-center ',
            },
            reportType === 'product'
              ? {
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
                }
              : {
                  key: 'actions',
                  content: (
                    <div className="bg-EditIconBg rounded-md ">
                      <Link to={`/reports/chat/${item.customer_id}`}
                      state={{ reportId: item.chat_report_id }}>
                      <img
                        src={EditIconSrc}
                        className="w-6 h-6 text-center p-1 cursor-pointer"
                        // onClick={'mariem'}
                      />
                      </Link>
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
          reportType === 'product'
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

export default ReportType;

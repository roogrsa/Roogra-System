import React, { useState } from 'react';
import { useProductReports } from '../../hooks/Reports/ProductReports';
import { useTranslation } from 'react-i18next';
import NotFoundSection from '../../components/Notfound/NotfoundSection';
import MainTable from '../../components/lastnews/MainTable';
import AccordionHeader2 from '../../components/Accordion/AccordionHeader2';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useNavigate } from 'react-router-dom';

const EditIconSrc = '/Edit.svg';

const ProductReport = () => {
  const { t } = useTranslation();
  const [status, setStatus] = useState(0);
  const navigate = useNavigate();

  const breadcrumbLinks = [{ label: t('Reports.label.label'), path: '/' }];
  const { data, loading, error } = useProductReports('product', status);

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
    {
      key: 'product',
      content: t('Reports.headers.product'),
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
              content: 'RC-' + item.report_id,
              className: 'flex justify-center',
            },
            {
              key: 'name',
              content: item.name,
              className: 'flex justify-center ',
            },
            {
              key: 'product',
              content: item.product_id,
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
        pageName={t('Reports.label.product')}
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

export default ProductReport;

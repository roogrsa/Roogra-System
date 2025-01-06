import { useEffect, useState } from 'react';
import ChartThree from '../../components/Charts/ChartThree';
import useLogs from '../../hooks/getLogs';
import MainTable from '../../components/lastnews/MainTable';
import useChartData from '../../hooks/useChartData';
import HeaderLastNews from '../../components/lastnews/HeaderLastNews';
import { MdOutlineWatchLater } from 'react-icons/md';
import Pagination from '../../components/pagination/Pagination';
import axiosInstance from '../../axiosConfig/instanc';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Charts = () => {
  const nameClass = 'dark:text-[#32E26B] text-[#0E1FB2]';
  const colorEvenClass = 'text-[20px] dark:text-[#2F44FF] text-[#19930E]';
  const colorOddClass = ' text-[20px] text-[#A130BE]';
  const TypeClass = 'dark:text-white text-black';
  const timeClass = 'flex dark:text-white text-black';
  const iconClass = 'mx-3 mt-1';
  const [currentPage, setCurrentPage] = useState(0);
  const [logsCount, setLogsCount] = useState(0);
  const navigate = useNavigate();

  const { t } = useTranslation();

  useEffect(() => {
    const fetchLogsCount = async () => {
      try {
        const response = await axiosInstance.get(`/api/logs/count`);
        setLogsCount(response.data.data.count / 8);
      } catch (err) {}
    };
    fetchLogsCount();
  }, []);
  // Fetch data using the custom hook for logs
  const { logs } = useLogs(currentPage);
  const totalPages = Math.ceil(logsCount);

  // Fetch chart data using the custom hook for charts
  const { customerChartData, advertiserChartData } = useChartData();

 
  if (!customerChartData || !advertiserChartData) {
    return <p>No chart data available</p>;
  }
  const handleClickName = (customerId: number) => {
    navigate(`/profile/${customerId}`);
  };

  const dynamicColumns = logs.map((log, index) => {
    const logType =
      log.type === 1 ? t('charts.customer') : t('charts.advertiser');
    return {
      customer_activity_id: log.customer_activity_id,
      columns: [
        {
          key: `name-${log.customer_activity_id}`,
          content: (
            <span
              onClick={() => handleClickName(log.customer_id)}
              className={`cursor-pointer ${nameClass}`}
            >
              {JSON.parse(log.data).name.split(' ')[0]}
            </span>
          ),
          className: nameClass,
        },
        {
          key: `key-${log.customer_activity_id}`,
          content:
            log.key === 'login'
              ? t('lastNews.lastLogin')
              : log.key === 'register'
              ? t('lastNews.register')
              : t('lastNews.edit'),
          className: index % 2 === 0 ? colorEvenClass : colorOddClass,
        },
        {
          key: `type-${log.customer_activity_id}`,
          content: logType, // Show 'customer' or 'advertiser' based on log type
          className: TypeClass,
        },
        {
          key: `date_added-${log.customer_activity_id}`,
          content: log.date_added,
          className: timeClass,
          isIcon: true,
          iconClass: iconClass,
          IconComponent: MdOutlineWatchLater, // WatchLater icon for date
        },
      ],
    };
  });

  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        {/* Pass the fetched customer chart data to ChartThree */}
        <ChartThree
          series={customerChartData.series}
          labels={customerChartData.labels}
          statesData={customerChartData.statesData}
          title={t('charts.customers')}
          total={customerChartData.total}
        />

        {/* Pass the fetched advertiser chart data to ChartThree */}
        <ChartThree
          series={advertiserChartData.series}
          labels={advertiserChartData.labels}
          statesData={advertiserChartData.statesData}
          title={t('charts.advertisers')}
          total={advertiserChartData.total}
        />
      </div>

      {/* Render the MainTable with logs data */}
      <div>
        <HeaderLastNews />

        <MainTable logs={dynamicColumns} />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default Charts;

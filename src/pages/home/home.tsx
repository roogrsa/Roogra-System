// import React from 'react';
// import ChartThree from '../../components/Charts/ChartThree';
// import useLogs from '../../hooks/getLogs';
// import MainTable from '../../components/lastnews/MainTable';
// import useChartData from '../../hooks/useChartData';

// const Home = () => {
//   const nameClass = 'dark:text-[#32E26B] text-[#0E1FB2]';
//   const colorEvenClass = 'dark:text-[#2F44FF] text-[#19930E]';
//   const colorOddClass = 'text-[#A130BE]';
//   const TypeClass = 'dark:text-white text-black';
//   const timeClass = 'flex dark:text-white text-black';
//   const iconClass = 'mx-3 mt-1';

//   // Fetch data using the custom hook for logs
//   const { logs, loading: logsLoading, error: logsError } = useLogs(0, 8);

//   // Fetch chart data using the custom hook for charts
//   const {
//     customerChartData,
//     advertiserChartData,
//     loading: chartsLoading,
//     error: chartsError,
//   } = useChartData();

//   // Handle loading and error states for both hooks
//   if (logsLoading || chartsLoading) {
//     return <p>Loading...</p>;
//   }

//   if (logsError) {
//     return <p>Error loading logs: {logsError}</p>;
//   }

//   if (chartsError) {
//     return <p>Error loading chart data: {chartsError}</p>;
//   }

//   // Fallback if chart data is not available
//   if (!customerChartData || !advertiserChartData) {
//     return <p>No chart data available</p>;
//   }

//   // Generate columns dynamically from the logs data
//   const dynamicColumns = logs.map((log, index) => ({
//     customer_activity_id: log.customer_activity_id,
//     columns: [
//       {
//         key: 'name',
//         content: JSON.parse(log.data).name,
//         className: nameClass,
//       },
//       {
//         key: 'key',
//         content:
//           log.key === 'login'
//             ? 'قام بتسجيل الدخول   '
//             : log.key === 'register'
//             ? '  إنشاء حساب جديد'
//             : 'تم تعديل الحساب',
//         className: index % 2 === 0 ? colorEvenClass : colorOddClass,
//       },
//       {
//         key: 'type',
//         content: log.type,
//         className: TypeClass,
//       },
//       {
//         key: 'date_added',
//         content: log.date_added,
//         className: timeClass,
//         isIcon: true,
//         iconClass: iconClass,
//       },
//     ],
//   }));

//   return (
//     <>
//       <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
//         {/* Pass the fetched customer chart data to ChartThree */}
//         <ChartThree
//           series={customerChartData.series}
//           labels={customerChartData.labels}
//           statesData={customerChartData.statesData}
//           title="عدد الزبائن"
//           total={customerChartData.total}
//         />

//         {/* Pass the fetched advertiser chart data to ChartThree */}
//         <ChartThree
//           series={advertiserChartData.series}
//           labels={advertiserChartData.labels}
//           statesData={advertiserChartData.statesData}
//           title="عدد المعلنين"
//           total={advertiserChartData.total} // Pass total value
//         />
//       </div>

//       {/* Render the MainTable with logs data */}
//       <div>
//         <MainTable logs={dynamicColumns} />
//       </div>
//     </>
//   );
// };

// export default Home;
import React, { useEffect, useState } from 'react';
import ChartThree from '../../components/Charts/ChartThree';
import useLogs from '../../hooks/getLogs';
import MainTable from '../../components/lastnews/MainTable';
import useChartData from '../../hooks/useChartData';
import HeaderLastNews from '../../components/lastnews/HeaderLastNews';
import { MdOutlineWatchLater } from 'react-icons/md';
import Pagination from '../../components/pagination/Pagination';
import axiosInstance from '../../axiosConfig/instanc';

const Charts = () => {
  const nameClass = 'dark:text-[#32E26B] text-[#0E1FB2]';
  const colorEvenClass = 'dark:text-[#2F44FF] text-[#19930E]';
  const colorOddClass = 'text-[#A130BE]';
  const TypeClass = 'dark:text-white text-black';
  const timeClass = 'flex dark:text-white text-black';
  const iconClass = 'mx-3 mt-1';
  const [currentPage, setCurrentPage] = useState(0);
  const [logsCount, setLogsCount] = useState(0);

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
  const { logs, loading: logsLoading, error: logsError } = useLogs(currentPage);
  const totalPages = Math.ceil(logsCount);

  // Fetch chart data using the custom hook for charts
  const {
    customerChartData,
    advertiserChartData,
    loading: chartsLoading,
    error: chartsError,
  } = useChartData();

  // Handle loading and error states for both hooks
  if (logsLoading || chartsLoading) {
    return <p>Loading...</p>;
  }

  if (logsError) {
    return <p>Error loading logs: {logsError}</p>;
  }

  if (chartsError) {
    return <p>Error loading chart data: {chartsError}</p>;
  }

  // Fallback if chart data is not available
  if (!customerChartData || !advertiserChartData) {
    return <p>No chart data available</p>;
  }

  // Generate columns dynamically from the logs data
  const dynamicColumns = logs.map((log, index) => {
    const logType = log.type === 1 ? 'customer' : 'advertiser'; // Check if type is customer (1) or advertiser (2)

    return {
      customer_activity_id: log.customer_activity_id,
      columns: [
        {
          key: 'name',
          content: JSON.parse(log.data).name.split(' ')[0],
          className: nameClass,
        },

        {
          key: 'key',
          content:
            log.key === 'login'
              ? 'قام بتسجيل الدخول   '
              : log.key === 'register'
              ? '  إنشاء حساب جديد'
              : 'تم تعديل الحساب',
          className: index % 2 === 0 ? colorEvenClass : colorOddClass,
        },
        {
          key: 'type',
          content: logType, // Show 'customer' or 'advertiser' based on log type
          className: TypeClass,
        },
        {
          key: 'date_added',
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
          title="عدد الزبائن"
          total={customerChartData.total}
        />

        {/* Pass the fetched advertiser chart data to ChartThree */}
        <ChartThree
          series={advertiserChartData.series}
          labels={advertiserChartData.labels}
          statesData={advertiserChartData.statesData}
          title="عدد المعلنين"
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

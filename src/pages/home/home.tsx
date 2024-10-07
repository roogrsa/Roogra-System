import React from 'react';
import ChartThree from '../../components/Charts/ChartThree';
import useLogs from '../../hooks/getLogs';
import MainTable from '../../components/lastnews/MainTable';

const Home = () => {
  const nameClass = 'dark:text-[#32E26B] text-[#0E1FB2]';
  const colorEvenClass = 'dark:text-[#2F44FF] text-[#19930E]';
  const colorOddClass = 'text-[#A130BE]';
  const TypeClass = 'dark:text-white text-black';
  const timeClass = 'flex dark:text-white text-black';
  const iconClass = 'mx-3 mt-1';

  // Fetch data using the custom hook
  const { logs, loading, error } = useLogs(0, 8);

  // Handle loading and error states
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Generate columns dynamically from the logs data
  const dynamicColumns = logs.map((log, index) => ({
    customer_activity_id: log.customer_activity_id,
    columns: [
      {
        key: 'name',
        content: JSON.parse(log.data).name,
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
        key: 'ip',
        content: log.ip,
        className: TypeClass,
      },
      {
        key: 'date_added',
        content: log.date_added,
        className: timeClass,
        isIcon: true,
        iconClass: iconClass,
      },
    ],
  }));
  // +++++++++++++++++++++++++++++++++++++++++++++
  const seriesData = [65, 34, 12]; // Example chart data
  const labelsData = ['نشيط', 'كسول', 'متوقف']; // Example labels
  const statesData = [
    { label: 'نشيط', count: 347, color: '#5FDD54' },
    { label: 'كسول', count: 246, color: '#019CF6' },
    { label: 'متوقف', count: 234, color: '#D0D0D0' },
  ];

  const seriesData2 = [60, 20, 15]; // Example chart data
  const labelsData2 = ['نشيط', 'كسول', 'متوقف']; // Example labels
  const statesData2 = [
    { label: 'نشيط', count: 100, color: '#5FDD54' },
    { label: 'كسول', count: 60, color: '#019CF6' },
    { label: 'متوقف', count: 190, color: '#D0D0D0' },
  ];
  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartThree
          series={seriesData}
          labels={labelsData}
          statesData={statesData}
          title="عدد الزبائن"
        />
        <ChartThree
          series={seriesData2}
          labels={labelsData2}
          statesData={statesData2}
          title="عدد المعلنين "
        />
      </div>
      <div>
        <MainTable logs={dynamicColumns} />
      </div>
    </>
  );
};

export default Home;

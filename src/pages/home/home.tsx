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

  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartThree /> <ChartThree />
      </div>
      <div>
        <MainTable logs={dynamicColumns} />
      </div>
    </>
  );
};

export default Home;

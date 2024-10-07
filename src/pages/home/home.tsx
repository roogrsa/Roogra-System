// import React from 'react';
// import ChartThree from '../../components/Charts/ChartThree';
// import LastNews from '../../components/lastnews/LastNews';

// const Home = () => {
//   const nameClass = ` dark:text-[#32E26B] text-[#0E1FB2]`;
//   const colorEvenClass = ` dark:text-[#2F44FF] text-[#19930E]`;
//   const colorOddClass = ` text-[#A130BE]`;
//   const categoryClass = `  dark:text-white text-black`;
//   const timeClass = ` flex  dark:text-white text-black`;
//   const iconClass = `mx-3 mt-1`;
//   return (
//     <>
//       <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
//         <ChartThree /> <ChartThree />
//       </div>
//       <div>
//         {/* <LastNews
//           colorEvenClass={colorEvenClass}
//           colorOddClass={colorOddClass}
//           nameClass={nameClass}
//           categoryClass={categoryClass}
//           timeClass={timeClass}
//           iconClass={iconClass}
//         /> */}
//         <LastNews
//           columns={[
//             { key: 'name', className: { nameClass } },
//             { key: 'key', className:  },
//             { key: 'ip', className: 'text-red-500' },
//             { key: 'date_added', className: 'text-gray-500', isIcon: true },
//           ]}
//         />
//       </div>
//     </>
//   );
// };

// export default Home;
import React from 'react';
import ChartThree from '../../components/Charts/ChartThree';
import LastNews from '../../components/lastnews/LastNews';

const Home = () => {
  const nameClass = 'dark:text-[#32E26B] text-[#0E1FB2]';
  const colorEvenClass = 'dark:text-[#2F44FF] text-[#19930E]';
  const colorOddClass = 'text-[#A130BE]';
  const TypeClass = 'dark:text-white text-black';
  const timeClass = 'flex dark:text-white text-black';
  const iconClass = 'mx-3 mt-1 text-red-400';

  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartThree /> <ChartThree />
      </div>
      <div>
        <LastNews
          columns={[
            { key: 'name', className: nameClass },
            {
              key: 'key',
              className: (index: number) =>
                index % 2 === 0 ? colorEvenClass : colorOddClass,
              formatContent: (key: string) => {
                return key === 'login'
                  ? 'تسجيل الدخول'
                  : key === 'register'
                  ? 'إنشاء حساب'
                  : 'تعديل الحساب';
              },
            },
            { key: 'ip', className: TypeClass },
            {
              key: 'date_added',
              className: timeClass,
              isIcon: true,
              iconClass: iconClass,
            },
          ]}
        />
      </div>
    </>
  );
};

export default Home;

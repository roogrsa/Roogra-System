// // import React from 'react';
// // import { MdOutlineWatchLater } from 'react-icons/md';
// // import HeaderLastNews from './HeaderLastNews';
// // import useLogs from '../../hooks/getLogs';
// // import TableCell from './TableCell';

// // interface LastNewsProps {
// //   nameClass: string;
// //   colorEvenClass: string;
// //   colorOddClass: string;
// //   categoryClass: string;
// //   timeClass: string;
// //   iconClass: string;
// // }

// // const LastNews: React.FC<LastNewsProps> = ({
// //   nameClass,
// //   colorEvenClass,
// //   colorOddClass,
// //   categoryClass,
// //   timeClass,
// //   iconClass,
// // }) => {
// //   // Fetch data from the API
// //   const { logs, loading, error } = useLogs(0, 8);
// //   const DataRecieved = logs;

// //   if (loading) {
// //     return <p>Loading...</p>;
// //   }

// //   if (error) {
// //     return <p>Error: {error}</p>;
// //   }

// //   return (
// //     <div>
// //       <HeaderLastNews />
// //       <div className="relative overflow-x-auto">
// //         <table className="w-full text-[20px] text-left rtl:text-right">
// //           <tbody>
// //             {DataRecieved.map((item, index) => (
// //               <tr
// //                 key={item.customer_activity_id}
// //                 className={
// //                   index % 2 === 0
// //                     ? 'dark:bg-[#1E1E26] bg-[#FFFFFF]'
// //                     : 'dark:bg-[#2E2D3D] bg-[#F7F5F9]'
// //                 }
// //               >
// //                 {/* Use reusable TableCell for each field */}
// //                 <TableCell
// //                   content={JSON.parse(item.data).name}
// //                   className={nameClass}
// //                 />
// //                 <TableCell
// //                   content={
// //                     item.key === 'login'
// //                       ? 'تسجيل الدخول'
// //                       : item.key === 'register'
// //                       ? 'إنشاء حساب'
// //                       : 'تعديل الحساب'
// //                   }
// //                   className={index % 2 === 0 ? colorEvenClass : colorOddClass}
// //                 />
// //                 <TableCell content={item.key} className={categoryClass} />
// //                 <TableCell
// //                   content={
// //                     <span className="flex">
// //                       <MdOutlineWatchLater className={iconClass} />
// //                       {item.date_added}
// //                     </span>
// //                   }
// //                   className={timeClass}
// //                 />
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LastNews;
// import React from 'react';
// import { MdOutlineWatchLater } from 'react-icons/md';
// import HeaderLastNews from './HeaderLastNews';
// import useLogs from '../../hooks/getLogs';
// import TableCell from './TableCell';

// interface LastNewsProps {
//   columns: {
//     key: string; // The key in the log data
//     className: string; // Class to apply to the <td>
//     isIcon?: boolean; // Optional: if the column includes an icon
//   }[];
// }

// const LastNews: React.FC<LastNewsProps> = ({ columns }) => {
//   // Fetch data from the API
//   const { logs, loading, error } = useLogs(0, 8);
//   const DataRecieved = logs;

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   return (
//     <div>
//       <HeaderLastNews />
//       <div className="relative overflow-x-auto">
//         <table className="w-full text-[20px] text-left rtl:text-right">
//           <tbody>
//             {DataRecieved.map((item, index) => (
//               <tr
//                 key={item.customer_activity_id}
//                 className={
//                   index % 2 === 0
//                     ? 'dark:bg-[#1E1E26] bg-[#FFFFFF]'
//                     : 'dark:bg-[#2E2D3D] bg-[#F7F5F9]'
//                 }
//               >
//                 {columns.map((column, colIndex) => (
//                   <TableCell
//                     key={colIndex}
//                     className={column.className}
//                     content={
//                       column.isIcon ? (
//                         <span className="flex">
//                           <MdOutlineWatchLater className={column.className} />
//                           {item[column.key as keyof typeof item]}
//                         </span>
//                       ) : column.key === 'name' ? (
//                         JSON.parse(item.data).name
//                       ) : column.key === 'color' ? (
//                         item.key === 'login' ? (
//                           'تسجيل الدخول'
//                         ) : item.key === 'register' ? (
//                           'إنشاء حساب'
//                         ) : (
//                           'تعديل الحساب'
//                         )
//                       ) : (
//                         item[column.key as keyof typeof item]
//                       )
//                     }
//                   />
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default LastNews;
import React from 'react';
import { MdOutlineWatchLater } from 'react-icons/md';
import HeaderLastNews from './HeaderLastNews';
import useLogs from '../../hooks/getLogs';
import TableCell from './TableCell';

interface ColumnConfig {
  key: string;
  className: string | ((index: number) => string);
  formatContent?: (content: string) => string;
  isIcon?: boolean;
  iconClass?: string;
}

interface LastNewsProps {
  columns: ColumnConfig[];
}

const LastNews: React.FC<LastNewsProps> = ({ columns }) => {
  // Fetch data from the API
  const { logs, loading, error } = useLogs(0, 8);
  const DataRecieved = logs;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <HeaderLastNews />
      <div className="relative overflow-x-auto">
        <table className="w-full text-[20px] text-left rtl:text-right">
          <tbody>
            {DataRecieved.map((item, index) => (
              <tr
                key={item.customer_activity_id}
                className={
                  index % 2 === 0
                    ? 'dark:bg-[#1E1E26] bg-[#FFFFFF]'
                    : 'dark:bg-[#2E2D3D] bg-[#F7F5F9]'
                }
              >
                {/* Render each column dynamically */}
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    content={
                      col.formatContent
                        ? col.formatContent(item[col.key])
                        : item[col.key]
                    }
                    className={
                      typeof col.className === 'function'
                        ? col.className(index)
                        : col.className
                    }
                  >
                    {col.isIcon && (
                      <span className="flex">
                        <MdOutlineWatchLater className={col.iconClass} />
                        {item[col.key]}
                      </span>
                    )}
                  </TableCell>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LastNews;

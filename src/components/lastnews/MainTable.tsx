// import React from 'react';
// import TableCell from './TableCell';

// interface ColumnConfig {
//   key: string;
//   content: string;
//   className: string | ((index: number) => string);
//   isIcon?: boolean;
//   iconClass?: string;
//   IconComponent?: React.ElementType; // Add optional IconComponent for each column
// }

// interface LogData {
//   id: number;
//   columns: ColumnConfig[];
//   type: number;
// }

// interface MainTableProps {
//   logs: LogData[];
// }

// const MainTable: React.FC<MainTableProps> = ({ logs }) => {
//   return (
//     <div className="relative overflow-x-auto">
//       <table className="w-full text-[20px] text-left rtl:text-right">
//         <tbody>
//           {logs.map((log, index) => (
//             <tr
//               key={log.id}
//               className={`px-5 flex justify-around ${
//                 index % 2 === 0
//                   ? 'dark:bg-[#1E1E26] bg-[#FFFFFF]'
//                   : 'dark:bg-[#2E2D3D] bg-[#F7F5F9]'
//               }`}
//             >
//               {/* Render each column dynamically */}
//               {log.columns.map((col) => (
//                 <TableCell
//                   key={col.key}
//                   content={
//                     col.isIcon ? (
//                       <span className="flex">
//                         {col.IconComponent && (
//                           <col.IconComponent className={col.iconClass} />
//                         )}
//                         {col.content}
//                       </span>
//                     ) : (
//                       col.content
//                     )
//                   }
//                   className={
//                     typeof col.className === 'function'
//                       ? col.className(index)
//                       : col.className
//                   }
//                 />
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default MainTable;
import React from 'react';
import TableCell from './TableCell';

interface ColumnConfig {
  key: string;
  content: string;
  className: string | ((index: number) => string);
  isIcon?: boolean;
  iconClass?: string;
  IconComponent?: React.ElementType; // Add optional IconComponent for each column
}

interface LogData {
  id: number;
  columns: ColumnConfig[];
  type: number;
}

interface MainTableProps {
  logs: LogData[];
}

const MainTable: React.FC<MainTableProps> = ({ logs }) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-[20px] text-left rtl:text-right">
        <tbody>
          {logs.map((log, index) => (
            <tr
              key={log.id}
              className={`px-5 flex justify-between items-center ${
                index % 2 === 0
                  ? 'dark:bg-[#1E1E26] bg-[#FFFFFF]'
                  : 'dark:bg-[#2E2D3D] bg-[#F7F5F9]'
              }`}
            >
              {/* Render each column dynamically */}
              {log.columns.map((col) => (
                <TableCell
                  key={col.key}
                  content={
                    col.isIcon ? (
                      <span className="flex items-center">
                        {col.IconComponent && (
                          <col.IconComponent className={col.iconClass} />
                        )}
                        {col.content}
                      </span>
                    ) : (
                      col.content
                    )
                  }
                  className={`flex-1 ${
                    typeof col.className === 'function'
                      ? col.className(index)
                      : col.className
                  }`}
                  // Add the flex-1 class to make each cell take equal space
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MainTable;

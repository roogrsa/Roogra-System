import React from 'react';
import HeaderTableCell from './HeaderTableCell';
import TableCell from './TableCell';

interface ColumnConfig {
  key: string;
  content: string;
  className: string | ((index: number) => string);
  isIcon?: boolean;
  iconClass?: string;
  IconComponent?: React.ElementType;
}

interface LogData {
  id: number;
  columns: ColumnConfig[];
  type: number;
}

interface MainTableProps {
  logs: any;
  headers?: ColumnConfig[];
  header2?: boolean;
}

const MainTable: React.FC<MainTableProps> = ({ logs, headers, header2 }) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-[20px] text-left rtl:text-right">
        {/* Render thead for headers if provided */}
        {headers && logs?.length > 0 && headers.length > 0 && (
          <thead className="bg-[#EDEDED] dark:bg-[#3E3E46]">
            <tr className="flex justify-between">
              {headers?.map((header) => (
                <HeaderTableCell
                  key={header.key}
                  content={header.content}
                  className={`flex-1 ${
                    typeof header.className === 'function'
                      ? header.className(0) // Assuming index 0 for header rows
                      : header.className
                  }`}
                />
              ))}
            </tr>
          </thead>
        )}

        <tbody>
          {/* Render logs */}
          {logs?.map((log, index) => (
            <tr
              key={log.id}
              className={`flex justify-between items-center ${
                header2 // Check if header2 is true
                  ? index % 2 === 0
                    ? 'dark:bg-MainTableBG-OddDark bg-MainTableBG-OddLight'
                    : 'dark:bg-MainTableBG-EvenDark bg-MainTableBG-EvenLight'
                  : index % 2 === 0
                  ? 'dark:bg-MainTableBG-EvenDark bg-MainTableBG-EvenLight'
                  : 'dark:bg-MainTableBG-OddDark bg-MainTableBG-OddLight'
              }`}
            >
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

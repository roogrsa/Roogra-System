import React from 'react';
import TableCell from './TableCell'; // For table body cells
import HeaderTableCell from './HeaderTableCell'; // For table header cells

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
  headers?: ColumnConfig[]; // Made headers optional
}

const MainTable: React.FC<MainTableProps> = ({ logs, headers }) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-[20px] text-left rtl:text-right">
        {/* Render thead only if headers are provided */}
        {headers && headers.length > 0 && (
          <thead className="bg-[#EDEDED] dark:bg-[#3E3E46]">
            <tr className="flex justify-between">
              {headers.map((header) => (
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

        {/* Table body */}
        <tbody>
          {logs.map((log, index) => (
            <tr
              key={log.id}
              className={` flex justify-between items-center ${
                index % 2 === 0
                  ? 'dark:bg-[#1E1E26] bg-[#FFFFFF]'
                  : 'dark:bg-[#2E2D3D] bg-[#F7F5F9]'
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

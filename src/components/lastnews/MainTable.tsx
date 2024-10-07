import React from 'react';
import { MdOutlineWatchLater } from 'react-icons/md';
import HeaderLastNews from './HeaderLastNews';
import TableCell from './TableCell';

interface ColumnConfig {
  key: string;
  content: string;
  className: string | ((index: number) => string);
  isIcon?: boolean;
  iconClass?: string;
}

interface LogData {
  id: number;
  columns: ColumnConfig[];
}

interface MainTableProps {
  logs: LogData[];
}

const MainTable: React.FC<MainTableProps> = ({ logs }) => {
  return (
    <div>
      <HeaderLastNews />
      <div className="relative overflow-x-auto">
        <table className="w-full text-[20px] text-left rtl:text-right">
          <tbody>
            {logs.map((log, index) => (
              <tr
                key={log.id}
                className={
                  index % 2 === 0
                    ? 'dark:bg-[#1E1E26] bg-[#FFFFFF]'
                    : 'dark:bg-[#2E2D3D] bg-[#F7F5F9]'
                }
              >
                {/* Render each column dynamically */}
                {log.columns.map((col) => (
                  <TableCell
                    key={col.key}
                    content={
                      col.isIcon ? (
                        <span className="flex">
                          <MdOutlineWatchLater className={col.iconClass} />
                          {col.content}
                        </span>
                      ) : (
                        col.content
                      )
                    }
                    className={
                      typeof col.className === 'function'
                        ? col.className(index)
                        : col.className
                    }
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainTable;

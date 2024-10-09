// import React from 'react';

interface TableCellProps {
  content: string | JSX.Element; // Cell content can be either a string or an element
  className?: string; // Class applied to the <td>, optional now
}

const TableCell: React.FC<TableCellProps> = ({ content, className = '' }) => {
  return (
    <td className={`p-3 font-[400] text-[20px]   ${className}`}>{content}</td>
  );
};

export default TableCell;

import React from 'react';

interface HeaderTableCellProps {
  content: string;
  className: string;
}

const HeaderTableCell: React.FC<HeaderTableCellProps> = ({
  content,
  className,
}) => {
  return (
    <th
      className={`p-3 py-2 border-l border-l-[#D0D0D0] dark:border-l-[#676767] font-[400] dark:text-[#FFFFFF] text-[#000000] ${className}`}
    >
      {content}
    </th>
  );
};

export default HeaderTableCell;

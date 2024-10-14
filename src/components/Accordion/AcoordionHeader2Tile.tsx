// AccordionTitle.tsx
import React from 'react';

interface AccordionTitleProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionTitle: React.FC<AccordionTitleProps> = ({
  title,
  isOpen,
  onToggle,
}) => {
  return (
    <span
      tabIndex={0} // Make the span focusable
      className={`shadow-2 shadow-gray-400 dark:shadow-Header2Table-BgCellDark text-lg w-36 text-center pt-2 font-medium rounded-sm bg-Header2Table-BgCellLight dark:bg-Header2Table-BgCellDark focus:bg-transparent active:bg-transparent focus:shadow-inner focus:shadow-gray-300 ${
        isOpen ? '' : ''
      }`} // Change background if open
      onClick={onToggle}
      onFocus={(e) => (e.currentTarget.style.background = 'transparent')}
      onBlur={(e) => (e.currentTarget.style.background = '')}
    >
      {title}
    </span>
  );
};

export default AccordionTitle;

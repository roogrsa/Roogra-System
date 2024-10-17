import React from 'react';

const NotFoundSection = ({
  children,
  data,
  fallbackMessage = 'No data available',
}) => {
  return data.length > 0 ? (
    <div className="my-3">{children}</div>
  ) : (
    <div className="bg-Input-blue mt-5 border border-Input-border rounded-sm text-[#767876] p-5">
      <div>{fallbackMessage}</div>
    </div>
  );
};

export default NotFoundSection;

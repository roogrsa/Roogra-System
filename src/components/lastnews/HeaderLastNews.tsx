import React from 'react';
import { LuCalendarDays } from 'react-icons/lu';

const HeaderLastNews = () => {
  return (
    <>
      <p className="text-2xl my-5 text-black dark:text-white flex ">
        <LuCalendarDays className="mx-8 mt-1" />
        اخر الاحداث
      </p>
    </>
  );
};

export default HeaderLastNews;

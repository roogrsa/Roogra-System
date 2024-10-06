import React from 'react';
import { LuCalendarDays } from 'react-icons/lu';

const LastNews = () => {
  const data = [
    {
      name: 'Apple MacBook Pro 17"',
      color: 'Silver',
      category: 'Laptop',
      price: '$2999',
    },
    {
      name: 'Microsoft Surface Pro',
      color: 'White',
      category: 'Laptop PC',
      price: '$1999',
    },
    {
      name: 'Magic Mouse 2',
      color: 'Black',
      category: 'Accessories',
      price: '$99',
    },
    {
      name: 'Google Pixel Phone',
      color: 'Gray',
      category: 'Phone',
      price: '$799',
    },
  ];

  return (
    <div className="">
      <p className="text-2xl my-5 text-black dark:text-white flex ">
        <LuCalendarDays className="mx-3 mt-1" />
        اخر الاحداث
      </p>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0
                    ? 'bg-[#FFFFFF] dark:bg-[#1E1E26]'
                    : 'bg-[#F7F5F9] dark:bg-[#2E2D3D]'
                }`}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-[400] text-[20px] text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.name}
                </th>
                <td
                  className={`px-6 py-4 font-[400] text-[20px] ${
                    index % 2 === 0
                      ? 'text-[#A130BE] dark:text-[#2F44FF]'
                      : 'text-[#19930E]'
                  }`}
                >
                  {item.color}
                </td>
                <td className="px-6 font-[400] text-[20px] py-4">
                  {item.category}
                </td>
                <td className="px-6  font-[400] text-[20px] py-4">
                  {item.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LastNews;

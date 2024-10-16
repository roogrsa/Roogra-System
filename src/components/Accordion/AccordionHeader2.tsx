// // import React, { useState } from 'react';
// // import AccordionTitle from './AcoordionHeader2Tile';

// // interface AccordionProps {
// //   titles: string[]; // Array of titles
// //   children: React.ReactNode[]; // Array of children for each title
// // }

// // const AccordionHeader2: React.FC<AccordionProps> = ({ titles, children }) => {
// //   const [openIndex, setOpenIndex] = useState<number | null>(null);

// //   const toggleAccordion = (index: number) => {
// //     setOpenIndex(openIndex === index ? null : index);
// //   };

// //   return (
// //     <>
// //       <div className="mb-5b my-3 dark:bg-MainTableBG-EvenDark bg-MainTableBG-EvenLight">
// //         <div className="mx-4 flex justify-between cursor-pointer">
// //           <div className="py-2 flex justify-start gap-0.5 cursor-pointer">
// //             {titles.map((title, index) => (
// //               <AccordionTitle
// //                 key={index}
// //                 title={title}
// //                 isOpen={openIndex === index}
// //                 onToggle={() => toggleAccordion(index)}
// //               />
// //             ))}
// //           </div>
// //           <div className="text-gray-700 flex gap-4 p-5 mx-4">
// //             <span className="">(3)</span>
// //             <span>
// //               <img src="/users.svg" />
// //             </span>
// //             <span>
// //               {' '}
// //               <img src="/redRemove.svg" />
// //             </span>
// //           </div>
// //         </div>

// //         {/* Render children based on the open index */}
// //         {children.map((child, index) => (
// //           <div key={index} className="p-4 w-full" hidden={openIndex !== index}>
// //             {child}
// //           </div>
// //         ))}
// //       </div>
// //     </>
// //   );
// // };

// // export default AccordionHeader2;
// // AccordionHeader2.tsx
// import React, { useState } from 'react';
// import AccordionTitle from './AcoordionHeader2Tile';
// import AccordionFooter from './AcoordionHeader2Footer';

// interface AccordionProps {
//   titles: string[]; // Array of titles
//   children: React.ReactNode[]; // Array of children for each title
//   footerItems: React.ReactNode[]; // Array of items for the footer
// }

// const AccordionHeader2: React.FC<AccordionProps> = ({
//   titles,
//   children,
//   footerItems,
// }) => {
//   const [openIndex, setOpenIndex] = useState<number | null>(null);

//   const toggleAccordion = (index: number) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <>
//       <div className="mb-5b my-3 dark:bg-MainTableBG-EvenDark bg-MainTableBG-EvenLight">
//         <div className="mx-4 flex justify-between cursor-pointer">
//           <div className="py-2 flex justify-start gap-0.5 cursor-pointer">
//             {titles.map((title, index) => (
//               <AccordionTitle
//                 key={index}
//                 title={title}
//                 isOpen={openIndex === index}
//                 onToggle={() => toggleAccordion(index)}
//               />
//             ))}
//           </div>
//           <div>
//             {footerItems.map((item, index) => (
//               <div
//                 key={index}
//                 className="p-4 w-full mx-5"
//                 hidden={openIndex !== index}
//               >
//                 {item}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Render children based on the open index */}
//         {children.map((child, index) => (
//           <div key={index} className="p-4 w-full" hidden={openIndex !== index}>
//             {child}
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default AccordionHeader2;
import React, { useState } from 'react';
import AccordionTitle from './AcoordionHeader2Tile';

interface AccordionProps {
  titles: string[]; // Array of titles
  children: React.ReactNode[]; // Array of children for each title
  footerItems: React.ReactNode[]; // Array of items for the footer
  onTitleClick: (index: number) => void; // Function to handle title click
}

const AccordionHeader2: React.FC<AccordionProps> = ({
  titles,
  children,
  footerItems,
  onTitleClick, // Receive the onTitleClick function as a prop
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
    onTitleClick(index); // Trigger the onTitleClick function when a title is clicked
  };

  return (
    <>
      <div className="mb-5b my-3 dark:bg-MainTableBG-EvenDark bg-MainTableBG-EvenLight">
        <div className="mx-4 flex justify-between cursor-pointer">
          <div className="py-2 flex justify-start gap-0.5 cursor-pointer">
            {titles.map((title, index) => (
              <AccordionTitle
                key={index}
                title={title}
                isOpen={openIndex === index}
                onToggle={() => toggleAccordion(index)} // Use toggleAccordion here
              />
            ))}
          </div>
          <div>
            {footerItems.map((item, index) => (
              <div
                key={index}
                className="p-4 w-full mx-5"
                hidden={openIndex !== index}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Render children based on the open index */}
        {children.map((child, index) => (
          <div key={index} className="p-4 w-full" hidden={openIndex !== index}>
            {child}
          </div>
        ))}
      </div>
    </>
  );
};

export default AccordionHeader2;

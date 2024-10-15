// import React from 'react';

// interface InputProps {
//   label: string;
//   type: string;
//   value: string | number;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   extraClass?: string; // Optional prop for background color
//   required?: boolean;
// }

// const ReusableInput: React.FC<InputProps> = ({
//   label,
//   type,
//   value,
//   onChange,
//   extraClass = 'bg-white', // Default background color is white
//   required = false,
// }) => {
//   return (
//     <div className="flex flex-col mb-4">
//       <label className=" mb-2">
//         {label}
//         {required && <span className="text-red-500"> *</span>}
//       </label>
//       <input
//         type={type}
//         value={value}
//         onChange={onChange}
//         required={required}
//         className={`${extraClass} text-black  w-30 px-2 border border-Input-border  rounded-md`}
//       />
//     </div>
//   );
// };

// export default ReusableInput;
import React from 'react';

interface InputProps {
  label: string;
  type: string;
  value: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Make onChange optional
  extraClass?: string; // Optional prop for background color
  required?: boolean;
}

const ReusableInput: React.FC<InputProps> = ({
  label,
  type,
  value,
  onChange,
  extraClass = 'bg-white', // Default background color is white
  required = false,
}) => {
  return (
    <div className="flex flex-col mb-4">
      <label className=" mb-2">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange} // It will be optional
        required={required}
        className={`${extraClass} text-black  w-30 px-2 border border-Input-border  rounded-md`}
      />
    </div>
  );
};

export default ReusableInput;

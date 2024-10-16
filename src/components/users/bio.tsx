import React from 'react';
interface ProfileBioProps {
  Bio: string | null;
}
const Bio: React.FC<ProfileBioProps> = ({ Bio }) => {
  return (
    <>
      <div className="bg-Input-blue border  border-Input-border rounded-sm text-[#767876] p-5">
        {Bio ? <div>{Bio}</div> : <div>Not found yet</div>}
      </div>
    </>
  );
};

export default Bio;

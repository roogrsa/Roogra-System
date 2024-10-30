import React from 'react';
import Accordion from '../Accordion/Accordion';
import UserForm from './UserFormDetials';
import CategorySubscriptionUserid from '../Category-subscription/UserCategorySubscription';
import VerifactionRequestByUserid from './../verifaction_requests/Userverifaction_requests';
import UserReportType from '../reports/UserReportType';
import UserProducts from './products/UserProducts';
import UserInfo from './Info/UserInfo';

//
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  telephone: string;
  type: 'advertiser' | 'customer';
  isActivated: {
    account: boolean;
    email: boolean;
  };
  status: number; // Status of the account (e.g., 1 = Active)
  isBanned: boolean;
  ban_reason: string;
  regDate: string; // Registration date in "YYYY-MM-DD HH:MM:SS" format
  address: string;
  countery_id: number | null;
  bio: string;
  rating: number;
  image: string;
  alias: string;
}

interface ProfileAccordionProps {
  user: User;
  loading: boolean;
  error: string | null;
}
//

const ProfileAccordion: React.FC<ProfileAccordionProps> = ({
  user,
  loading,
  error,
}) => {
  return (
    <div className="">
      {/*  */}
      <Accordion title="البيانات">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {user && <UserForm user={user} loading={loading} error={error} />}
      </Accordion>

      {/*  */}
      <Accordion title="المعلومات">
        <UserInfo user={user} />
      </Accordion>

      {/*  */}
      <Accordion title="الاعلانات">
        <UserProducts user={user} />
      </Accordion>

      {/*  */}
      <Accordion title="تذاكر الاشتراك">
        <CategorySubscriptionUserid />
        <VerifactionRequestByUserid />
      </Accordion>

      {/*  */}
      <Accordion title="المحادثات">
        <div className="text-gray-700"></div>
      </Accordion>

      {/*  */}
      <Accordion title="تواصل معنا">
        <div className="text-gray-700"></div>
      </Accordion>

      {/*  */}
      <Accordion title="البلاغات">
        <UserReportType reportType="Userchat" />
        <UserReportType reportType="Userproduct" />
      </Accordion>

      {/* */}
      <Accordion title="قائمة الحظر">
        <div className="text-gray-700"></div>
      </Accordion>
    </div>
  );
};

export default ProfileAccordion;

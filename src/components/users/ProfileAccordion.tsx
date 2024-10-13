import React from 'react';
import Accordion from '../Accordion/Accordion';
import UserForm from './UserFormDetials';
//

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

const ProfileAccordion: React.FC<ProfileAccordionProps> = ({
  user,
  loading,
  error,
}) => {
  return (
    <div className="">
      {/* User Data Accordion */}

      <Accordion title="البيانات">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        {/* Render user form if data is available */}
        {user && <UserForm user={user} loading={loading} error={error} />}
      </Accordion>

      {/* Additional Information Accordion */}
      <Accordion title="المعلومات">
        <div className="text-gray-700"></div>
      </Accordion>

      {/* Ads Information Accordion */}
      <Accordion title="الاعلانات">
        <div className="text-gray-700"></div>
      </Accordion>

      {/* Subscription Tickets Accordion */}
      <Accordion title="تذاكر الاشتراك">
        <div className="text-gray-700"></div>
      </Accordion>

      {/* Chats Accordion */}
      <Accordion title="المحادثات">
        <div className="text-gray-700"></div>
      </Accordion>

      {/* Contact Us Accordion */}
      <Accordion title="تواصل معنا">
        <div className="text-gray-700"></div>
      </Accordion>

      {/* Reports Accordion */}
      <Accordion title="البلاغات">
        <div className="text-gray-700"></div>
      </Accordion>

      {/* Blocklist Accordion */}
      <Accordion title="قائمة الحظر">
        <div className="text-gray-700"></div>
      </Accordion>
    </div>
  );
};

export default ProfileAccordion;

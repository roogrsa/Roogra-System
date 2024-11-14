import React from 'react';
import Accordion from '../Accordion/Accordion';
import UserForm from './UserFormDetials';

import UserReportType from '../reports/UserReportType';
import UserProducts from './products/UserProducts';
import UserInfo from './Info/UserInfo';
import { useTranslation } from 'react-i18next';
import CategorySubscriptionUserid from './Category-subscription/UserCategorySubscription';
import VerifactionRequestByUserid from './verifaction_requests/Userverifaction_requests';
import UserBanProdList from './BanList/prodBanList';
import UserChatBanList from './BanList/ChatBanList';
import BanProfileList from './BanList/HistoryBanList';

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
  const { t } = useTranslation();

  return (
    <div className="">
      {/*  */}
      <Accordion title={t('profile.detials')}>
        {/* {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>} */}
        {user && <UserForm user={user} loading={loading} error={error} />}
      </Accordion>

      {/*  */}
      <Accordion title={t('profile.info')}>
        <UserInfo user={user} />
      </Accordion>

      {/*  */}
      <Accordion title={t('profile.products')}>
        <UserProducts user={user} />
      </Accordion>

      {/*  */}
      <Accordion title={t('profile.ticket')}>
        <CategorySubscriptionUserid />

        <VerifactionRequestByUserid />
      </Accordion>

      {/*  */}
      <Accordion title={t('profile.chats')}>
        <div className="text-gray-700"></div>
      </Accordion>

      {/*  */}
      <Accordion title={t('profile.contactUs')}>
        <div className="text-gray-700"></div>
      </Accordion>

      {/*  */}
      <Accordion title={t('profile.reprts')}>
        <UserReportType reportType="Userchat" />
        <UserReportType reportType="Userproduct" />
      </Accordion>

      {/* */}
      <Accordion title={t('profile.banList')}>
        <BanProfileList />
        <UserBanProdList />
        <UserChatBanList />
      </Accordion>
    </div>
  );
};

export default ProfileAccordion;

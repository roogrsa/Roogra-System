import React from 'react';
import Accordion from '../Accordion/Accordion';
import UserForm from './UserFormDetials';

import UserReportType from '../reports/UserReportType';
import UserProducts from './products/UserProducts';
import UserInfo from './Info/UserInfo';
import { useTranslation } from 'react-i18next';
import CategorySubscriptionUserid from './Category-subscription/UserCategorySubscription';
import VerifactionRequestByUserid from './verifaction_requests/Userverifaction_requests';
import { useParams } from 'react-router-dom';
import AccordionContacUs from './contactUs/AccordionContacUs';
import Chat from '../reports/Chat';
import useDisplayUserChats from '../../hooks/chat/useDisplayUserChats';
import NotFoundSection from '../Notfound/NotfoundSection';

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
  const { id } = useParams();
  const chats = useDisplayUserChats(id)
  const { t } = useTranslation();
  const displayChats = () => {
      return chats
  };
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
      {chats.length==0?
        <NotFoundSection data={chats} />:
        <>
        <div className={`bg-secondaryBG dark:bg-secondaryBG-dark border-2 border-[#D0D0D0] dark:border-[#333341] rounded-md mt-4`}>
        {chats.map((chat)=>(
            <Chat chat={chat} key={chat.id} displayChats={displayChats} length={chats.length} userId={id}/>
        ))}
        </div>
        </>
        }
      </Accordion>

      {/*  */}
      <Accordion title={t('profile.contactUs')}>
        <AccordionContacUs idPre="RQ1-" id={id} pageName="contact-us.inquiries" type="inquiry" />
        <AccordionContacUs idPre="RQ2-" id={id} pageName="contact-us.issues" type="issue" />
        <AccordionContacUs idPre="RFP-" id={id} pageName="contact-us.suggestions" type="suggestion" />
      </Accordion>

      {/*  */}
      <Accordion title={t('profile.reprts')}>
        <UserReportType reportType="Userchat" />
        <UserReportType reportType="Userproduct" />
      </Accordion>

      {/* */}
      <Accordion title={t('profile.banList')}>
        <div className="text-gray-700"></div>
      </Accordion>
    </div>
  );
};

export default ProfileAccordion;

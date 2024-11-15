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
import { useParams } from 'react-router-dom';
import AccordionContacUs from './contactUs/AccordionContacUs';
import Chat from '../reports/Chat';
import useDisplayUserChats from '../../hooks/chat/useDisplayUserChats';
import NotFoundSection from '../Notfound/NotfoundSection';
import { User } from '../../types/user';

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
  const chats = useDisplayUserChats(id);
  const { t } = useTranslation();
  const displayChats = () => {
    return chats;
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
        {chats.length == 0 ? (
          <NotFoundSection data={chats} />
        ) : (
          <>
            {/* <Breadcrumb pageName={t('Reports.label.userChat')} breadcrumbLinks={[]} /> */}
            <div
              className={`bg-secondaryBG dark:bg-secondaryBG-dark py-5 my-5 rounded-md`}
            >
              {chats.map((chat) => (
                <Chat
                  chat={chat}
                  key={chat.id}
                  displayChats={displayChats}
                  length={chats.length}
                />
              ))}
            </div>
          </>
        )}
      </Accordion>

      {/*  */}
      <Accordion title={t('profile.contactUs')}>
        <AccordionContacUs
          idPre="RQ1-"
          id={id}
          pageName="contact-us.inquiries"
          type="الاستفسار"
        />
        <AccordionContacUs
          idPre="RQ2-"
          id={id}
          pageName="contact-us.issues"
          type="البلاغات"
        />
        <AccordionContacUs
          idPre="RFP-"
          id={id}
          pageName="contact-us.suggestions"
          type="الاقتراحات"
        />
      </Accordion>

      {/*  */}
      <Accordion title={t('profile.reprts')}>
        <UserReportType reportType="Userchat" />
        <UserReportType reportType="Userproduct" />
      </Accordion>

      {/* */}
      <Accordion title={t('profile.banList')}>
        <BanProfileList user={user} />
        <UserBanProdList />
        <UserChatBanList user={user} />
      </Accordion>
    </div>
  );
};

export default ProfileAccordion;

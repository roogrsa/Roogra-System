import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';
import AccordionHeader2 from '../../Accordion/AccordionHeader2';
import NotFoundSection from '../../Notfound/NotfoundSection';
import MainTable from '../../lastnews/MainTable';
import useUnBanChat from '../../../hooks/Ban/UnBanChat';
import useHandleAction from '../../../hooks/useHandleAction';
import useChatUserHistory from '../../../hooks/users/UserBanChats';

const BannedIconSrc = '/block.svg';
const EditIconSrc = '/Edit.svg';
const NotBannedIconSrc = '/unblock.svg';

const UserChatBanList: React.FC = ({ user }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [status, setStatus] = useState('');
  const breadcrumbLinks = [{ label: '', path: '/' }];

  const {
    chatHistory,
    // loading: bannedChatsLoading,
    // error: bannedChatsError,
    refreshChatHistory,
  } = useChatUserHistory(user.id);
  const { unbanChat, isSuccess } = useUnBanChat();
  const { handleAction, loading: actionLoading } = useHandleAction();

  useEffect(() => {
    if (isSuccess) {
      refreshChatHistory();
    }
  }, [isSuccess, refreshChatHistory]);
  const handleClickName = (chatId: number) => {
    navigate(`/chat/${chatId}`);
  };

  // if (bannedChatsLoading) return <p>Loading...</p>;
  // if (bannedChatsError) return <p>Error: {bannedChatsError}</p>;

  const Chatlogs = chatHistory.map((chat) => ({
    id: chat.chat_id,
    columns: [
      {
        key: 'id',
        content: `RC-${chat.chat_id}`,
        className: 'text-center',
      },
      {
        key: 'created_at',
        content: new Date(chat.created_at).toLocaleDateString(),
        className: 'text-center',
      },
      {
        key: 'admin_name',
        content: chat.admin || 'N/A',
        className: 'text-center',
      },
      {
        key: 'ban_reason',
        content:
          chat.reason.split(' ').slice(0, 2).join(' ').slice(0, 13) || 'N/A',
        className: 'text-center',
      },
      {
        key: 'Edit',
        content: (
          <div className="bg-EditIconBg rounded-md">
            <img
              src={EditIconSrc}
              className="w-6 h-6 text-center p-1 cursor-pointer"
              onClick={() => handleClickName(chat.chat_id)}
            />
          </div>
        ),
        className: 'flex justify-center',
      },
      {
        key: 'is_banned',
        content: (
          <div className="bg-BlockIconBg rounded-md">
            <img
              src={chat.banned === 0 ? NotBannedIconSrc : BannedIconSrc}
              className="w-6 h-6 text-center p-1 cursor-pointer"
              onClick={() =>
                !actionLoading &&
                handleAction(
                  chat.chat_id,
                  chat.banned === 1,
                  'ban',
                  unbanChat,
                  {
                    confirmButtonClass: 'bg-BlockIconBg ',
                    cancelButtonClass: '',
                  },
                  refreshChatHistory,
                )
              }
            />
          </div>
        ),
        className: 'flex justify-center',
      },
    ],
  }));

  const headers = [
    {
      key: 'ChatId',
      content: t('BanList.chats.ChatId'),
      className: 'text-center',
    },
    {
      key: 'Date',
      content: t('BanList.chats.Date'),
      className: 'text-center',
    },
    {
      key: 'byAdmin',
      content: t('BanList.chats.byAdmin'),
      className: 'text-center',
    },
    {
      key: 'banReason',
      content: t('BanList.chats.banReason'),
      className: 'text-center',
    },

    {
      key: 'show',
      content: t('BanList.chats.show'),
      className: 'text-center',
    },
    {
      key: 'BanStatus',
      content: t('BanList.chats.status'),
      className: 'text-center',
    },
  ];
  // const UnBanheaders = [
  //   {
  //     key: 'ChatId',
  //     content: t('BanList.chats.ChatId'),
  //     className: 'text-center',
  //   },

  //   {
  //     key: 'UnBanDate',
  //     content: t('BanList.chats.UnBanDate'),
  //     className: 'text-center',
  //   },
  //   {
  //     key: 'UnBanbyAdmin',
  //     content: t('BanList.chats.UnBanbyAdmin'),
  //     className: 'text-center',
  //   },
  //   {
  //     key: 'UnBanbanReason',
  //     content: t('BanList.chats.UnBanReason'),
  //     className: 'text-center',
  //   },

  //   {
  //     key: 'show',
  //     content: t('BanList.chats.show'),
  //     className: 'text-center',
  //   },
  //   {
  //     key: 'BanStatus',
  //     content: t('BanList.chats.status'),
  //     className: 'text-center',
  //   },
  // ];
  return (
    <>
      <Breadcrumb
        breadcrumbLinks={breadcrumbLinks}
        pageName={t('BanList.chats.pageName')}
      />
      <AccordionHeader2
        titles={[t('BanList.Ban'), t('BanList.unBan')]}
        onClick={(index: number) => setStatus(index === 0 ? 'Ban' : 'UnBan')}
        children={[
          <div key="Ban">
            <NotFoundSection data={Chatlogs} />
            <MainTable logs={Chatlogs} header2={true} headers={headers} />
          </div>,
          <div key="UnBan">
            {/* <NotFoundSection data={Chatlogs} /> */}
            {/* <MainTable logs={Chatlogs} header2={true} headers={UnBanheaders} /> */}
          </div>,
        ]}
        footerItems={[
          <div className="flex gap-5" key="footer">
            <span>({Chatlogs.length || 0})</span>
            {/* <span>
              <img src="/redRemove.svg" alt="Remove" />
            </span> */}
          </div>,
        ]}
      />
    </>
  );
};

export default UserChatBanList;

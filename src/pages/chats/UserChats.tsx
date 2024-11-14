import { useParams } from "react-router-dom";
import Chat from "../../components/reports/Chat";
import useDisplayUserChats from "../../hooks/chat/useDisplayUserChats";
import { useTranslation } from "react-i18next";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import NotFoundSection from "../../components/Notfound/NotfoundSection";

export default function UserChats() {
    const { userId } = useParams();
    const chats = useDisplayUserChats(userId)
    const displayChats = () => {
        return chats
    };
    const { t } = useTranslation();
    const breadcrumbLinks = [{ label: t('Reports.label.chat'), path: `/reports/chat` }];
    return (
        <>
        {chats.length==0?
        <NotFoundSection data={chats} />:
        <>
        <Breadcrumb pageName={t('Reports.label.userChat')} breadcrumbLinks={breadcrumbLinks} />
        <div className={`bg-secondaryBG dark:bg-secondaryBG-dark border-2 border-[#D0D0D0] dark:border-[#333341] rounded-md`}>
        {chats.map((chat)=>(
            <Chat chat={chat} key={chat.id} displayChats={displayChats} length={chats.length}/>
        ))}
        </div>
        </>
        }
        </>
    )
}

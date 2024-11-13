import { useParams } from "react-router-dom"
import useDisplayChat from "../../hooks/chat/useDisplayChat";
import Chat from "../../components/reports/Chat";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { useTranslation } from "react-i18next";

export default function SingleChat() {
    const {chatId}=useParams();
    const { t } = useTranslation();
    const chat = useDisplayChat(chatId)
    const displayChats = () => {
        return chat
    };
    const breadcrumbLinks = [{ label: t('Reports.label.chat'), path: `/reports/chat` }];
    return (
        <>
        <Breadcrumb pageName={t('Reports.label.userChat')} breadcrumbLinks={breadcrumbLinks} />
        <div className={`bg-secondaryBG dark:bg-secondaryBG-dark border-2 border-[#D0D0D0] dark:border-[#333341] rounded-md`}>
            <Chat chatData={chat} displayChats={displayChats}/>
        </div>
        </>
    )
}

import { useParams } from "react-router-dom"
import Chat from "../../components/reports/Chat";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { ChatValue } from "../../types/ChatValue";
import axiosInstance from "../../axiosConfig/instanc";

export default function SingleChat() {
    const { chatId } = useParams();
    const { t } = useTranslation();
    const [chat, setChat] = useState<ChatValue>();
    const displayChats = async () => {
        try {
            const res = await axiosInstance.get(`/api/chats/${chatId}`);
            setChat(res.data.data);
        } catch (error: any) {
            console.error(error);
        }
    };
    console.log(chat);

    useEffect(() => {
        displayChats();
    }, [chatId]);
    console.log(chat);
    console.log(chatId);

    const breadcrumbLinks = [{ label: t('Reports.label.chat'), path: `/reports/chat` }];
    return (
        <>
            <Breadcrumb pageName={t('Reports.label.userChat')} breadcrumbLinks={breadcrumbLinks} />
            <div className={`bg-secondaryBG dark:bg-secondaryBG-dark border-2 border-[#D0D0D0] dark:border-[#333341] rounded-md`}>
                <Chat chatData={chat} displayChats={displayChats} />
            </div>
        </>
    )
}

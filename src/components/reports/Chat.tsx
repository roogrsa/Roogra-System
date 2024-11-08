import { Link, useLocation, useParams } from "react-router-dom";
import axiosInstance from "../../axiosConfig/instanc";
import { useEffect, useState } from "react";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { useTranslation } from "react-i18next";
import ChatCard from "./ChatCard";
import { TfiAngleDown, TfiAngleUp } from "react-icons/tfi";
import { useSelector } from "react-redux";
import { selectLanguage } from "../../store/slices/language";

interface ChatValue {
    id: number;
    date_added: string;
    customer_id: number;
    customer_first_name: string;
    customer_last_name: string;
    advertizer_id: number;
    advertizer_first_name: string;
    advertizer_last_name: string;
}

export default function Chat() {
    const [chats, setChats] = useState<ChatValue[]>([]);
    const [showMassages, setShowMassages] = useState<{ [key: number]: boolean }>({});
    const { userId } = useParams();
    const { t } = useTranslation();
    const location = useLocation();
    const reportId = location.state?.reportId;
    const language = useSelector(selectLanguage);
    const toggleShowMessages = (chatId: number) => {
        setShowMassages((prevState) => ({
            ...prevState,
            [chatId]: !prevState[chatId]
        }));
    };

    const displayChats = async () => {
        try {
            const res = await axiosInstance.get(`/api/chats/user-id/${userId}`);
            setChats(res.data.data);
        } catch (error: any) {
            console.error(error);
        }
    };
console.log(chats);

    useEffect(() => {
        displayChats();
    }, [userId]);

    const breadcrumbLinks = [{ label: t('Reports.label.chat'), path: `/reports/chat` }];

    return (
        <>
            <Breadcrumb pageName={t('Reports.label.userChat')} breadcrumbLinks={breadcrumbLinks} />
            <div className={`bg-secondaryBG dark:bg-secondaryBG-dark p-4 rounded-md`}>
                {chats.map((chat) => (
                    <>
                    <div key={chat.id} className={`bg-[#EDEDED] dark:bg-[#3E3E46] rounded-md mb-5 p-3 flex flex-col`}>
                        <div className="flex justify-between">
                            <div className="flex items-center" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                                <div className="w-8 h-8 rounded-full bg-secondaryBG-dark dark:bg-secondaryBG-light"></div>
                                <Link to={`/profile/${userId}`} className="dark:text-secondaryBG text-secondaryBG-dark mx-3">
                                    {chat.customer_first_name || 'customer_first_name'}
                                </Link>
                            </div>
                            <div className="flex items-center" dir={language === 'ar' ? 'ltr' : 'rtl'}>
                                <div className="w-8 h-8 rounded-full bg-secondaryBG-dark dark:bg-secondaryBG-light"></div>
                                <Link to={`/profile/${userId}`} className="dark:text-secondaryBG text-secondaryBG-dark mx-3">
                                    {chat.advertizer_first_name || 'advertizer_first_name'}
                                </Link>
                            </div>
                        </div>
                        <div className="flex justify-between mx-[5px] mt-4">
                            <div className="dark:text-secondaryBG text-secondaryBG-dark">RC-{reportId}</div>
                            <div
                                onClick={() => toggleShowMessages(chat.id)}
                                role="button"
                                className="dark:text-secondaryBG text-secondaryBG-dark text-xl cursor-pointer"
                            >
                                {showMassages[chat.id] ? <TfiAngleUp /> : <TfiAngleDown />}
                            </div>
                        </div>
                    </div>
                        {showMassages[chat.id] && <ChatCard id={chat.id} />}
                    </>
                ))}
            </div>
        </>
    );
}

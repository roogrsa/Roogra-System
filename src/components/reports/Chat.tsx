import { Link, useLocation, useParams } from "react-router-dom";
import axiosInstance from "../../axiosConfig/instanc";
import { useEffect, useState } from "react";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { useTranslation } from "react-i18next";
import ChatCard from "./ChatCard";
import { TfiAngleDown, TfiAngleUp } from "react-icons/tfi";
import { useSelector } from "react-redux";
import { selectLanguage } from "../../store/slices/language";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeletePopup from "../popups/DeletePopup";
import { toast, ToastContainer } from "react-toastify";
import BanUnbanPopup from "../popups/BanUnbanPopup";
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
    const [selectedChat, setٍelectedChat] = useState<ChatValue | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBanModalOpen, setIsBanModalOpen] = useState(false);
    const [showMassages, setShowMassages] = useState<{ [key: number]: boolean }>({});
    const { userId } = useParams();
    const { t } = useTranslation();
    const location = useLocation();
    const reportId = location.state?.reportId;
    const language = useSelector(selectLanguage);
    // console.log(reportId);
    const openModal = (chat: ChatValue) => {
        setٍelectedChat(chat);
        setIsModalOpen(true);
    };
    const openBanModal = (chat: ChatValue) => {
        setٍelectedChat(chat);
        setIsBanModalOpen(true);
    };
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
            <div className={`bg-secondaryBG dark:bg-secondaryBG-dark border-2 border-[#D0D0D0] dark:border-[#333341] rounded-md`}>
                {chats.map((chat) => (
                    <div  key={chat.id}>
                        <div className={`bg-[#F7F5F9] dark:bg-[#2E2D3D] rounded-md ${chats.length > 1&& 'mb-5'} p-3 flex flex-col`}>
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
                        {showMassages[chat.id] && <>
                            <ChatCard id={chat.id} />
                            <div className="flex justify-center p-4 bg-[#F7F5F9] dark:bg-[#2E2D3D]">
                                <div className="flex gap-10">
                                    <RiDeleteBin6Line className="text-2xl text-Input-TextRed" role="button"
                                        onClick={() => openModal(chat)} />
                                    <img src="./../../../public/unblock.svg" width={25} alt="" role="button"
                                        onClick={() => openBanModal(chat)} />
                                </div>
                            </div>
                        </>
                        }
                        {selectedChat&&isModalOpen&& (
                            <DeletePopup
                                deleteName={`${selectedChat.customer_first_name} ${selectedChat.id}`}
                                deleteId={selectedChat.id}
                                url={`chats`}
                                isModalOpen={isModalOpen}
                                display={displayChats}
                                setIsModalOpen={setIsModalOpen}
                            />
                        )}
                        {selectedChat&&isBanModalOpen&& (
                            <BanUnbanPopup
                            customerName={`${selectedChat.customer_first_name} ${selectedChat.id}`}
                                chatId={selectedChat.id}
                                isModalOpen={isBanModalOpen}
                                setIsModalOpen={setIsBanModalOpen}
                            />
                        )}
                    </div>
                ))}
            </div>
            <ToastContainer position="top-right" autoClose={5000} />
        </>
    );
}

import { Link, useLocation } from "react-router-dom"
import { useState } from "react";
import ChatCard from "./ChatCard";
import { TfiAngleDown, TfiAngleUp } from "react-icons/tfi";
import { useSelector } from "react-redux";
import { selectLanguage } from "../../store/slices/language";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeletePopup from "../popups/DeletePopup";
import { ToastContainer } from "react-toastify";
import BanUnbanPopup from "../popups/BanUnbanPopup";
import { ChatValue } from "../../types/ChatValue";
import { useTranslation } from "react-i18next";
interface ChatProps {
    chat: ChatValue ;
    length?: number |undefined;
    userId?:string;
    chatId?:number|string;
    displayChats: () => ChatValue[] | ChatValue | null | Promise<void>;
}
type ModalType = 'delete' | 'customer' | 'advertizer'|null;
export default function Chat({ chat, displayChats ,length, userId, chatId}: ChatProps) {
    const [selectedChat, setٍelectedChat] = useState<ChatValue | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBanModalOpen, setIsBanModalOpen] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(null);
    const [showMassages, setShowMassages] = useState<{ [key: number]: boolean }>({});
    const { t } = useTranslation();
    const location = useLocation();
    const reportId = location.state?.reportId;
    const language = useSelector(selectLanguage);
    const openModal = (chat: ChatValue) => {
        setٍelectedChat(chat);
        setIsModalOpen(true);
    };
    const openBanModal = (type:ModalType) => {
        setٍelectedChat(chat);
        setIsBanModalOpen(true);
        setModalType(type);
        console.log(chat);
        
    };
    // console.log(chat?.id);
    
    const toggleShowMessages = (chatId: number) => {
        setShowMassages((prevState) => ({
            ...prevState,
            [chatId]: !prevState[chatId]
        }));
    };
    return (
        <div className="border-[#DBD5D5] dark:border-[#413F5C] border-2 rounded-md mb-3">
                <div className={`bg-[#F7F5F9] dark:bg-[#2E2D3D] rounded-md ${length&&length > 1 ? 'mb-5':''} p-3 flex flex-col`}>
                    <div className="flex justify-between">
                        <div className="flex items-center" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    <div className="bg-[#767876] p-1 rounded-md">
                            <img src="./../../../subtract.png" width={20} alt="" role="button"
                                onClick={() => openBanModal('customer')} />
                                </div>
                            <div className="w-8 h-8 rounded-full bg-secondaryBG-dark dark:bg-secondaryBG-light mx-2"></div>
                            <Link to={`/profile/${userId}`} className="dark:text-secondaryBG text-secondaryBG-dark mx-3">
                                {chat?.customer_first_name || 'customer_first_name'}
                            </Link>
                            
                        </div>
                        <div className="text-secondaryBG-dark border-[#D6D4D4] border-2 
                        bg-[#DCECF5] rounded-md px-3">{t('Reports.headers.id')} RC-{reportId}</div>
                        <div className="flex items-center" dir={language === 'ar' ? 'ltr' : 'rtl'}>
                        <div className="bg-[#767876] p-1 rounded-md" onClick={() => openBanModal('advertizer')}>
                            <img src="./../../../subtract.png" width={20} alt="" role="button"/>
                                </div>
                            <div className="w-8 h-8 rounded-full bg-secondaryBG-dark dark:bg-secondaryBG-light mx-2"></div>
                            <Link to={`/profile/${userId}`} className="dark:text-secondaryBG text-secondaryBG-dark mx-3">
                                {chat?.advertizer_first_name || 'advertizer_first_name'}
                            </Link>
                        </div>
                    </div>
                    {/* <div className="flex justify-between mx-[5px] mt-4">
                        
                        <div
                            onClick={() => toggleShowMessages(chat?.id)}
                            role="button"
                            className="dark:text-secondaryBG text-secondaryBG-dark text-xl cursor-pointer"
                        >
                            {showMassages[chat?.id] ? <TfiAngleUp /> : <TfiAngleDown />}
                        </div>
                    </div> */}
                </div>
                {/* {showMassages[chat?.id] && <> */}
                    <ChatCard id={chatId} userId={userId}/>
                    <div className="flex justify-center p-4 bg-[#F7F5F9] dark:bg-[#2E2D3D]">
                        <div className="flex gap-10">
                            <RiDeleteBin6Line className="text-2xl text-Input-TextRed" role="button"
                                onClick={() => openBanModal('delete')} />
                                
                        </div>
                    </div>
                {/* </>
                } */}
                {selectedChat && modalType === 'delete' && (
                    <DeletePopup
                        deleteName={`${selectedChat.customer_first_name} ${selectedChat.id}`}
                        deleteId={selectedChat.id}
                        url={`chats`}
                        // isModalOpen={isModalOpen}
                        // setIsModalOpen={setIsModalOpen}
                        isModalOpen={modalType === 'delete'}
                        setIsModalOpen={() => setModalType(null)}
                        display={displayChats}
                    />
                )}
                {selectedChat && modalType === 'advertizer' && (
                    <BanUnbanPopup
                        customerName={`${selectedChat.advertizer_first_name}`}
                        chatId={selectedChat.advertizer_id}
                        isModalOpen={modalType === 'advertizer'}
                        setIsModalOpen={() => setModalType(null)}
                    />
                )}
                {selectedChat && modalType === 'customer' && (
                    <BanUnbanPopup
                        customerName={`${selectedChat.customer_first_name}`}
                        chatId={selectedChat.customer_id}
                        isModalOpen={modalType === 'customer'}
                        setIsModalOpen={() => setModalType(null)}
                    />
                )}
            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );
}
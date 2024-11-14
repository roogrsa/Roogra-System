import { Link, useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import ChatCard from './ChatCard';
import { TfiAngleDown, TfiAngleUp } from 'react-icons/tfi';
import { useSelector } from 'react-redux';
import { selectLanguage } from '../../store/slices/language';
import { RiDeleteBin6Line } from 'react-icons/ri';
import DeletePopup from '../popups/DeletePopup';
import { ToastContainer } from 'react-toastify';
import BanUnbanPopup from '../popups/BanUnbanPopup';
import { ChatValue } from '../../types/ChatValue';
interface ChatProps {
  chat: ChatValue;
  length?: number | undefined;
  displayChats: () => ChatValue[] | ChatValue | null | Promise<void>;
}
export default function Chat({ chat, displayChats, length }: ChatProps) {
  // const [chats, setChats] = useState<ChatValue[]>([]);
  const [selectedChat, setٍelectedChat] = useState<ChatValue | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBanModalOpen, setIsBanModalOpen] = useState(false);
  const [showMassages, setShowMassages] = useState<{ [key: number]: boolean }>(
    {},
  );
  const { userId } = useParams();
  const location = useLocation();
  const reportId = location.state?.reportId;
  const language = useSelector(selectLanguage);
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
      [chatId]: !prevState[chatId],
    }));
  };
  return (
    <>
      <div
        className={`bg-[#F7F5F9] dark:bg-[#2E2D3D] rounded-md ${
          length && length > 1 ? 'mb-5' : ''
        } p-3 flex flex-col`}
      >
        <div className="flex justify-between">
          <div
            className="flex items-center"
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          >
            <div className="w-8 h-8 rounded-full bg-secondaryBG-dark dark:bg-secondaryBG-light"></div>
            <Link
              to={`/profile/${userId}`}
              className="dark:text-secondaryBG text-secondaryBG-dark mx-3"
            >
              {chat?.customer_first_name || 'customer_first_name'}
            </Link>
          </div>
          <div
            className="flex items-center"
            dir={language === 'ar' ? 'ltr' : 'rtl'}
          >
            <div className="w-8 h-8 rounded-full bg-secondaryBG-dark dark:bg-secondaryBG-light"></div>
            <Link
              to={`/profile/${userId}`}
              className="dark:text-secondaryBG text-secondaryBG-dark mx-3"
            >
              {chat?.advertizer_first_name || 'advertizer_first_name'}
            </Link>
          </div>
        </div>
        <div className="flex justify-between mx-[5px] mt-4">
          <div className="dark:text-secondaryBG text-secondaryBG-dark">
            RC-{reportId}
          </div>
          <div
            onClick={() => toggleShowMessages(chat?.id)}
            role="button"
            className="dark:text-secondaryBG text-secondaryBG-dark text-xl cursor-pointer"
          >
            {showMassages[chat?.id] ? <TfiAngleUp /> : <TfiAngleDown />}
          </div>
        </div>
      </div>
      {showMassages[chat?.id] && (
        <>
          <ChatCard id={chat?.id} />
          <div className="flex justify-center p-4 bg-[#F7F5F9] dark:bg-[#2E2D3D]">
            <div className="flex gap-10">
              <RiDeleteBin6Line
                className="text-2xl text-Input-TextRed"
                role="button"
                onClick={() => openModal(chat)}
              />
              <img
                src="/unblock.svg"
                width={25}
                alt=""
                role="button"
                onClick={() => openBanModal(chat)}
              />
            </div>
          </div>
        </>
      )}
      {selectedChat && isModalOpen && (
        <DeletePopup
          deleteName={`${selectedChat.customer_first_name} ${selectedChat.id}`}
          deleteId={selectedChat.id}
          url={`chats`}
          isModalOpen={isModalOpen}
          display={displayChats}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      {selectedChat && isBanModalOpen && (
        <BanUnbanPopup
          customerName={`${selectedChat.customer_first_name} ${selectedChat.id}`}
          chatId={selectedChat.id}
          isModalOpen={isBanModalOpen}
          setIsModalOpen={setIsBanModalOpen}
        />
      )}
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}

import { useSelector } from 'react-redux';
import { selectLanguage } from '../../store/slices/language';
import axiosInstance from '../../axiosConfig/instanc';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ChatCardProps {
    id?: number |string;
    userId?:string;
}
interface MessagesValue {
    customer_id: number;
    from_id: number;
    form_name: string;
    advertizer_id: number;
    to_name: string;
    message_id: number;
    text: string;
    attachment: string;
    date_added: string;
    status: number;
    length: number;
}

export default function ChatCard({ id ,userId}: ChatCardProps) {
    const { t } = useTranslation();
    const language = useSelector(selectLanguage);
    const [messages, setMessages] = useState<MessagesValue[]>([]);
    const displayChatMsg = async () => {
        try {
            const res = await axiosInstance.get(`/api/chats/messages/${id}`);
            setMessages(res.data.data);
        } catch (error: any) {
            console.error(error);
        }
    };
    useEffect(() => {
        displayChatMsg();
    }, []);

    return (
        <div className="p-3">
            {messages.length > 0 ? (
                messages.map((msg) => {
                    const isUserMessage = msg.from_id === Number(userId) || msg.from_id === msg.customer_id;
                    const bubbleDirection = isUserMessage ? (language === 'ar' ? 'rtl' : 'ltr') : (language === 'ar' ? 'ltr' : 'rtl');
                    return (
                        <div key={msg.message_id} className={`flex mb-6 ${isUserMessage ? 'justify-start' : 'justify-end'}`}>
                            <div
                                className="flex items-start gap-2.5"
                                dir={bubbleDirection}
                            >
                                {isUserMessage && (
                                    <>
                                        <div className="w-8 h-8 rounded-full bg-secondaryBG-dark dark:bg-secondaryBG-light">
                                            {/* <img src={msg.message_id} alt="" /> */}
                                        </div>
                                        <div
                                            className={`w-64 p-4 rounded-xl leading-1.5 border-gray-200 bg-[#335E86] dark:[#335E86]`}
                                        >
                                            <p className="text-secondaryBG-light">{msg.text}</p>
                                            <p className="text-secondaryBG-light flex justify-end">{new Date(msg.date_added).toLocaleDateString()}</p>
                                        </div>
                                    </>
                                )}
                                {!isUserMessage && (
                                    <>
                                        <div className="w-8 h-8 rounded-full bg-secondaryBG-dark dark:bg-secondaryBG-light"></div>
                                        <div
                                            className={`w-64 p-4 rounded-xl leading-1.5 border-gray-200 bg-[#9D9D9D] dark:[#9D9D9D]`}
                                        >
                                            <p className="text-secondaryBG-light" dir={language === 'ar' ? 'rtl' : 'ltr'}>{msg.text}</p>
                                            <p className="text-secondaryBG-light">{new Date(msg.date_added).toLocaleDateString()}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="font-semibold">{t('Reports.label.isMsg')}</div>
            )}
        </div>
    );
}

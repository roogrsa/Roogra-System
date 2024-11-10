import { useSelector } from 'react-redux';
import { selectLanguage } from '../../store/slices/language';
import axiosInstance from '../../axiosConfig/instanc';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ChatCardProps {
    id: number,
}
interface MessagesValue {
    customer_id: number,
    form_name: string,
    advertizer_id: number,
    to_name: string,
    message_id: number,
    text: string,
    attachment: string,
    date_added: string,
    status: number,
    length: number
}
export default function ChatCard({ id }: ChatCardProps) {
    const { t } = useTranslation();
    const language = useSelector(selectLanguage);
    const [messages, setMessages] = useState<MessagesValue[]>([]);
    const displayChatMsg = async () => {
        try {
            const res = await axiosInstance.get(`/api/chats/messages/${id}`);
            console.log(res.data.data);
            setMessages(res.data.data)
        } catch (error: any) {
            console.error(error);
            console.log(error?.response?.data?.message);
        }
    };
    useEffect(() => {
        displayChatMsg()
    }, []);
    console.log(messages);
    
    return (
        <div className='max-h-50 overflow-y-scroll p-3'>
        {messages.length>0?
        messages.map((msg)=>(
            <>
            <div className="flex items-start gap-2.5 mb-6"
                dir={language === 'ar' ? 'rtl' : 'ltr'}
            >
                <div className="w-8 h-8 rounded-full bg-secondaryBG-dark dark:bg-secondaryBG-light" ></div>
                <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-MainTableBG-OddLight rounded-e-xl 
                                rounded-es-xl dark:bg-primaryBG-dark">
                        <span className="font-semibold text-secondaryBG-dark dark:text-secondaryBG-light">{msg.text}</span>
                </div>
            </div>
            <div className="flex items-start gap-2.5"
                dir={language === 'ar' ? 'ltr' : 'rtl'}
            >
                    <div className="w-8 h-8 rounded-full bg-secondaryBG-dark dark:bg-secondaryBG-light" ></div>
                <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-MainTableBG-OddLight rounded-e-xl 
                                rounded-es-xl dark:bg-primaryBG-dark">
                        <span className="font-semibold text-secondaryBG-dark dark:text-secondaryBG-light">{msg.text}</span>
                </div>
            </div>
            </>
        )):
        <div className='font-semibold'>{t(`Reports.label.isMsg`)}</div>
        }
        </div>
    )
}

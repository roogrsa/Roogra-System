import { useSelector } from 'react-redux';
import { selectLanguage } from '../../store/slices/language';
import axiosInstance from '../../axiosConfig/instanc';
import { useEffect, useState } from 'react';

interface ChatCardProps {
    id: number,
}
interface MassagesValue {
    customer_id: number,
    form_name: string,
    advertizer_id: number,
    to_name: string,
    message_id: number,
    text: string,
    attachment: string,
    date_added: string,
    status: number
}
export default function ChatCard({ id }: ChatCardProps) {
    const language = useSelector(selectLanguage);
    const [massages, setMassages] = useState<MassagesValue[]>([]);
    const displayChatMsg = async () => {
        try {
            const res = await axiosInstance.get(`/api/chats/messages/${id}`);
            console.log(res.data.data);
            setMassages(res.data.data)
        } catch (error: any) {
            console.error(error);
            console.log(error?.response?.data?.message);
        }
    };
    useEffect(() => {
        displayChatMsg()
    }, []);
    return (
        <>
        {massages.map((msg)=>(
            <div className="flex items-start gap-2.5 mb-6"
                dir={language === 'ar' ? 'rtl' : 'ltr'}
            >
                <div className="w-8 h-8 rounded-full bg-secondaryBG-dark dark:bg-secondaryBG-light" ></div>
                <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-MainTableBG-OddLight rounded-e-xl 
                                rounded-es-xl dark:bg-primaryBG-dark">
                        <span className="font-semibold text-secondaryBG-dark dark:text-secondaryBG-light">{msg.text}</span>
                </div>
            </div>

        ))}
            {/* <div className="flex items-start gap-2.5"
                dir={language === 'ar' ? 'ltr' : 'rtl'}
            >
                <div className="w-8 h-8 rounded-full bg-secondaryBG-dark dark:bg-secondaryBG-light" ></div>
                <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-MainTableBG-OddLight rounded-e-xl 
            rounded-es-xl dark:bg-primaryBG-dark">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{userName}</span>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{time}</span>
                    </div>
                    <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{messageText}</p>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
                </div>
            </div> */}
        </>
    )
}

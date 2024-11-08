import { Link, useParams } from "react-router-dom"
import axiosInstance from "../../axiosConfig/instanc";
import { useEffect, useState } from "react";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { useTranslation } from "react-i18next";
import ChatCard from "./ChatCard";
import { TfiAngleDown } from "react-icons/tfi";
import { TfiAngleUp } from "react-icons/tfi";

interface ChatValue {
    id: number,
    date_added: string,
    customer_id: number,
    customer_first_name: string,
    customer_last_name: string,
    advertizer_id: number,
    advertizer_first_name: string,
    advertizer_last_name: string
}
export default function Chat() {
    const [chats, setChats] = useState<ChatValue[]>([]);
    const [showMassages, setShowMassages] = useState<boolean>(false);
    const isShowMassages = () => setShowMassages(!showMassages)
    const { chatId } = useParams();
    const { t } = useTranslation();
    console.log(chatId);

    const displayChats = async () => {
        try {
            const res = await axiosInstance.get(`/api/chats/user-id/${chatId}`);
            console.log(res.data.data);
            setChats(res.data.data);
        } catch (error: any) {
            console.error(error);
            console.log(error?.response?.data?.message);
        }
    };
    // const displayChatsById = async () => {
    //     try {
    //         const res = await axiosInstance.get(`/api/chats/${3}`);
    //         console.log(res.data.data);
    //     } catch (error: any) {
    //         console.error(error);
    //         console.log(error?.response?.data?.message);
    //     }
    // };

    useEffect(() => {
        displayChats()
    }, []);
    const breadcrumbLinks = [{ label: t('Reports.label.chat'), path: `/reports/chat` }]
    return (
        <>
            <Breadcrumb pageName={t('Reports.label.userChat')} breadcrumbLinks={breadcrumbLinks} />
            <div className={`bg-secondaryBG dark:bg-secondaryBG-dark p-4 rounded-md`}>
                {chats.map((chat) => (
                    <>
                        <div className={`dark:bg-secondaryBG bg-secondaryBG-dark rounded-md mb-5 p-3 flex justify-between`}>
                            <div className="flex">
                                <div className="w-8 h-8 rounded-full dark:bg-secondaryBG-dark bg-secondaryBG-light" ></div>
                                <Link to={`/profile/${chatId}`} className="text-secondaryBG dark:text-secondaryBG-dark mx-3">{chatId}</Link>
                            </div>
                            <div>{chat.id}</div>
                            <div onClick={isShowMassages} role="button" className="text-secondaryBG dark:text-secondaryBG-dark
                            text-3xl">
                                {showMassages ? <TfiAngleUp /> : <TfiAngleDown />}</div>
                        </div>
                        {showMassages && <ChatCard id={chat.id} />}
                    </>
                ))}
            </div>
        </>
    )
}

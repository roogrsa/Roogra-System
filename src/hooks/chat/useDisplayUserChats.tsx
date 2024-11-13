import { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig/instanc";
import { ChatValue } from "../../types/ChatValue";

export default function useDisplayUserChats(userId?: string) {
    const [chats, setChats] = useState<ChatValue[]>([]);
    const displayChatsByUserId = async () => {
        try {
            const res = await axiosInstance.get(`/api/chats/user-id/${userId}`);
            setChats(res.data.data);
        } catch (error: any) {
            console.error(error);
        }
    };
    console.log(chats);

    useEffect(() => {
        displayChatsByUserId();
    }, [userId]);
    return chats
}

import { useEffect } from "react";
import axiosInstance from "../../axiosConfig/instanc";

interface BanImageProps {
    id: number;
    isBan: boolean;
    setIsBan: (isBan: boolean) => void;
}

export default function BanImage({ id, setIsBan, isBan }: BanImageProps) {

    // const fetchUser = async () => {
    //     try {
    //         const response = await axiosInstance.get(`/api/users/${id}`);
    //         const isBanned = response.data.data.isBanned;
    //         setIsBan(isBanned == 1);
    //     } catch (err) {
    //         console.error("Error fetching user data:", err);
    //     }
    // };

    // useEffect(() => {
    //     fetchUser();
    // }, [id]);

    return (
        <div
            className={`${isBan ? "bg-[#FA9623]" : "bg-[#767876]"} p-1 rounded-md flex items-center justify-center`}>
            <img
                src="/subtract.png" width={20} alt="ban" role="button"/>
        </div>
    );
}

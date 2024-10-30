import { useTranslation } from "react-i18next";
import TableHeader from "../../components/Tables/TableHeader";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig/instanc";

export interface ContactUsType {
    ticket_id: number;
    customer_name: string;
    response_date: string;
    date_added: string;
    admin_name: string;
    customer_id: number;
    admin_id: number;
}
interface ContactUsTableProps{
    type:string
}
export default function ContactUsTable({type}:ContactUsTableProps) {
    const { t } = useTranslation()
    const [contactUs, setContactUs] = useState<ContactUsType[]>([])
    const header: any[] = [
        `#`,
        t(`contact-us.username`),
        t(`contact-us.date`),
        t(`contact-us.lastReply`),
        t(`contact-us.replyDate`),
        t(`contact-us.closeTicket`),
        t(`contact-us.edit`),
    ];
    const displayContactUs = async () => {
        try {
            const res = await axiosInstance.get(`/api/support/type/${type}/status/open`);
            console.log(res.data.data);
            setContactUs(res.data.data)
        } catch (error: any) {
            console.error(error);
            console.log(error?.response?.data?.message);
        }
    };
    useEffect(() => {
        displayContactUs()
    }, []);
    console.log(contactUs);

    return (
        <div>
            <table className="w-full text-[20px] text-left rtl:text-right text-text-light dark:text-text-dark">
                <TableHeader header={header} />
                <tbody>
                    {contactUs.map((bank, index) => (
                        <tr
                            key={bank.ticket_id}
                            className={`dark:border-gray-700  ${index % 2 !== 0
                                    ? 'dark:bg-MainTableBG-OddDark bg-MainTableBG-OddLight'
                                    : 'dark:bg-MainTableBG-EvenDark bg-MainTableBG-EvenLight'}`}
                        >
                            <td scope="row" className="px-2 py-2 font-[400] text-[17px] text-center">
                                {index + 1}
                            </td>
                            <td scope="row" className="px-2 py-2 font-[400] text-[17px] text-center">
                                {bank.customer_name}
                            </td>
                            <td className="px-2 py-2 font-[400] text-[17px] text-center">
                                {bank.date_added}</td>
                            <td className="px-2 py-2 font-[400] text-[17px] text-center">{bank.admin_name}</td>
                            <td className="px-2 py-2 font-[400] text-[17px] text-center">{bank.response_date}</td>
                            <td className="px-2 py-2 font-[400] text-[17px] text-center">
                            <img src="./../../../Edit.svg" alt="" className="bg-edit p-1 m-auto rounded-md"
                                role="button"/>
                            </td>
                            <td className="px-2 py-2 font-[400] text-[17px]">
                                <img src="./../../../Edit.svg" alt="" className="bg-edit p-1 m-auto rounded-md"
                                role="button"/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

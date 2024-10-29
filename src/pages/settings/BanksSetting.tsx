import { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig/instanc";
import { useTranslation } from "react-i18next";
import { RiDeleteBin6Line } from "react-icons/ri";
import TableHeader from "../../components/Tables/TableHeader";
import { FiEdit3 } from "react-icons/fi";
import DeletePopup from "../../components/popups/DeletePopup";
export interface BankType {
    bank_id: number;
    bank_account_name: string;
    bank_account_num: string;
    bank_ipan: string;
    bank_img: string;
    length: number;
}

export default function BanksSetting() {
    const [banks, setBanks] = useState<BankType[]>([])
    const [selectedBank, setSelectedBank] = useState<BankType | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { t } = useTranslation()
    const header: any[] = [
        `#`,
        t(`settings.accountHolder`),
        t(`settings.accountNumber`),
        t(`settings.bankIBAN`),
        t(`settings.bankLogo`),
        t(`settings.edit`),
        <RiDeleteBin6Line className="text-xl text-Input-TextRed" />
    ];
    const openModal = (bank: BankType) => {
        setSelectedBank(bank);
        setIsModalOpen(true);
    };
    const displayBanks = async () => {
        try {
            const res = await axiosInstance.get(`/api/banks`);
            console.log(res.data.data);
            setBanks(res.data.data)
        } catch (error: any) {
            console.error(error);
            console.log(error?.response?.data?.message);
        }
    };
    useEffect(() => {
        displayBanks()
    }, []);
    console.log(banks);

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-[20px] text-left rtl:text-right text-text-light dark:text-text-dark">
                <TableHeader header={header} />
                <tbody>
                    {banks.map((bank, index) => (
                        <tr
                            key={bank.bank_id}
                            className={`${index !== bank.length - 1 ? 'border-b' : ''}
                            dark:border-gray-700  ${index % 2 !== 0
                                    ? 'dark:bg-MainTableBG-OddDark bg-MainTableBG-OddLight'
                                    : 'dark:bg-MainTableBG-EvenDark bg-MainTableBG-EvenLight'}`}
                        >
                            <td scope="row" className="px-2 py-2 font-[400] text-[17px]">
                                {index + 1}
                            </td>
                            <td scope="row" className="px-2 py-2 font-[400] text-[17px] text-center">
                                {bank.bank_account_name}
                            </td>
                            <td className="px-2 py-2 font-[400] text-[17px] text-center">
                                {bank.bank_account_num}</td>
                            <td className="px-2 py-2 font-[400] text-[17px] text-center">{bank.bank_ipan}</td>
                            <td className="px-2 py-2 font-[400] text-[17px]">
                                <img src={bank.bank_img} width={100} alt={bank.bank_img} className="m-auto"/>
                            </td>
                            <td className="px-2 py-2 font-[400] text-[17px] m-auto">
                                <FiEdit3 className="text-xl text-Input-TextGreen" role="button" />
                            </td>
                            <td className="px-2 py-2 font-[400] text-[17px]">
                                <RiDeleteBin6Line className="text-xl text-Input-TextRed" role='button' onClick={()=>openModal(bank)}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedBank && (
                <DeletePopup
                    deleteName={selectedBank.bank_account_num}
                    deleteId={selectedBank.bank_id}
                    url={`ads`}
                    isModalOpen={isModalOpen}
                    display={displayBanks}
                    setIsModalOpen={setIsModalOpen}
                />
            )}
        </div>
    )
}

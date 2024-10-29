import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiDeleteBin6Line } from "react-icons/ri";
import axiosInstance from "../../axiosConfig/instanc";
import { FiEdit3 } from "react-icons/fi";
import TableHeader from "../../components/Tables/TableHeader";
import DeletePopup from "../../components/popups/DeletePopup";

export interface BannerType {
    ad_id: number;
    name: string;
    period: string;
    url: string;
    image: string;
    length: number;
}
export default function BannersSetting() {
    const [banners, setBanners] = useState<BannerType[]>([])
    const [selectedBanner, setSelectedBanner] = useState<BannerType | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { t } = useTranslation()
    const header: any[] = [
        `#`,
        t(`settings.bannerName`),
        t(`settings.bannerurl`),
        t(`settings.duration`),
        t(`settings.bannerImage`),
        t(`settings.edit`),
        <RiDeleteBin6Line className="text-xl text-Input-TextRed" />
    ];
    const openModal = (banner: BannerType) => {
        setSelectedBanner(banner);
        setIsModalOpen(true);
    };
    const displayBanners = async () => {
        try {
            const res = await axiosInstance.get(`/api/ads`);
            console.log(res.data.data);
            setBanners(res.data.data)
        } catch (error: any) {
            console.error(error);
            console.log(error?.response?.data?.message);
        }
    };
    useEffect(() => {
        displayBanners()
    }, []);
    console.log(banners);
    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-[20px] text-left rtl:text-right text-text-light dark:text-text-dark">
                <TableHeader header={header} />
                <tbody>
                    {banners.map((banner, index) => (
                        <tr
                            key={banner.ad_id}
                            className={`${index !== banner.length - 1 ? 'border-b' : ''}
                            dark:border-gray-700  ${index % 2 !== 0
                                    ? 'dark:bg-MainTableBG-OddDark bg-MainTableBG-OddLight'
                                    : 'dark:bg-MainTableBG-EvenDark bg-MainTableBG-EvenLight'}`}
                        >
                            <td scope="row" className="px-2 py-2 font-[400] text-[17px]">
                                {index + 1}
                            </td>
                            <td scope="row" className="px-2 py-2 font-[400] text-[17px] text-center">
                                {banner.name}
                            </td>
                            <td className="px-2 py-2 font-[400] text-[17px] text-center">{banner.url}</td>
                            <td className="px-2 py-2 font-[400] text-[17px] text-center">
                                {banner.period}</td>
                            <td className="px-2 py-2 font-[400] text-[17px]">
                                <img src={banner.image} width={80} alt={banner.image} className="m-auto" />
                            </td>
                            <td className="px-2 py-2 font-[400] text-[17px]">
                                <FiEdit3 className="text-xl  m-auto text-Input-TextGreen" role="button" />
                            </td>
                            <td className="px-2 py-2 font-[400] text-[17px]">
                                <RiDeleteBin6Line className="text-xl text-Input-TextRed" role='button' onClick={()=>openModal(banner)}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedBanner && (
                <DeletePopup
                    deleteName={selectedBanner.name}
                    deleteId={selectedBanner.ad_id}
                    url={`ads`}
                    isModalOpen={isModalOpen}
                    display={displayBanners}
                    setIsModalOpen={setIsModalOpen}
                />
            )}
        </div>
    )
}

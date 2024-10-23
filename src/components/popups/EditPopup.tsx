import { useTranslation } from "react-i18next";
import { BiErrorCircle } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import axiosInstance from "../../axiosConfig/instanc";
import { toast, ToastContainer } from "react-toastify";
interface EditPopupProps {
    name: string;
    id: number;
    url: string;
    isModalOpen:boolean;
    setIsModalOpen:(isModalOpen: boolean) => void;
}
const EditPopup = ({ name, id, url, isModalOpen, setIsModalOpen}: EditPopupProps) => {
    const { t } = useTranslation();
    const closeModal = () => setIsModalOpen(false);
    
    const addCategory = async () => {
        try {
            const res = await axiosInstance.post(`api/${url}/${id}`);
            console.log(res);
            closeModal()
            toast.success(`${name} ${t('popup.add_toast')}`);
        } catch (error: any) {
            console.error(error);
            closeModal()
            toast.error(error?.response?.data?.message);
        }
    };
    return (
        <div>
            {isModalOpen && (
                <div
                id={`popup-modal_add_${id}`}
                className="fixed inset-0 z-50 flex justify-center items-center w-full h-screen bg-TheadBorder-light bg-opacity-20"
                >
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button
                                onClick={closeModal}
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900
                                    rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 
                                    dark:hover:text-white"
                            >
                                <IoClose className="text-lg" />
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-4 md:p-5 text-center">
                                <BiErrorCircle className="mx-auto mb-4 text-gray-400 text-5xl dark:text-gray-200" />
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-secondaryBG-light">
                                    {t('popup.add_title')} {name}
                                </h3>
                                
                                <div className="flex justify-between">
                                    <button
                                        onClick={addCategory}
                                        className="text-white bg-red-600 hover:bg-red-800 focus:outline-none font-medium rounded-lg 
                                    text-sm px-5 py-2.5 text-center">
                                        {t('popup.delete')}
                                    </button>
                                    <button
                                        onClick={closeModal}
                                        className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-secondaryBG-light 
                                    rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4
                                        focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-secondaryBG-dark dark:text-secondaryBG-light
                                        dark:border-gray-600"
                                    >
                                        {t('popup.cancle')}
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );
};

export default EditPopup;

import { useTranslation } from 'react-i18next';
import { IoClose } from 'react-icons/io5';
import axiosInstance from '../../axiosConfig/instanc';
import { toast, ToastContainer } from 'react-toastify';
import { Formik, FormikHelpers, FormikProps, Form, Field } from 'formik';
interface SettingsPopupProps {
    response: string;
    id: number;
    admin_id: number;
    customer_id: number;
    subject: string;
    enquiry: string;
    isModalOpen: boolean;
    setIsModalOpen: (isModalOpen: boolean) => void;
    display: () => Promise<void>;
    ticket_id:number;
}
interface SupportValues {
    customer_id: number,
    admin_id: number,
    subject: string,
    enquiry: string,
    response: string,
}
const SupportPopup = ({
    response,
    ticket_id,
    id,
    customer_id,
    admin_id,
    subject,
    isModalOpen,
    enquiry,
    setIsModalOpen,
    display,
}: SettingsPopupProps) => {

    const { t } = useTranslation();
    const closeModal = () => setIsModalOpen(false);
    const initialValues: SupportValues = {
        customer_id: customer_id,
        admin_id: admin_id,
        subject: subject,
        enquiry: enquiry,
        response: '',
    };

    const handleCategorySubmit = async (
        values: SupportValues,
        { setSubmitting }: FormikHelpers<SupportValues>,
    ) => {
        try {
            setSubmitting(true);
            const res = await axiosInstance.put(`api/support/${ticket_id}`, values, {
                headers: { 'Content-Type': 'application/json' },
            });
            console.log(res);
            toast.success(` ${t('popup.edit_toast')}`);
            display();
            closeModal();
        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.message);
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <div>
            {isModalOpen && (
                <div
                    id={`popup-modal_add_${id}`}
                    className="fixed inset-0 z-50 flex justify-center items-center w-full h-screen bg-secondaryBG-light data:bg-secondaryBG-dark bg-opacity-20"
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
                            <div className="p-4 md:p-5">
                                <h3 className="mb-5 text-center text-2xl font-normal text-gray-500 dark:text-secondaryBG-light">
                                    {id && ` ${t('settings.edit')}`}
                                </h3>
                                <Formik
                                    initialValues={initialValues}
                                    onSubmit={handleCategorySubmit}
                                >
                                    {({ isSubmitting }: FormikProps<SupportValues>) => (
                                        <Form>
                                            <div className='m-auto w-[90%]'>
                                                <h3 className="mb-2 font-semibold dark:text-white">{t('contact-us.ticketDetails')}</h3>
                                                <div className='m-auto w-[90%] dark:bg-white dark:text-header-inputDark p-2 rounded-md'>{enquiry}</div>
                                            </div>
                                            <label
                                                htmlFor="response"
                                                className="block mb-2 font-semibold dark:text-white">
                                                {t('contact-us.reply')}
                                            </label>
                                            <Field
                                                as="textarea"
                                                id="response"
                                                name="response"
                                                rows="4"
                                                className={`block p-2.5 w-full text-sm bg-gray-50 rounded-lg border 
                                                    focus:outline-none dark:border-gray-600
                                                    dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:text-header-inputDark`} />
                                            <div className="mb-5 mt-2">
                                                <div className="flex justify-between">
                                                    <button
                                                        className="bg-login dark:bg-login-dark text-secondaryBG-light
                                                            dark:text-black focus:outline-none 
                                                        font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                    >
                                                        {t('popup.save')}
                                                    </button>
                                                    <button
                                                        onClick={closeModal}
                                                        className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-secondaryBG-light 
                                    rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4
                                        focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-secondaryBG-dark dark:text-secondaryBG-light
                                        dark:border-gray-600"
                                                    >
                                                        {t('popup.cancel')}
                                                    </button>
                                                </div>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );
};

export default SupportPopup;

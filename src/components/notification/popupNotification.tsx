//
import { useTranslation } from 'react-i18next';
import { IoClose } from 'react-icons/io5';
import { toast, ToastContainer } from 'react-toastify';
import { Formik, FormikHelpers, FormikProps, Form, Field } from 'formik';
import { FaAsterisk } from 'react-icons/fa';
import axiosInstance from '../../axiosConfig/instanc';
import { useSelector } from 'react-redux';
import { selectLanguage } from '../../store/slices/language';

interface EditPopupProps {
  name?: string;
  id?: number;
  url: string;
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

interface NotificationValues {
  title: string;
  message: string;
  date: string;
  customers: boolean;
  advertisers: boolean;
  delegates: boolean;
  observers: boolean;
  supervisors: boolean;
}

const AddNotification = ({
  name,
  id,
  url,
  isModalOpen,
  setIsModalOpen,
}: EditPopupProps) => {
  const { t } = useTranslation();
  const closeModal = () => setIsModalOpen(false);

  const initialValues: NotificationValues = {
    title: '',
    message: '',
    date: '',
    customers: false,
    advertisers: false,
    delegates: false,
    observers: false,
    supervisors: false,
  };

  const handleNotificationSubmit = async (
    values: NotificationValues,
    { setSubmitting }: FormikHelpers<NotificationValues>,
  ) => {
    try {
      setSubmitting(true);

      // Format the date as "yyyy/MM/dd"
      const formattedDate = new Date(values.date)
        .toLocaleDateString('en-CA')
        .replace(/-/g, '/');

      const {
        title,
        message,
        customers,
        advertisers,
        delegates,
        observers,
        supervisors,
      } = values;

      // Construct admin_group as a string of '1' and '0' based on the checkbox values
      const admin_group = `${delegates ? '1' : '0'}${observers ? '1' : '0'}${
        supervisors ? '1' : '0'
      }`;

      // Construct payload
      const payload = {
        title,
        message,
        expiry_date: formattedDate,
        customers,
        advertisers,
        admin_group,
      };
      console.log(payload);

      const res = await axiosInstance.post(`api/notifications`, payload);

      toast.success(t('notifications.popup.successfully'));
      closeModal();
      console.log(res);
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || t('notifications.popup.error'),
      );
    } finally {
      setSubmitting(false);
    }
  };

  const language = useSelector(selectLanguage);

  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {isModalOpen && (
        <div
          id={`popup-modal_add_${id}`}
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-screen bg-TheadBorder-light bg-opacity-20"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-secondaryBG-light rounded-lg shadow dark:bg-secondaryBG-dark flex flex-col">
              <div className="flex justify-end p-3">
                <button
                  onClick={closeModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <IoClose className="text-lg" />
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-4 md:p-5">
                <Formik
                  initialValues={initialValues}
                  onSubmit={handleNotificationSubmit}
                >
                  {({ isSubmitting }: FormikProps<NotificationValues>) => (
                    <Form className="flex flex-col gap-4">
                      {/* <div className="flex flex-col">
                        <label className=".5 font-medium text-black dark:text-white flex">
                          {t('notifications.popup.title')}
                          <span>
                            <FaAsterisk className="text-[8px] text-[#E02828]" />
                          </span>
                        </label>
                        <Field
                          type="text"
                          placeholder={t(
                            'notifications.popup.placeholderTitle',
                          )}
                          name="title"
                          className="w-full rounded-lg border border-stroke py-3 px-4 text-black outline-none dark:border-form-strokedark"
                        />
                      </div> */}

                      <div className="flex flex-col">
                        <label className=".5 font-medium text-black dark:text-white flex">
                          {t('notifications.popup.message')}
                          <span>
                            <FaAsterisk className="text-[8px] text-[#E02828]" />
                          </span>
                        </label>
                        <Field
                          as="textarea"
                          placeholder={t(
                            'notifications.popup.placeholderMessage',
                          )}
                          name="message"
                          className="w-full rounded-lg border border-stroke py-3 px-4 text-black outline-none dark:border-form-strokedark"
                        />
                      </div>

                      {/* <div className="flex flex-col">
                        <label className=".5 font-medium text-black dark:text-white flex">
                          {t('notifications.popup.expiry_date')}
                          <span>
                            <FaAsterisk className="text-[8px] text-[#E02828]" />
                          </span>
                        </label>
                        <Field
                          type="date"
                          name="date"
                          className="w-full rounded-lg border border-stroke py-3 px-4 text-black outline-none dark:border-form-strokedark"
                        />
                      </div> */}

                      {/* Admin Group Checkboxes */}

                      <div className="flex flex-cl gap-8">
                        <div className="flex items-center">
                          <Field type="checkbox" name="delegates" />
                          <label className="font-medium text-black dark:text-white m-2">
                            {t('notifications.popup.Delegates')}
                          </label>
                        </div>
                        <div className="flex items-center">
                          <Field type="checkbox" name="observers" />
                          <label className="font-medium text-black dark:text-white m-2">
                            {t('notifications.popup.Observers')}
                          </label>
                        </div>
                        <div className="flex items-center">
                          <Field type="checkbox" name="supervisors" />
                          <label className="font-medium text-black dark:text-white m-2">
                            {t('notifications.popup.Supervisors')}
                          </label>
                        </div>
                      </div>

                      <div className="flex gap-8">
                        <div className="flex items-center">
                          <Field type="checkbox" name="customers" />
                          <label className="font-medium text-black dark:text-white m-2">
                            {t('notifications.popup.customers')}
                          </label>
                        </div>
                        <div className="flex items-center">
                          <Field type="checkbox" name="advertisers" />
                          <label className="font-medium text-black dark:text-white m-2">
                            {t('notifications.popup.advertisers')}
                          </label>
                        </div>
                      </div>

                      <div className="flex justify-between mt-5">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-login dark:bg-login-dark text-secondaryBG-light dark:text-black font-medium rounded-lg text-sm px-5 py-2.5"
                        >
                          {t('notifications.popup.save')}
                        </button>
                        <button
                          onClick={closeModal}
                          className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-secondaryBG-light rounded-lg border border-gray-200 hover:bg-gray-100 dark:bg-secondaryBG-dark dark:text-secondaryBG-light dark:border-gray-600"
                        >
                          {t('notifications.popup.cancel')}
                        </button>
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

export default AddNotification;

import { ErrorMessage, Field } from "formik";
import { useTranslation } from "react-i18next";

interface InputTextProps {
    type: string;
    name: string;
    label: string;
}
export default function InputText({ type, name, label }: InputTextProps) {
    const { t } = useTranslation();
    return (
        <>
            <div className="mb-5">
                <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
                <Field type={type} name={name} id={name} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 
                text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                    dark:focus:border-blue-500 dark:shadow-sm-light" placeholder={t('admins.form.placeholder')} />
            </div>
            <ErrorMessage
                name={name}
                component="div"
                className="text-danger"
            />
        </>
    )
}

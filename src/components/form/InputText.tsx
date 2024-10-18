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
        <div>
            <div className="mb-4">
                <label htmlFor={name} className="block mb-2 text-lg font-bold text-gray-900 dark:text-white">{label}</label>
                <Field type={type} name={name} id={name} className="shadow-sm border border-gray-300 text-gray-900 
                text-sm rounded-md block  p-2 outline-0 dark:placeholder-gray-400 dark:shadow-sm-light"
                placeholder={t('admins.form.placeholder')} />
            </div>
            <ErrorMessage
                name={name}
                component="div"
                className="text-danger"
            />
        </div>
    )
}

import { RiDeleteBin6Line } from "react-icons/ri";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field
} from 'formik';
import axiosInstance from "../../axiosConfig/instanc";
import toast from "react-hot-toast";
interface AddAdminValues {
    name: string,
    password: string,
    type: "observer",
    workingHours: {
        start: string,
        end: string,
    },
    permissions: {
        super: boolean,
        charts: boolean,
        ads: { all: boolean, primary: boolean, subscription: boolean },
        users: { all: boolean, advertisers: boolean, customers: boolean },
        categories: { primary: boolean, subscription: boolean, region: boolean },
        requests: { attestation: boolean, category: boolean },
        contact: { inquiries: boolean, issues: boolean, suggestions: boolean },
        reports: { chats: boolean, products: boolean },
        banlist: { chats: boolean, products: boolean },
        admins: boolean,
        settings: boolean,
    },
}
export default function AddAdmin() {
    const initialValues: AddAdminValues = {
        name: "",
        password: "",
        type: "observer",
        workingHours: {
            start: "",
            end: "",
        },
        permissions: {
            super: false,
            charts: false,
            ads: { all: false, primary: false, subscription: false },
            users: { all: false, advertisers: false, customers: false },
            categories: { primary: false, subscription: false, region: false },
            requests: { attestation: false, category: false },
            contact: { inquiries: false, issues: false, suggestions: false },
            reports: { chats: false, products: false },
            banlist: { chats: false, products: false },
            admins: false,
            settings: false,
        },
    };
    const { t } = useTranslation();
    const breadcrumbLinks = [{ label: t('admins.label'), path: '/admins' }]
    const navigate = useNavigate();
    const back = () => navigate(-1)
    const handleAddAdminSubmit = async (
        values: AddAdminValues,
        { setSubmitting }: FormikHelpers<AddAdminValues>) => {
        try {
            setSubmitting(true);
            const res = await axiosInstance.post(`/api/admins/login`, values);
            console.log(res.data.data);
            localStorage.setItem("token", res.data.data.token);
            navigate(`/`)
        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.message);
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <>
            <div className="flex justify-between">
                <Breadcrumb pageName={t('admins.title-add')} breadcrumbLinks={breadcrumbLinks} />
                <RiDeleteBin6Line className="text-3xl text-Input-TextRed" role="button" onClick={back} />
            </div>
            <Formik
                initialValues={initialValues}
                onSubmit={handleAddAdminSubmit}
            >
                {({ isSubmitting }: FormikProps<AddAdminValues>) => (
                    <Form>
                        
                    </Form>
                )}
            </Formik>
        </>
    )
}

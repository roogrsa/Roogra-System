import { RiDeleteBin6Line } from "react-icons/ri";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field
} from 'formik';
import axiosInstance from "../../axiosConfig/instanc";
import toast from "react-hot-toast";
import InputText from "../../components/form/InputText";
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
    const { t } = useTranslation();
    const validationSchema = yup.object().shape({
        name: yup.string().required(t('validation.required')).min(3, t('validation.min', { min: 3 })),
        password: yup.string().required(t('validation.required')).min(8, t('validation.min', { min: 8 })),
        workingHours: yup.object().shape({
            start: yup.string().required(t('validation.required')),
            end: yup.string().required(t('validation.required')),
        }),
        permissions: yup.object().shape({
            super: yup.boolean(),
            charts: yup.boolean(),
            ads: yup.object().shape({
                all: yup.boolean(),
                primary: yup.boolean(),
                subscription: yup.boolean(),
            }),
            users: yup.object().shape({
                all: yup.boolean(),
                advertisers: yup.boolean(),
                customers: yup.boolean(),
            }),
            categories: yup.object().shape({
                primary: yup.boolean(),
                subscription: yup.boolean(),
                region: yup.boolean(),
            }),
            requests: yup.object().shape({
                attestation: yup.boolean(),
                category: yup.boolean(),
            }),
            contact: yup.object().shape({
                inquiries: yup.boolean(),
                issues: yup.boolean(),
                suggestions: yup.boolean(),
            }),
            reports: yup.object().shape({
                chats: yup.boolean(),
                products: yup.boolean(),
            }),
            banlist: yup.object().shape({
                chats: yup.boolean(),
                products: yup.boolean(),
            }),
            admins: yup.boolean(),
            settings: yup.boolean(),
        }),
    });

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
                validationSchema={validationSchema}
                onSubmit={handleAddAdminSubmit}
            >
                {({ isSubmitting }: FormikProps<AddAdminValues>) => (
                    <Form>
                        <InputText type={`text`} name={`name`} label={t('admins.form.name')} />
                        {/* <label className="custom-radio">
                            <input type="radio" name="radio-group" />
                            <span className="radiomark"></span>
                            Radio Label
                        </label>
                        <label className="custom-checkbox">
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                            Checkbox Label
                        </label> */}

                    </Form>
                )}
            </Formik>
        </>
    )
}

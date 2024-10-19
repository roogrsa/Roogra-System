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
import Checkbox from "../../components/form/Checkbox";
import SelectLevel from "../../components/form/SelectLevel";
import SelectTime from "../../components/form/SelectTime";
import { MdUploadFile } from "react-icons/md";

interface AddAdminValues {
    email: string,
    phone: string,
    username: string,
    name: string,
    password: string,
    type: string,
    workingHours: {
        start: string,
        end: string,
    },
    permissions: {
        super: boolean,
        charts: boolean,
        admins: boolean,
        settings: boolean,
        ads: { all: boolean, primary: boolean, subscription: boolean },
        users: { all: boolean, advertisers: boolean, customers: boolean },
        categories: { primary: boolean, subscription: boolean, region: boolean },
        requests: { attestation: boolean, category: boolean },
        contact: { inquiries: boolean, issues: boolean, suggestions: boolean },
        reports: { chats: boolean, products: boolean },
        banlist: { chats: boolean, products: boolean },
    },
}
export default function AddAdmin() {
    const { t } = useTranslation();
    const validationSchema = yup.object().shape({
        name: yup.string().required(t('admins.form.nameError')),
        password: yup.string().required(t('admins.form.PasswordError')),
        email: yup.string().required(t('admins.form.emailError')),
        phone: yup.string().required(t('admins.form.phoneError')),
        username: yup.string().required(t('admins.form.userNameError')),
        type: yup.string().required(t('admins.form.levelError')),
        // workingHours: yup.object().shape({
        //     start: yup.string().required(t('validation.required')),
        //     end: yup.string().required(t('validation.required')),
        // }),
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
        email: "",
        phone: "",
        username: "",
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
            admins: false,
            settings: false,
            ads: { all: false, primary: false, subscription: false },
            users: { all: false, advertisers: false, customers: false },
            categories: { primary: false, subscription: false, region: false },
            requests: { attestation: false, category: false },
            contact: { inquiries: false, issues: false, suggestions: false },
            reports: { chats: false, products: false },
            banlist: { chats: false, products: false },
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
            const res = await axiosInstance.post(`/api/admins`, values);
            console.log(res);
            toast.success(`admin successfully submitted`);
        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.message);
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <>
            <div className="flex justify-between md:mb-20">
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
                        <div className="flex justify-between md:mb-6">
                            <InputText type={`text`} name={`username`} label={t('admins.form.userName')} />
                            <InputText type={`text`} name={`name`} label={t('admins.form.name')} />
                            <InputText type={`email`} name={`email`} label={t('admins.form.email')} />
                            <InputText type={`password`} name={`password`} label={t('admins.form.Password')} />
                        </div>
                        <div className="flex justify-between md:mb-16">
                            <InputText type={`text`} name={`phone`} label={t('admins.form.phone')} />
                            <SelectLevel name={`type`} />
                            <SelectTime name={`workingHours.start`} label={t('admins.form.from')} />
                            <SelectTime name={`workingHours.end`} label={t('admins.form.to')} />
                        </div>
                        <div className="flex justify-between md:mb-16">
                            <div>
                                <div className="mb-4 font-bold text-lg">{t('admins.form.permissions')}</div>
                                <div>
                                    <Checkbox value={`true`} name={`permissions.super`} label={t('admins.form.super')} />
                                    <Checkbox value={`true`} name={`permissions.admins`} label={t('admins.form.admins')} />
                                    <Checkbox value={`true`} name={`permissions.settings`} label={t('admins.form.settings')} />
                                    <Checkbox value={`true`} name={`permissions.Charts`} label={t('admins.form.Charts')} />
                                </div>
                            </div>
                            <div>
                                <div className="mb-4 font-bold text-lg" >{t('admins.form.advertisments')}</div>
                                <div>
                                    <Checkbox value={`true`} name={`permissions.ads.all`} label={t('admins.form.all')} />
                                    <Checkbox value={`true`} name={`permissions.ads.primary`} label={t('admins.form.primary')} />
                                    <Checkbox value={`true`} name={`permissions.ads.subscription`} label={t('admins.form.subscription')} />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between md:mb-16">
                            <div>
                                <div className="mb-4 font-bold text-lg">{t('admins.form.users')}</div>
                                <div>
                                    <Checkbox value={`true`} name={`permissions.users.all`} label={t('admins.form.all')} />
                                    <Checkbox value={`true`} name={`permissions.users.advertisers`} label={t('admins.form.advertisers')} />
                                    <Checkbox value={`true`} name={`permissions.users.customers`} label={t('admins.form.customers')} />
                                </div>
                            </div>
                            <div>
                                <div className="mb-4 font-bold text-lg" >{t('admins.form.categories')}</div>
                                <div>
                                    <Checkbox value={`true`} name={`permissions.categories.primary`} label={t('admins.form.primary')} />
                                    <Checkbox value={`true`} name={`permissions.categories.subscription`} label={t('admins.form.subscription')} />
                                    <Checkbox value={`true`} name={`permissions.categories.region`} label={t('admins.form.region')} />
                                </div>
                            </div>
                            <div>
                                <div className="mb-4 font-bold text-lg" >{t('admins.form.support')}</div>
                                <div>
                                    <Checkbox value={`true`} name={`permissions.contact.inquiries`} label={t('admins.form.inquiries')} />
                                    <Checkbox value={`true`} name={`permissions.contact.issues`} label={t('admins.form.issues')} />
                                    <Checkbox value={`true`} name={`permissions.contact.suggestions`} label={t('admins.form.suggestions')} />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between md:mb-16">
                            <div>
                                <div className="mb-4 font-bold text-lg">{t('admins.form.requests')}</div>
                                <div>
                                    <Checkbox value={`true`} name={`permissions.requests.attestation`} label={t('admins.form.attestation')} />
                                    <Checkbox value={`true`} name={`permissions.requests.category`} label={t('admins.form.category')} />
                                </div>
                            </div>
                            <div>
                                <div className="mb-4 font-bold text-lg" >{t('admins.form.reports')}</div>
                                <div>
                                    <Checkbox value={`true`} name={`permissions.reports.chats`} label={t('admins.form.chats')} />
                                    <Checkbox value={`true`} name={`permissions.reports.products`} label={t('admins.form.products')} />
                                </div>
                            </div>
                            <div className="w-[25%]">
                                <div className="mb-4 font-bold text-lg" >{t('admins.form.banlist')}</div>
                                <div>
                                    <Checkbox value={`true`} name={`permissions.banlist.chats`} label={t('admins.form.users')} />
                                    <Checkbox value={`true`} name={`permissions.banlist.products`} label={t('admins.form.products')} />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" disabled={isSubmitting}
                                className="text-3xl bg-SaveIconBg text-white rounded-md p-2"><MdUploadFile /></button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

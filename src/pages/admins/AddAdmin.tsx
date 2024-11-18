import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { Formik, FormikHelpers, FormikProps, Form } from 'formik';
import axiosInstance from '../../axiosConfig/instanc';
import InputText from '../../components/form/InputText';
import SelectLevel from '../../components/form/SelectLevel';
import SelectTime from '../../components/form/SelectTime';
import CheckboxGroup from './CheckboxGroup';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

export interface CheckboxItem {
  isChecked: boolean;
  label: string;
  value: string;
  name: string;
}
interface AddAdminValues {
  email: string;
  phone: string;
  username: string;
  name: string;
  password: string;
  type: string;
  start_working_hour: string;
  finish_working_hour: string;
  permissions: {
    super: number;
    charts: number;
    admins: number;
    settings: number;
    ads: { all: number; primary: number; subscription: number };
    users: { all: number; advertisers: number; customers: number };
    categories: { primary: number; subscription: number; region: number };
    requests: { attestation: number; category: number };
    contact: { inquiries: number; issues: number; suggestions: number };
    reports: { chats: number; products: number };
    banlist: { chats: number; products: number };
  };
}
interface Admin {
  id: number;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  start_working_hour: string;
  finish_working_hour: string;
  group_id: string;
  permissions: {
    super: number;
    charts: number;
    admins: number;
    settings: number;
    ads: { all: number; primary: number; subscription: number };
    users: { all: number; advertisers: number; customers: number };
    categories: { primary: number; subscription: number; region: number };
    requests: { attestation: number; category: number };
    contact: { inquiries: number; issues: number; suggestions: number };
    reports: { chats: number; products: number };
    banlist: { chats: number; products: number };
  };
}


export default function AddAdmin() {
  const { t } = useTranslation();
  const { adminId } = useParams();
  console.log(adminId);

  const [loggedValues, setLoggedValues] = useState<string>('');
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [permissions, setpermissions] = useState({
    super: admin?.permissions?.super || 0,
    charts: admin?.permissions?.charts || 0,
    admins: admin?.permissions?.admins || 0,
    settings: admin?.permissions?.settings || 0,
    ads: { all: admin?.permissions?.ads?.all || 0, primary: admin?.permissions?.ads?.primary || 0, subscription: admin?.permissions?.ads?.subscription || 0 },
    users: { all: admin?.permissions?.users?.all || 0, advertisers: admin?.permissions?.users?.advertisers || 0, customers: admin?.permissions?.users?.customers || 0 },
    categories: { primary: admin?.permissions?.categories?.primary || 0, subscription: admin?.permissions?.categories?.subscription || 0, region: admin?.permissions?.categories?.region || 0 },
    requests: { attestation: admin?.permissions?.requests?.attestation || 0, category: admin?.permissions?.requests?.category || 0 },
    contact: { inquiries: admin?.permissions?.contact?.inquiries || 0, issues: admin?.permissions?.contact?.issues || 0, suggestions: admin?.permissions?.contact?.suggestions || 0 },
    reports: { chats: admin?.permissions?.reports?.chats || 0, products: admin?.permissions?.reports?.products || 0 },
    banlist: { chats: admin?.permissions?.banlist?.chats || 0, products: admin?.permissions?.banlist?.products || 0 },
  });
  useEffect(() => {
    const displayAdmin = async () => {
      try {
        const res = await axiosInstance.get(`/api/admins/${adminId}`);
        setAdmin(res.data.data);
      } catch (error: any) {
        console.error(error);
      }
    }
    if (adminId) {
      displayAdmin()
    }
  }, []);
  const validationSchema = yup.object().shape({
    name: yup.string().required(t('admins.form.nameError')),
    password: yup.string().required(t('admins.form.PasswordError')),
    email: yup.string().required(t('admins.form.emailError')),
    phone: yup.string().required(t('admins.form.phoneError')),
    username: yup.string().required(t('admins.form.userNameError')),
    type: yup.string().required(t('admins.form.levelError')),
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
  console.log(admin);

  const initialValues: AddAdminValues = {
    email: admin?.email || '',
    phone: admin?.phone || '',
    username: admin?.last_name || '',
    name: admin?.first_name || '',
    password: '',
    type: admin?.group_id || '2',
    start_working_hour: admin?.start_working_hour || '',
    finish_working_hour: admin?.finish_working_hour || '',
    permissions: admin?.permissions || permissions,
  };
  console.log('initialValues',initialValues);

  const logValues = (obj: any): string => {
    let result = '';
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        result += logValues(obj[key]);
      } else {
        if (typeof obj[key] === 'boolean') {
          result += obj[key] ? '1' : '0';
        } else {
          result += `${obj[key]}`;
        }
      }
    }
    return result;
  };
  const breadcrumbLinks = [{ label: t('admins.label'), path: '/admins' }]
  const navigate = useNavigate();
  const handleAddAdminSubmit = async (
    values: AddAdminValues,
    { setSubmitting }: FormikHelpers<AddAdminValues>,
  ) => {
    try {
      setSubmitting(true);
      if (adminId) {
        const res = await axiosInstance.put(`/api/admins/${adminId}`, {
          ...values,
          permissions: loggedValues,
        });
        console.log(res);
        toast.success(`admin updated successfully`);
        navigate(`/admins`);
      } else if (!adminId) {
        const res = await axiosInstance.post(`/api/admins`, {
          ...values,
          permissions: loggedValues,
        });
        console.log(res);
        toast.success(`admin successfully submitted`);
      }
    } catch (error: any) {
      console.error(error);
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    } finally {
      setSubmitting(false);
    }
  };
  const [checkAdvertisments, setCheckAdvertisments] = useState<CheckboxItem[]>([
    {
      isChecked: false,
      label: 'admins.form.all',
      value: '1',
      name: `permissions.ads.all`,
    },
    {
      isChecked: false,
      label: 'admins.form.primary',
      value: '1',
      name: `permissions.ads.primary`,
    },
    {
      isChecked: false,
      label: 'admins.form.subscription',
      value: '1',
      name: `permissions.ads.subscription`,
    },
  ]);
  const [checkPermissions, setCheckPermissions] = useState<CheckboxItem[]>([
    {
      isChecked: false,
      label: 'admins.form.super',
      value: '1',
      name: `permissions.super`,
    },
    {
      isChecked: false,
      label: 'admins.form.admins',
      value: '1',
      name: `permissions.admins`,
    },
    {
      isChecked: false,
      label: 'admins.form.settings',
      value: '1',
      name: `permissions.settings`,
    },
    {
      isChecked: false,
      label: 'admins.form.charts',
      value: '1',
      name: `permissions.charts`,
    },
  ]);
  const [checkUsers, setCheckUsers] = useState<CheckboxItem[]>([
    {
      isChecked: false,
      label: 'admins.form.all',
      value: '1',
      name: `permissions.users.all`,
    },
    {
      isChecked: false,
      label: 'admins.form.advertisers',
      value: '1',
      name: `permissions.users.advertisers`,
    },
    {
      isChecked: false,
      label: 'admins.form.customers',
      value: '1',
      name: `permissions.users.customers`,
    },
  ]);
  const [checkCategories, setCheckCategories] = useState<CheckboxItem[]>([
    {
      isChecked: false,
      label: 'admins.form.primary',
      value: '1',
      name: `permissions.categories.primary`,
    },
    {
      isChecked: false,
      label: 'admins.form.subscription',
      value: '1',
      name: `permissions.categories.subscription`,
    },
    {
      isChecked: false,
      label: 'admins.form.region',
      value: '1',
      name: `permissions.categories.region`,
    },
  ]);
  const [checkSupport, setCheckSupport] = useState<CheckboxItem[]>([
    {
      isChecked: false,
      label: 'admins.form.inquiries',
      value: '1',
      name: `permissions.contact.inquiries`,
    },
    {
      isChecked: false,
      label: 'admins.form.issues',
      value: '1',
      name: `permissions.contact.issues`,
    },
    {
      isChecked: false,
      label: 'admins.form.suggestions',
      value: '1',
      name: `permissions.contact.suggestions`,
    },
  ]);
  const [checkRequests, setCheckRequests] = useState<CheckboxItem[]>([
    {
      isChecked: false,
      label: 'admins.form.attestation',
      value: '1',
      name: `permissions.requests.attestation`,
    },
    {
      isChecked: false,
      label: 'admins.form.category',
      value: '1',
      name: `permissions.requests.category`,
    },
  ]);
  const [checkReports, setCheckReports] = useState<CheckboxItem[]>([
    {
      isChecked: false,
      label: 'admins.form.chats',
      value: '1',
      name: `permissions.reports.chats`,
    },
    {
      isChecked: false,
      label: 'admins.form.products',
      value: '1',
      name: `permissions.reports.products`,
    },
  ]);
  const [checkBanlist, setCheckBanlist] = useState<CheckboxItem[]>([
    {
      isChecked: false,
      label: 'admins.form.users',
      value: '1',
      name: `permissions.banlist.chats`,
    },
    {
      isChecked: false,
      label: 'admins.form.products',
      value: '1',
      name: `permissions.banlist.products`,
    },
  ]);
  return (
    <div>
      <Breadcrumb pageName={t('admins.edit')} breadcrumbLinks={breadcrumbLinks} />
      <Formik
        initialValues={initialValues}
        validationSchema={!adminId&&validationSchema}
        onSubmit={handleAddAdminSubmit}
        enableReinitialize
      >
        {({
          isSubmitting,
          values,
          setFieldValue,
        }: FormikProps<AddAdminValues>) => {
          setpermissions(values.permissions);
          const result = logValues(permissions);
          setLoggedValues(result);
          return (
            <Form className="bg-secondaryBG-light dark:bg-secondaryBG-dark p-6 rounded-sm">
              <div className="md:flex justify-between md:mb-6">
                <SelectLevel name={`type`} />
                <InputText
                  type={`text`}
                  name={`name`}
                  label={t('admins.form.name')}
                />
                <InputText
                  type={`text`}
                  name={`username`}
                  label={t('admins.form.userName')}
                />
                <InputText
                  type={`text`}
                  name={`phone`}
                  label={t('admins.form.phone')}
                />
              </div>
              <div className="md:flex justify-between md:mb-16">
                <InputText
                  type={`email`}
                  name={`email`}
                  label={t('admins.form.email')}
                />
                {!adminId &&
                  <InputText
                    type={`password`}
                    name={`password`}
                    label={t('admins.form.Password')}
                  />
                }
                <SelectTime
                  name={`start_working_hour`}
                  label={t('admins.form.from')}
                />
                <SelectTime
                  name={`finish_working_hour`}
                  label={t('admins.form.to')}
                />
              </div>
              <div className="md:flex justify-between md:mb-16">
                <CheckboxGroup
                  setFieldValue={setFieldValue}
                  checks={checkAdvertisments}
                  setChecks={setCheckAdvertisments}
                  label={t('admins.form.advertisments')}
                />
                <CheckboxGroup
                  setFieldValue={setFieldValue}
                  checks={checkUsers}
                  setChecks={setCheckUsers}
                  label={t('admins.form.users')}
                />
                <CheckboxGroup
                  setFieldValue={setFieldValue}
                  checks={checkRequests}
                  setChecks={setCheckRequests}
                  label={t('admins.form.requests')}
                />
              </div>
              <div className="md:flex justify-between md:mb-16">
                <CheckboxGroup
                  setFieldValue={setFieldValue}
                  checks={checkSupport}
                  setChecks={setCheckSupport}
                  label={t('admins.form.support')}
                />
                <CheckboxGroup
                  setFieldValue={setFieldValue}
                  checks={checkReports}
                  setChecks={setCheckReports}
                  label={t('admins.form.reports')}
                />
                <CheckboxGroup
                  setFieldValue={setFieldValue}
                  checks={checkBanlist}
                  setChecks={setCheckBanlist}
                  label={t('admins.form.banlist')}
                />
              </div>
              <div className="md:flex justify-between md:mb-16">
                <CheckboxGroup
                  setFieldValue={setFieldValue}
                  checks={checkPermissions}
                  setChecks={setCheckPermissions}
                  label={t('admins.form.permissions')}
                />
                <CheckboxGroup
                  setFieldValue={setFieldValue}
                  checks={checkCategories}
                  setChecks={setCheckCategories}
                  label={t('admins.form.categories')}
                />
              </div>
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-3xl bg-SaveIconBg text-white rounded-md p-2"
                >
                  <img src="./../../../save.svg" alt="" />
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

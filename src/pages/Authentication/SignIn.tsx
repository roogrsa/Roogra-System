import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { Field, Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import axiosInstance from '../../axiosConfig/instanc';
import { useDispatch } from 'react-redux';
import { setIsLoggedin } from '../../store/slices/auth';
import { FaAsterisk } from "react-icons/fa";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field
} from 'formik';
interface LoginValues {
  email: string;
  password: string;
}
const SignIn: React.FC = () => {
  const { t } = useTranslation();
  const initialValues: LoginValues = { email: '', password: '' };
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleRegisterSubmit = async (
    values: LoginValues,
    { setSubmitting }: FormikHelpers<LoginValues>) => {
    try {
      setSubmitting(true);
      const res = await axiosInstance.post(`/api/admins/login`, values);
      console.log(res.data.data);
      localStorage.setItem("token", res.data.data.token);
      navigate(`/`)
      dispatch(setIsLoggedin())
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <div className="rounded-sm  bg-white dark:border-strokedark dark:bg-boxdark">
        <div className="flex justify-center">
          <div className="w-full xl:w-[35vw] md:w-[35vw]">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h1 className="mb-[5rem] text-[] font-bold textColor dark:text-white sm:text-title-5xl text-center">
                {t('login.login')}
              </h1>
              <Formik
                initialValues={initialValues}
                onSubmit={handleRegisterSubmit}
              >
                {({ isSubmitting }: FormikProps<LoginValues>) => (
                  <Form>
                    <div className="mb-4">
                      <label className="mb-2.5 font-medium text-black dark:text-white flex">
                        {t('login.name')} <span><FaAsterisk className='text-[8px] text-[#E02828]' /></span>
                      </label>
                      <div className="">
                        <Field
                          type="email"
                          placeholder={t('login.name')}
                          name="email"
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="mb-2.5 flex font-medium text-black dark:text-white">
                        {t('login.password')} <FaAsterisk className='text-[8px] text-[#E02828]' />
                      </label>
                      <div className="">
                        <Field
                          type="password"
                          name="password"
                          placeholder={t('login.password')}
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />

                      </div>
                    </div>
                    <div className="mb-5">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full cursor-pointer rounded-lg bgColor p-4 text-white transition hover:bg-opacity-90"
                      > {t('login.go')}</button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;

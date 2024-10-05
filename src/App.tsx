import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import i18next from 'i18next';
import arTranslation from "./../src/locales/ar/translation.json";
import enTranslation from "./../src/locales/en/translation.json";
import { I18nextProvider } from 'react-i18next';
import {  useSelector } from 'react-redux';
import { selectLanguage } from './store/slices/language';
import { checkIsLoggedin } from './store/slices/auth';

i18next.init({
  interpolation: { escapeValue: false },
  lng: 'ar',
  resources: {
    ar: { translation: arTranslation },
    en: { translation: enTranslation },
  },
});

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const language = useSelector(selectLanguage)
  const login = useSelector(checkIsLoggedin)
  console.log(login);
  console.log(language);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer); // Clean up on unmount
  }, []);

  const routes = [
    { path: '/', element: <ECommerce />, title: "eCommerce Dashboard" },
    { path: '/calendar', element: <Calendar />, title: "Calendar" },
    { path: '/profile', element: <Profile />, title: "Profile" },
    { path: '/forms/form-elements', element: <FormElements />, title: "Form Elements" },
    { path: '/forms/form-layout', element: <FormLayout />, title: "Form Layout" },
    { path: '/tables', element: <Tables />, title: "Tables" },
    { path: '/settings', element: <Settings />, title: "Settings" },
    { path: '/chart', element: <Chart />, title: "Basic Chart" },
    { path: '/ui/alerts', element: <Alerts />, title: "Alerts" },
    { path: '/ui/buttons', element: <Buttons />, title: "Buttons" },
    { path: '/auth/signin', element: <SignIn />, title: "Signin" },
    { path: '/auth/signup', element: <SignUp />, title: "Signup" },
  ];

  return loading ? (
    <Loader />
  ) : (
    <I18nextProvider i18n={i18next}>
        <div dir={language=='ar'?'rtl':'ltr'}>
          <DefaultLayout>
            <Routes>
              {routes.map(({ path, element, title }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    <>
                      <PageTitle title={`${title} | TailAdmin - Tailwind CSS Admin Dashboard Template`} />
                      {element}
                    </>
                  }
                />
              ))}
            </Routes>
          </DefaultLayout>
        </div>
      </I18nextProvider>
  );
};

export default App;
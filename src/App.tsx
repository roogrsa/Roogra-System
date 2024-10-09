import { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  useLocation,
} from 'react-router-dom';

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
import arTranslation from './../src/locales/ar/translation.json';
import enTranslation from './../src/locales/en/translation.json';
import { I18nextProvider } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectLanguage } from './store/slices/language';
import { checkIsLoggedin } from './store/slices/auth';
import LoginLayout from './layout/LoginLayout';
import Guard from './components/guards/Guards';
import Home from './pages/home/home';
import Users from './pages/users/users';
import Advertiser from './pages/users/advertiser';
import Customer from './pages/users/Customer';

i18next.init({
  interpolation: { escapeValue: false },
  lng: 'ar',
  resources: {
    ar: { translation: arTranslation },
    en: { translation: enTranslation },
  },
});
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Guard>
        <DefaultLayout />
      </Guard>
    ),
    children: [
      {
        path: '/',
        element: (
          <Guard>
            <ECommerce />
          </Guard>
        ),
      },
      // { path: 'calendar', element: <Guard><Calendar /> </Guard>  },
      // { path: 'profile', element: <Guard><Profile /> </Guard> },
      // { path: 'tables', element: <Guard> <Tables /> </Guard>},
      // { path: 'settings', element: <Guard> <Settings /> </Guard>},
      {
        path: 'chart',
        element: (
          <Guard>
            <Chart />
          </Guard>
        ),
      },
      {
        path: 'home',
        element: (
          <Guard>
            <Home />
          </Guard>
        ),
      },
      {
        path: 'customer',
        element: (
          <Guard>
            <Customer />
          </Guard>
        ),
      },
      {
        path: 'advertiser',
        element: (
          <Guard>
            <Advertiser />
          </Guard>
        ),
      },
      {
        path: 'users',
        element: (
          <Guard>
            <Users />
          </Guard>
        ),
        // children: [
        //   {
        //     path: '/advertiser',
        //     element: (
        //       <Guard>
        //         <Advertiser />
        //       </Guard>
        //     ),
        //   },
        //   {
        //     path: '/customer',
        //     element: (
        //       <Guard>
        //         <Customer />
        //       </Guard>
        //     ),
        //   },
        // ],
      },
    ],
  },
  {
    path: '/',
    element: <LoginLayout />,
    children: [
      { path: '/auth/login', element: <SignIn /> },
      { path: '/auth/signup', element: <SignUp /> },
    ],
  },
]);
const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const language = useSelector(selectLanguage);

  console.log(language);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <I18nextProvider i18n={i18next}>
      <div
        dir={language == 'ar' ? 'rtl' : 'ltr'}
        className="bg-[#F9FAFF] dark:bg-[#14141A]"
      >
        <RouterProvider router={router} />
      </div>
    </I18nextProvider>
  );
};

export default App;

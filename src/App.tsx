import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Loader from './common/Loader';
import DefaultLayout from './layout/DefaultLayout';
import Guard from './components/guards/Guards';
import ECommerce from './pages/Dashboard/ECommerce';
import Home from './pages/home/home';
import Users from './pages/users/users';
import Advertiser from './pages/users/advertiser';
import Customer from './pages/users/Customer';
import AboutUs from './pages/aboutUs/AboutUs';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import LoginLayout from './layout/LoginLayout';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import arTranslation from './../src/locales/ar/translation.json';
import enTranslation from './../src/locales/en/translation.json';
import { useSelector } from 'react-redux';
import { selectLanguage } from './store/slices/language';
import Ads from './pages/advertisements/advertisements';
import Products from './pages/products/products';
import PrdDetials from './pages/products/PrdDetials';
import Profile from './pages/users/Profile';
import CategorySubscription from './pages/category_subscription/CategorySubscription';
import Admins from './pages/admins/Admins';
import AddAdmin from './pages/admins/AddAdmin';

// Initialize i18next
i18next.init({
  interpolation: { escapeValue: false },
  lng: 'ar', // Default language
  resources: {
    ar: { translation: arTranslation },
    en: { translation: enTranslation },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginLayout />,
    children: [
      { path: '/about-us', element: <AboutUs /> },
      { path: '/auth/login', element: <SignIn /> },
      { path: '/auth/signup', element: <SignUp /> },
    ],
  },
  {
    path: '/',
    element: (
      <Guard>
        <DefaultLayout />
      </Guard>
    ),
    children: [
      {
        index: true,
        element: (
          <Guard>
            <Home />
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
      },
      {
        path: 'profile/:id',
        element: (
          <Guard>
            <Profile />
          </Guard>
        ),
      },
      {
        path: 'users/customer',
        element: (
          <Guard>
            <Customer />
          </Guard>
        ),
      },
      {
        path: 'users/advertiser',
        element: (
          <Guard>
            <Advertiser />
          </Guard>
        ),
      },
      {
        path: 'ads',
        element: (
          <Guard>
            <Ads />
          </Guard>
        ),
      },
      {
        path: 'subscription',
        element: (
          <Guard>
            <CategorySubscription />
          </Guard>
        ),
      },
      {
        path: 'products',
        element: (
          <Guard>
            <Products />
          </Guard>
        ),
      },
      {
        // Make the path relative, as it's nested under 'products'
        path: '/products/:id',
        element: (
          <Guard>
            <PrdDetials />
          </Guard>
        ),
      },
      {
        path: 'admins',
        element: (
          <Guard>
            <Admins />
          </Guard>
        ),
      },
      {
        path: 'admins/add-admin',
        element: (
          <Guard>
            <AddAdmin />
          </Guard>
        ),
      },
    ],
  },
]);

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const language = useSelector(selectLanguage);
  i18next.init({
    interpolation: { escapeValue: false },
    lng: language,
    resources: {
      ar: { translation: arTranslation },
      en: { translation: enTranslation },
    },
  });
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <I18nextProvider i18n={i18next}>
      <div
        dir={language === 'ar' ? 'rtl' : 'ltr'}
        className="bg-primaryBG-light dark:bg-primaryBG-dark text-text-light dark:text-text-dark"
      >
        <RouterProvider router={router} />
      </div>
    </I18nextProvider>
  );
};

export default App;

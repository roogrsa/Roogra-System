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
import Unauthorized from './pages/unauthorized/Unauthorized';
import ProtectedRoute from './components/guards/ProtectedRoute';
import ProductsMain from './pages/products/ProductsMain';
import ProductsSubscription from './pages/products/ProductsSubscription';
const storedPermissions: any =
  localStorage.getItem('permissions') || '0000000000000000000000';

// console.log(storedPermissions);
// super: permissions[0],
// charts: permissions[1],
// admins: permissions[2],
// settings: permissions[3],
// ads: { all: permissions[4], primary: permissions[5], subscription: permissions[6] },
// users: { all: permissions[7], advertisers: permissions[8], customers: permissions[9] },
// categories: { primary: permissions[10], subscription: permissions[11], region: permissions[12] },
// requests: { attestation: permissions[13], category: permissions[14] },
// contact: { inquiries: permissions[15], issues: permissions[16], suggestions: permissions[17] },
// reports: { chats: permissions[18], products: permissions[19] },
// banlist: { chats: permissions[20], products: permissions[21] },
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
            <ProtectedRoute
              component={Home}
              hasPermission={storedPermissions[1] == 1}
            />
          </Guard>
        ),
      },
      // {
      //   index: true,
      //   element: (
      //     <Guard>
      //       <Home />
      //     </Guard>
      //   ),
      // },
      {
        path: 'users',
        element: (
          <Guard>
            <ProtectedRoute
              component={Users}
              hasPermission={storedPermissions[7] == 1}
            />
          </Guard>
        ),
      },
      // {
      //   path: 'users',
      //   element: (
      //     <Guard>
      //       <Users />
      //     </Guard>
      //   ),
      // },
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
            <ProtectedRoute
              component={Customer}
              hasPermission={storedPermissions[9] == 1}
            />
          </Guard>
        ),
      },
      // {
      //   path: 'users/customer',
      //   element: (
      //     <Guard>
      //       <Customer />
      //     </Guard>
      //   ),
      // },
      {
        path: 'users/advertiser',
        element: (
          <Guard>
            <ProtectedRoute
              component={Advertiser}
              hasPermission={storedPermissions[8] == 1}
            />
          </Guard>
        ),
      },
      // {
      //   path: 'users/advertiser',
      //   element: (
      //     <Guard>
      //       <Advertiser />
      //     </Guard>
      //   ),
      // },
      {
        path: 'ads',
        element: (
          <Guard>
            <ProtectedRoute
              component={Ads}
              hasPermission={storedPermissions[4] == 1}
            />
          </Guard>
        ),
      },
      // {
      //   path: 'ads',
      //   element: (
      //     <Guard>
      //       <Ads />
      //     </Guard>
      //   ),
      // },
      {
        path: 'subscription',
        element: (
          <Guard>
            <ProtectedRoute
              component={CategorySubscription}
              hasPermission={storedPermissions[13] == 1}
            />
          </Guard>
        ),
      },
      // {
      //   path: 'subscription',
      //   element: (
      //     <Guard>
      //       <CategorySubscription />
      //     </Guard>
      //   ),
      // },
      {
        // check it
        path: 'products',
        element: (
          <Guard>
            <ProtectedRoute
              component={Products}
              hasPermission={storedPermissions[5] == 1}
            />
          </Guard>
        ),
      },
      {
        // check it
        path: 'products/main',
        element: (
          <Guard>
            <ProtectedRoute
              component={ProductsMain}
              hasPermission={storedPermissions[5] == 1}
            />
          </Guard>
        ),
      },
      {
        // check it
        path: 'products/subscriptions',
        element: (
          <Guard>
            <ProtectedRoute
              component={ProductsSubscription}
              hasPermission={storedPermissions[5] == 1}
            />
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
      // {
      //   path: 'admins',
      //   element: (
      //     <Guard>
      //       <Admins />
      //     </Guard>
      //   ),
      // },
      // {
      //   path: 'admins/add-admin',
      //   element: (
      //     <Guard>
      //       <AddAdmin />
      //     </Guard>
      //   ),
      // },

      {
        path: 'admins',
        element: (
          <Guard>
            <ProtectedRoute
              component={Admins}
              hasPermission={storedPermissions[2] == 1}
            />
          </Guard>
        ),
      },
      {
        path: 'admins/add-admin',
        element: (
          <Guard>
            <ProtectedRoute
              component={AddAdmin}
              hasPermission={storedPermissions[2] == 1}
            />
          </Guard>
        ),
      },

      {
        path: 'unauthorized',
        element: (
          <Guard>
            <Unauthorized />
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

import { Link, useNavigate } from 'react-router-dom';
import DarkModeSwitcher from './DarkModeSwitcher';
import { useSelector } from 'react-redux';
import { selectLanguage } from '../../store/slices/language';
import LanguageSwitcher from './LanguageSwitcher';
import useColorMode from '../../hooks/useColorMode';
import { CiSearch } from 'react-icons/ci';
import { useTranslation } from 'react-i18next';
import DropdownNotification from '../notification/DropdownNotification';
const logoLight = '../../../logo/logoLight.png';
const logoDark = '../../../logo/logoDark.png';

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const { t } = useTranslation();
  const language = useSelector(selectLanguage);
  const [colorMode] = useColorMode();
  const navigate = useNavigate();

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) => {
    if ((event as React.KeyboardEvent).key === "Enter" || event.type === "click") {
      const target = event.target as HTMLInputElement;
      if (target.value.toLowerCase().startsWith('rc-') && target.value.length > 3) {
        const id = target.value.slice(3)
        navigate(`/reports/chat`, { state: { id } });
      } else if (target.value.toLowerCase().startsWith('rt-')) {
        const id = target.value.slice(3)
        navigate(`/reports/product`, { state: { id } });
      } else if (target.value.toLowerCase().startsWith('rq1-')) {
        const id = target.value.slice(4)
        navigate(`/contact-us/inquiries`, { state: { id } });
      } else if (target.value.toLowerCase().startsWith('rq2-') && target.value.length > 4) {
        const id = target.value.slice(4)
        navigate(`/contact-us/issues`, { state: { id } });
      } else if (target.value.toLowerCase().startsWith('rfp-') && target.value.length > 4) {
        const id = target.value.slice(4)
        navigate(`/contact-us/suggestions`, { state: { id } });
      } else if (target.value.toLowerCase().startsWith('rd-') && target.value.length > 3) {
        const id = target.value.slice(3)
        navigate(`/confirm/subscription`, { state: { id } });
      } else if (target.value.toLowerCase().startsWith('rs-') && target.value.length > 3) {
        const id = target.value.slice(3)
        navigate(`/part/subscription`, { state: { id } });
      } else {
        const id = target.value
        navigate('/users', { state: { id } });
      }
    }
  };

  return (
    <header
      dir="ltr"
      className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none"
    >
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!w-full delay-300'
                    }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && 'delay-400 !w-full'
                    }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!w-full delay-500'
                    }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!h-0 !delay-[0]'
                    }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!h-0 !delay-200'
                    }`}
                ></span>
              </span>
            </span>
          </button>
        </div>
        <div className="flex items-center gap-2 2xsm:gap-4">
          <Link to={`/`}>
            <img
              src={colorMode === 'light' ? logoLight : logoDark}
              width={100}
              height={100}
              alt="logo"
            />
          </Link>

          <DarkModeSwitcher />
        </div>
        <div
          className="hidden sm:block"
          dir={language === 'ar' ? 'rtl' : 'ltr'}
        >
          <div className="relative">
            <CiSearch
              className={`absolute top-1/2 -translate-y-1/2 text-header-inputBorder text-2xl font-bold
                  ${language === 'ar' ? 'left-2' : 'right-2'} `}
            />
            <input
              type="search"
              placeholder={t(`header.search`)}
              onKeyDown={(event) => handleSearch(event)}
              className="px-4 py-1 rounded-3xl border-header-inputBorder text-black dark:bg-header-inputDark dark:text-white
                border-2 bg-header-inputLight outline-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <DropdownNotification />
            <LanguageSwitcher />
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;

import DarkModeSwitcher from './DarkModeSwitcher';
import { useDispatch, useSelector } from 'react-redux';
import { selectLanguage, setLanguage } from '../../store/slices/language';
import i18n from '../../i18next';

const LoginHeader = () => {
  const dispatch = useDispatch()
  const language = useSelector(selectLanguage)
  console.log(language);

  const handleChangeLanguage = () => {
    let newLanguage: string = (language == 'en') ? 'ar' : 'en'
    i18n.changeLanguage(newLanguage);
    if (newLanguage === "en") {
      dispatch(setLanguage(newLanguage))
    } else {
      dispatch(setLanguage(newLanguage))
    }
  };
  return (
    <header dir="ltr" className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <DarkModeSwitcher />
          </ul>
        </div>
        <button onClick={() => handleChangeLanguage()}>
          {language === "en" ? "AR" : "EN"}
        </button>
      </div>
    </header>
  );
};

export default LoginHeader;

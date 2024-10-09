import { useEffect } from 'react';
import useColorMode from '../../hooks/useColorMode';
import DarkModeSwitcher from './DarkModeSwitcher';
import LanguageSwitcher from './LanguageSwitcher';
const logoLight = '../../../public/logo/logoLight.png';
const logoDark = '../../../public/logo/logoDark.png';

const LoginHeader = () => {
  const [colorMode, setColorMode] = useColorMode();
  useEffect(() => {
    if (typeof setColorMode === 'function') {
      setColorMode(colorMode === 'light' ? 'dark' : 'light');
    }

  }, []);
  return (
    <>
    <header dir="ltr" className={`sticky top-0 z-999 flex w-full bg-white  drop-shadow-1 dark:bg-[#1E1E26] 
    dark:bg-darkColor dark:drop-shadow-none`}>
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <li className=''>
    <img src={colorMode=== 'light'?logoLight:logoDark} width={100} height={100} alt="" />
            </li>
            <DarkModeSwitcher />
          </ul>
        </div>
        

        <LanguageSwitcher/>
      </div>
    </header>
    </>
  );
};

export default LoginHeader;

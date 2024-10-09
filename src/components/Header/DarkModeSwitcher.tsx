import useColorMode from '../../hooks/useColorMode';
const sun = './../../../public/logo/sun.svg'
const moon = './../../../public/logo/moon.svg'

const DarkModeSwitcher = () => {
  const [colorMode, setColorMode] = useColorMode();

  return (
    <li role='button'
      className={`relative m-0 block h-7.5 w-14`}>
      <span
        onClick={() => {
          if (typeof setColorMode === 'function') {
            setColorMode(colorMode === 'light' ? 'dark' : 'light');
          }
        }}
        className={`absolute top-1/2 left-[3px] flex h-6 w-6 -translate-y-1/2 translate-x-0 items-center justify-center
            rounded-full`}>
        <span className="dark:hidden">
          <img src={moon} alt="dark mode" />
        </span>
        <span className="hidden dark:inline-block">
          <img src={sun} alt="light mode" />

        </span>
      </span>
    </li>
  );
};

export default DarkModeSwitcher;

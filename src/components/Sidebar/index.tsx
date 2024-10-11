import  { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AiFillHome } from 'react-icons/ai';
import {
  PiUsersFill,
  PiUsersThreeFill,
  PiTicketFill,
  PiHeadsetFill,
  PiEnvelopeFill,
  PiGearFineFill,
  PiPowerFill,
  PiChartDonutFill,
} from 'react-icons/pi';
import { FaChevronRight } from 'react-icons/fa';
import { BiSolidCategory } from 'react-icons/bi';
import { MdOutlineBlock } from 'react-icons/md';
import axiosInstance from '../../axiosConfig/instanc';
import { useDispatch } from 'react-redux';
import { setLogout } from '../../store/slices/auth';
interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const { t } = useTranslation();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);
  const logout = async () => {
    try {
      const res = await axiosInstance.get(`/api/admins/logout`);
      console.log(res);
      // navigate(`/auth/login`);
      dispatch(setLogout());
    } catch (error: any) {
      console.error(error);
    }
  };
  return (
    <>
      <aside
        ref={sidebar}
        className={` ${isOpen ? 'w-55' : 'closed'
          } absolute left-0 top-0 z-9999 flex h-screen  flex-col overflow-y-hidden
        duration-300 ease-linear bg-[#1E1E26]  lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between gap-2 px-6 py-4 lg:py-4">
          <button
            className={`absolute bg-[#2E2D3D] top-[1vh] rounded-[10px] p-2 ${isOpen
                ? 'ltr:left-[190px] rtl:right-[175px]'
                : 'ltr:left-[30px] rtl:right-[50px]'
              } rtl:rotate-180 z-50 text-lg transition-all duration-300 text-white`}
            onClick={toggleSidebar}
          >
            <FaChevronRight
              className={`${isOpen ? 'rotate-180' : 'rotate-0'
                } transition-all duration-300`}
            />
          </button>
        </div>
        {/* <!-- SIDEBAR BODY--> */}

        <div className="no-scrollbar bg-[#1E1E26] flex flex-col overflow-y-auto duration-300 ease-linear">
          <nav className="px-4 lg:px-6">
            <div>
              <h2 className="mb-4 ml-4 text-xl font-[400] text-bodydark2">
                {isOpen && 'username'}
              </h2>

              <ul className="mb-6 flex flex-col gap-1.5">
                <li>
                  <NavLink
                    to="/"
                    className={`group relative flex items-center gap-2.5  py-2 px-4 text-[20px] font-[400] text-[#FFFFFF]  duration-300 ease-in-out hover:bg-[#2E2D3D] rounded-[15px] ${(pathname === '/' ||
                        pathname.includes('dashboard')) &&
                      'bg-graydark dark:bg-meta-4'
                      }`}
                  >
                    <PiChartDonutFill className="text-2xl" />
                    {isOpen && t('sidebar.charts')}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/home"
                    className={`group relative flex items-center gap-2.5  py-2 px-4 text-[20px] font-[400] text-[#FFFFFF]
                      duration-300 ease-in-out hover:bg-[#2E2D3D] rounded-[15px] ${pathname.includes('home') && 'bg-graydark dark:bg-meta-4'
                      }`}
                  >
                    <AiFillHome className="text-2xl" />
                    {isOpen && t('sidebar.home')}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/profile"
                    className={`group relative flex items-center gap-2.5  py-2 px-4 text-[20px] font-[400] text-[#FFFFFF]  duration-300 ease-in-out hover:bg-[#2E2D3D] rounded-[15px] ${pathname.includes('profile') &&
                      'bg-graydark dark:bg-meta-4'
                      }`}
                  >
                    <PiUsersFill className="text-2xl" />
                    {isOpen && t('sidebar.users')}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/categories"
                    className={`group relative flex items-center gap-2.5  py-2 px-4 text-[20px] font-[400] text-[#FFFFFF]  duration-300 ease-in-out hover:bg-[#2E2D3D] rounded-[15px] ${pathname.includes('categories') &&
                      'bg-graydark dark:bg-meta-4'
                      }`}
                  >
                    <BiSolidCategory className="text-2xl" />
                    {isOpen && t('sidebar.categories')}
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/tables"
                    className={`group relative flex items-center gap-2.5  py-2 px-4 text-[20px] font-[400] text-[#FFFFFF]  duration-300 ease-in-out hover:bg-[#2E2D3D] rounded-[15px] ${pathname.includes('tables') &&
                      'bg-graydark dark:bg-meta-4'
                      }`}
                  >
                    <PiTicketFill className="text-2xl" />
                    {isOpen && t('sidebar.requests')}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/settings"
                    className={`group relative flex items-center gap-2.5  py-2 px-4 text-[20px] font-[400] text-[#FFFFFF]  duration-300 ease-in-out hover:bg-[#2E2D3D] rounded-[15px] ${pathname.includes('settings') &&
                      'bg-graydark dark:bg-meta-4'
                      }`}
                  >
                    <PiHeadsetFill className="text-2xl" />
                    {isOpen && t('sidebar.support')}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/settings"
                    className={`group relative flex items-center gap-2.5  py-2 px-4 text-[20px] font-[400] text-[#FFFFFF]  duration-300 ease-in-out hover:bg-[#2E2D3D] rounded-[15px] ${pathname.includes('settings') &&
                      'bg-graydark dark:bg-meta-4'
                      }`}
                  >
                    <PiEnvelopeFill className="text-2xl" />
                    {isOpen && t('sidebar.reports')}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/settings"
                    className={`group relative flex items-center gap-2.5  py-2 px-4 text-[20px] font-[400] text-[#FFFFFF]  duration-300 ease-in-out hover:bg-[#2E2D3D] rounded-[15px] ${pathname.includes('settings') &&
                      'bg-graydark dark:bg-meta-4'
                      }`}
                  >
                    <MdOutlineBlock className="text-2xl" />
                    {isOpen && t('sidebar.ban-list')}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/settings"
                    className={`group relative flex items-center gap-2.5  py-2 px-4 text-[20px] font-[400] text-[#FFFFFF]  duration-300 ease-in-out hover:bg-[#2E2D3D] rounded-[15px] ${pathname.includes('settings') &&
                      'bg-graydark dark:bg-meta-4'
                      }`}
                  >
                    <PiUsersThreeFill className="text-2xl" />
                    {isOpen && t('sidebar.admins')}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/settings"
                    className={`group relative flex items-center gap-2.5  py-2 px-4 text-[20px] font-[400] text-[#FFFFFF]  duration-300 ease-in-out hover:bg-[#2E2D3D] rounded-[15px] ${pathname.includes('settings') &&
                      'bg-graydark dark:bg-meta-4'
                      }`}
                  >
                    <PiGearFineFill className="text-2xl" />
                    {isOpen && t('sidebar.settings')}
                  </NavLink>
                </li>
              </ul>
            </div>
            <div
              role="button"
              onClick={logout}
              className={`bg-[#E02828] ${isOpen
                  ? 'brightness-150 w-full flex justify-around'
                  : 'hover:brightness-150'
                } text-white text-[20px] p-3 rounded-xl transition-all duration-300`}
            >
              <PiPowerFill className="text-2xl" />
              {isOpen && <div> {t('sidebar.sign-out')} </div>}
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

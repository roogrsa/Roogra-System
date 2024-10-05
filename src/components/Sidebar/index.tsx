import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import { useTranslation } from 'react-i18next';
import { AiFillHome } from "react-icons/ai";
import {
  PiUsersFill,
  PiUsersThreeFill,
  PiTicketFill,
  PiHeadsetFill,
  PiEnvelopeFill,
  PiGearFineFill,
  PiPowerFill,
  PiChartDonutFill,
} from "react-icons/pi";
import { FaChevronRight } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { MdOutlineBlock } from "react-icons/md";
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
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
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

  return (
    <>
      <aside
        ref={sidebar}
        className={` ${isOpen ? 'w-55' : 'closed'} absolute left-0 top-0 z-9999 flex h-screen  flex-col overflow-y-hidden
       bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between gap-2 px-6 py-4 lg:py-4">
          <button className={`absolute bg-[#2E2D3D] top-[1vh] rounded-[10px] p-2 ${isOpen
              ? "ltr:left-[190px] rtl:right-[175px]"
              : "ltr:left-[30px] rtl:right-[50px]"
            } rtl:rotate-180 z-50 text-lg transition-all duration-300 text-white`}
            onClick={toggleSidebar}>
            <FaChevronRight
              className={`${isOpen ? "rotate-180" : "rotate-0"
                } transition-all duration-300`}
            />
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          <nav className="px-4 lg:px-6">
            <div>
              <h2 className="mb-4 ml-4 text-xl font-semibold text-bodydark2">
                {isOpen && 'username'}
              </h2>

              <ul className="mb-6 flex flex-col gap-1.5">
                <SidebarLinkGroup
                  activeCondition={
                    pathname === '/' || pathname.includes('dashboard')
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <NavLink
                          to="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/' ||
                              pathname.includes('dashboard')) &&
                            'bg-graydark dark:bg-meta-4'
                            }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <PiChartDonutFill />
                          {isOpen && t("sidebar.charts")}
                        </NavLink>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
                <li>
                  <NavLink
                    to="/calendar"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('calendar') &&
                      'bg-graydark dark:bg-meta-4'
                      }`}
                  >
                    <AiFillHome />
                    {isOpen && t('sidebar.home')}

                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/profile"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('profile') && 'bg-graydark dark:bg-meta-4'
                      }`}
                  >
                    <PiUsersFill />
                    {isOpen && t('sidebar.users')}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/categories"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('categories') && 'bg-graydark dark:bg-meta-4'
                      }`}
                  >
                    <BiSolidCategory />
                    {isOpen && t('sidebar.categories')}
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/tables"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('tables') && 'bg-graydark dark:bg-meta-4'
                      }`}
                  >
                    <PiTicketFill />
                    {isOpen && t('sidebar.requests')}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/settings"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('settings') &&
                      'bg-graydark dark:bg-meta-4'
                      }`}
                  >
                    <PiHeadsetFill />
                    {isOpen && t('sidebar.support')}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/settings"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('settings') &&
                      'bg-graydark dark:bg-meta-4'
                      }`}
                  >
                    <PiEnvelopeFill />
                    {isOpen && t('sidebar.reports')}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/settings"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('settings') &&
                      'bg-graydark dark:bg-meta-4'
                      }`}
                  >
                    <MdOutlineBlock />
                    {isOpen && t('sidebar.ban-list')}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/settings"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('settings') &&
                      'bg-graydark dark:bg-meta-4'
                      }`}
                  >
                    <PiUsersThreeFill />
                    {isOpen && t('sidebar.admins')}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/settings"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('settings') &&
                      'bg-graydark dark:bg-meta-4'
                      }`}
                  >
                    <PiGearFineFill />
                    {isOpen && t('sidebar.settings')}
                  </NavLink>
                </li>
              </ul>
            </div>
            <div role='button'
              className={
                `bg-[#E02828] ${isOpen
                  ? "brightness-150 w-full flex justify-around"
                  : "hover:brightness-150"
                } text-white p-3 rounded-xl transition-all duration-300`
              }
            >
              <PiPowerFill className="text-2xl" />
              {isOpen &&
                <div> {t('sidebar.sign-out')} </div>
              }
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
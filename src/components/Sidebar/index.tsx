import { useEffect, useRef, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../../store/slices/auth';
import SidebarLink from './SidebarLink';
import DropLink from './DropLink';
import { selectLanguage } from '../../store/slices/language';
import { Link } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const { t } = useTranslation();
  const language = useSelector(selectLanguage);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const dispatch = useDispatch();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  type DropdownListType = "User" | "Ads" | "Categories" | "Subscription" | "Support" | "Reports" | "BanList" | null;
  const [dropdownList, setDropdownList] = useState<DropdownListType>(null);
  const [open, setOpen] = useState<boolean>(false);
  const toggleMenu = (type: DropdownListType) => {
    setDropdownList(type)
    setOpen(!open);
  }
  
  const handleClickOutside = () => {
    setDropdownList(null);
  };
  const fName = localStorage.getItem('first_name');
  const permissions: any = localStorage.getItem('permissions');

  const [permission, setpermission] = useState({
    super: permissions[0],
    charts: permissions[1],
    admins: permissions[2],
    settings: permissions[3],
    ads: {
      all: permissions[4],
      primary: permissions[5],
      subscription: permissions[6],
    },
    users: {
      all: permissions[7],
      advertisers: permissions[8],
      customers: permissions[9],
    },
    categories: {
      primary: permissions[10],
      subscription: permissions[11],
      region: permissions[12],
    },
    requests: { attestation: permissions[13], category: permissions[14] },
    contact: {
      inquiries: permissions[15],
      issues: permissions[16],
      suggestions: permissions[17],
    },
    reports: { chats: permissions[18], products: permissions[19] },
    banlist: { chats: permissions[20], products: permissions[21] },
  });
  useEffect(() => {
    // if (permissions.length === 22) {
    setpermission({
      super: permissions[0],
      charts: permissions[1],
      admins: permissions[2],
      settings: permissions[3],
      ads: {
        all: permissions[4],
        primary: permissions[5],
        subscription: permissions[6],
      },
      users: {
        all: permissions[7],
        advertisers: permissions[8],
        customers: permissions[9],
      },
      categories: {
        primary: permissions[10],
        subscription: permissions[11],
        region: permissions[12],
      },
      requests: { attestation: permissions[13], category: permissions[14] },
      contact: {
        inquiries: permissions[15],
        issues: permissions[16],
        suggestions: permissions[17],
      },
      reports: { chats: permissions[18], products: permissions[19] },
      banlist: { chats: permissions[20], products: permissions[21] },
    });
    // }
  }, []);

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
      await axiosInstance.get(`/api/admins/logout`);
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
        duration-300 ease-linear bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between gap-2 px-6 py-4 lg:py-4">
          <button
            className={`absolute bg-sidebarHover  top-[1vh] rounded-[10px] p-2
              ${isOpen
                ? 'ltr:left-[180px] rtl:right-[175px]'
                : 'ltr:left-[30px] rtl:right-[50px]'
              }
                rtl:rotate-180 z-50 text-lg transition-all duration-300 text-white`}
            onClick={toggleSidebar}
          >
            <FaChevronRight
              className={`${isOpen ? 'rotate-180' : 'rotate-0'
                } transition-all duration-300`}
            />
          </button>
        </div>
        <div className="no-scrollbar bg-boxdark flex flex-col overflow-y-auto duration-300 ease-linear mt-5">
          <nav className="px-4 lg:px-6">
            <div>
              {isOpen && (
                <h2 className="mb-4 text-center flex text-xl font-[400] text-[#70F1EB]">
                  <Link to={`/`}>{fName}</Link>
                </h2>
              )}
              <ul className="mb-6 flex flex-col gap-1.5">
                {permission.charts == 1 && (
                  <SidebarLink
                    to={`/charts`}
                    isOpen={isOpen}
                    text={'sidebar.charts'}
                    icon={<PiChartDonutFill className="text-2xl" />}
                  />
                )}
                {(permission.ads.all == 1 ||
                  permission.ads.primary == 1 ||
                  permission.ads.subscription == 1) && (
                    <div className="relative">
                      <div onClick={() => toggleMenu("Ads")}>
                        <SidebarLink
                          to={`#`}
                          isOpen={isOpen}
                          text={'sidebar.ads.ads'}
                          icon={<AiFillHome className="text-2xl" />}
                        />
                      </div>
                      {dropdownList == "Ads"&&open && (
                        <OutsideClickHandler onOutsideClick={handleClickOutside}>
                          <ul
                            className={`bg-sidebarHover p-2 absolute w-full ${language == 'ar' ? '-left-6' : '-right-6'
                              } top-12 z-10 rounded-xl`}
                          >
                            {permission.ads.all == 1 && (
                              <DropLink to={`/products`} text={'sidebar.ads.all'} />
                            )}
                            {permission.ads.primary == 1 && (
                              <DropLink
                                to={`/products/main`}
                                text={'sidebar.ads.main'}
                              />
                            )}
                            {permission.ads.subscription == 1 && (
                              <DropLink
                                to={`/products/subscriptions`}
                                text={'sidebar.ads.subscriptions'}
                              />
                            )}
                          </ul>
                        </OutsideClickHandler>
                      )}
                    </div>
                  )}
                {(permission.users.all == 1 ||
                  permission.users.advertisers == 1 ||
                  permission.users.customers == 1) && (
                    <div className="relative">
                      <div onClick={() => toggleMenu("User")}>
                        <SidebarLink
                          to={`#`}
                          isOpen={isOpen}
                          text={'sidebar.users.users'}
                          icon={<PiUsersFill className="text-2xl" />}
                        />
                      </div>
                      {dropdownList == "User"&&open && (
                        <OutsideClickHandler onOutsideClick={handleClickOutside}>
                          <ul
                            className={`bg-sidebarHover p-2 absolute w-full ${language == 'ar' ? '-left-6' : '-right-6'
                              } top-12 z-10 rounded-xl`}
                          >
                            {permission.users.all == 1 && (
                              <DropLink to={`/users`} text={'sidebar.users.all'} />
                            )}
                            {permission.users.advertisers == 1 && (
                              <DropLink
                                to={`/users/advertiser`}
                                text={'sidebar.users.advertisers'}
                              />
                            )}
                            {permission.users.customers == 1 && (
                              <DropLink
                                to={`/users/customer`}
                                text={'sidebar.users.customers'}
                              />
                            )}
                          </ul>
                        </OutsideClickHandler>
                      )}
                    </div>
                  )}
                {(permission.categories.primary == 1 ||
                  permission.categories.subscription == 1 ||
                  permission.categories.region == 1) && (
                    <div className="relative">
                      <div onClick={() => toggleMenu("Categories")}>
                        <SidebarLink
                          to={`#`}
                          isOpen={isOpen}
                          text={'sidebar.categories.categories'}
                          icon={<BiSolidCategory className="text-2xl" />}
                        />
                      </div>
                      {dropdownList=="Categories"&&open && (
                        <OutsideClickHandler onOutsideClick={handleClickOutside}>
                        <ul
                          className={`bg-sidebarHover p-2 absolute w-full ${language == 'ar' ? '-left-6' : '-right-6'
                            } top-12 z-10 rounded-xl`}
                        >
                          {permission.categories.primary == 1 && (
                            <DropLink
                              to={`/categories/main`}
                              text={'sidebar.categories.main'}
                            />
                          )}
                          {permission.categories.subscription == 1 && (
                            <DropLink
                              to={`/categories/subscriptions`}
                              text={'sidebar.categories.subscriptions'}
                            />
                          )}
                          {permission.categories.region == 1 && (
                            <DropLink
                              to={`/categories/map`}
                              text={'sidebar.categories.map'}
                            />
                          )}
                        </ul>
                        </OutsideClickHandler>
                      )}
                    </div>
                  )}
                {(permission.requests.attestation == 1 ||
                  permission.requests.category == 1) && (
                    <div className="relative">
                      <div
                        onClick={() => toggleMenu("Subscription")}
                      >
                        <SidebarLink
                          to={`#`}
                          isOpen={isOpen}
                          text={'sidebar.requests.requests'}
                          icon={<PiTicketFill className="text-2xl" />}
                        />
                      </div>
                      {dropdownList=="Subscription"&&open && (
                        <OutsideClickHandler onOutsideClick={handleClickOutside}>
                        <ul
                          className={`bg-sidebarHover p-2 absolute w-full ${language == 'ar' ? '-left-6' : '-right-6'
                            } top-12 z-10 rounded-xl`}
                        >
                          {permission.requests.attestation == 1 && (
                            <DropLink
                              to={`/confirm/subscription`}
                              text={'sidebar.requests.attestation'}
                            />
                          )}
                          {permission.requests.category == 1 && (
                            <DropLink
                              to={`/part/subscription`}
                              text={'sidebar.requests.category'}
                            />
                          )}
                        </ul>
                        </OutsideClickHandler>
                      )}
                    </div>
                  )}
                {(permission.contact.inquiries == 1 ||
                  permission.contact.issues == 1 ||
                  permission.contact.suggestions == 1) && (
                    <div className="relative">
                      <div onClick={() => toggleMenu("Support")}>
                        <SidebarLink
                          to={`#`}
                          isOpen={isOpen}
                          text={'sidebar.support.support'}
                          icon={<PiHeadsetFill className="text-2xl" />}
                        />
                      </div>
                      {dropdownList=="Support"&&open && (
                        <OutsideClickHandler onOutsideClick={handleClickOutside}>
                        <ul
                          className={`bg-sidebarHover p-2 absolute w-full ${language == 'ar' ? '-left-6' : '-right-6'
                            } top-12 z-10 rounded-xl`}
                        >
                          {permission.contact.inquiries == 1 && (
                            <DropLink
                              to={`/contact-us/inquiries`}
                              text={'sidebar.support.inquiries'}
                            />
                          )}
                          {permission.contact.issues == 1 && (
                            <DropLink
                              to={`/contact-us/issues`}
                              text={'sidebar.support.issues'}
                            />
                          )}
                          {permission.contact.suggestions == 1 && (
                            <DropLink
                              to={`/contact-us/suggestions`}
                              text={'sidebar.support.suggestions'}
                            />
                          )}
                        </ul>
                        </OutsideClickHandler>
                      )}
                    </div>
                  )}
                {(permission.reports.chats == 1 ||
                  permission.reports.products == 1) && (
                    <div className="relative">
                      <div onClick={() => toggleMenu("Reports")}>
                        <SidebarLink
                          to={`#`}
                          isOpen={isOpen}
                          text={'sidebar.reports.reports'}
                          icon={<PiEnvelopeFill className="text-2xl" />}
                        />
                      </div>
                      {dropdownList=="Reports"&&open && (
                        <OutsideClickHandler onOutsideClick={handleClickOutside}>
                        <ul
                          className={`bg-sidebarHover p-2 absolute w-full ${language == 'ar' ? '-left-6' : '-right-6'
                            } top-12 z-10 rounded-xl`}
                        >
                          {permission.reports.chats == 1 && (
                            <DropLink
                              to={`/reports/chat`}
                              text={'sidebar.reports.chat'}
                            />
                          )}
                          {permission.reports.products == 1 && (
                            <DropLink
                              to={`/reports/product`}
                              text={'sidebar.reports.product'}
                            />
                          )}
                        </ul>
                        </OutsideClickHandler>
                      )}
                    </div>
                  )}
                {(permission.banlist.chats == 1 ||
                  permission.banlist.products == 1) && (
                    <div className="relative">
                      <div onClick={() => toggleMenu("BanList")}>
                        <SidebarLink
                          to={`#`}
                          isOpen={isOpen}
                          text={'sidebar.ban-list.ban-list'}
                          icon={<MdOutlineBlock className="text-2xl" />}
                        />
                      </div>
                      {dropdownList=="BanList"&&open && (
                        <OutsideClickHandler onOutsideClick={handleClickOutside}>
                        <ul
                          className={`bg-sidebarHover p-2 absolute w-full ${language == 'ar' ? '-left-6' : '-right-6'
                            } top-12 z-10 rounded-xl`}
                        >
                          {permission.banlist.chats == 1 && (
                            <DropLink
                              to={`/Ban/users`}
                              text={'sidebar.ban-list.users'}
                            />
                          )}
                          {permission.banlist.products == 1 && (
                            <DropLink
                              to={`/Ban/products`}
                              text={'sidebar.ban-list.products'}
                            />
                          )}
                          {permission.banlist.products == 1 && (
                            <DropLink
                              to={`/Ban/chats`}
                              text={'sidebar.ban-list.chats'}
                            />
                          )}
                        </ul>
                        </OutsideClickHandler>
                      )}
                    </div>
                  )}
                {permission.admins == 1 && (
                  <SidebarLink
                    to={`/admins`}
                    isOpen={isOpen}
                    text={'sidebar.admins'}
                    icon={<PiUsersThreeFill className="text-2xl" />}
                  />
                )}
                {permission.settings == 1 && (
                  <SidebarLink
                    to={`/settings`}
                    isOpen={isOpen}
                    text={'sidebar.settings'}
                    icon={<PiGearFineFill className="text-2xl" />}
                  />
                )}
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

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
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isAdsOpen, setIsAdsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [isSupportOpen, setISupportOpen] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);
  const [isBanListOpen, setIsBanListOpen] = useState(false);

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
        {/* <!-- SIDEBAR HEADER --> */}
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
        {/* <!-- SIDEBAR BODY--> */}

        <div className="no-scrollbar bg-boxdark flex flex-col overflow-y-auto duration-300 ease-linear">
          <nav className="px-4 lg:px-6">
            <div>
              <h2 className="mb-4 ml-4 text-xl font-[400] text-bodydark2">
                {isOpen && 'username'}
              </h2>
              <ul className="mb-6 flex flex-col gap-1.5">
                  <SidebarLink to={`/`} isOpen={isOpen} text={'sidebar.charts'} icon={<PiChartDonutFill className="text-2xl" />}/>
                {/* ads dropdown */}
                <div className='relative'>
                  <div  onClick={()=>setIsAdsOpen(!isAdsOpen)}>
                <SidebarLink to={`#`} isOpen={isOpen} text={'sidebar.ads.ads'} icon={<AiFillHome className="text-2xl" />}/>
                  </div>
                {isAdsOpen &&
                    <ul className={`bg-sidebarHover p-2 absolute w-full ${language=='ar'?'-left-6':'-right-6'} top-12 z-10 rounded-xl`}>
                      <DropLink to={`/ads/all`} text={'sidebar.ads.all'}/>
                      <DropLink to={`/ads/main`} text={'sidebar.ads.main'}/>
                      <DropLink to={`/ads/subscriptions`} text={'sidebar.ads.subscriptions'}/>
                    </ul>
                }
                </div>
                {/* users dropdown */}
                <div className='relative'>
                  <div  onClick={()=>setIsUsersOpen(!isUsersOpen)}>
                <SidebarLink to={`#`} isOpen={isOpen} text={'sidebar.users.users'} icon={<PiUsersFill className="text-2xl" />} />
                  </div>
                {isUsersOpen &&
                    <ul className={`bg-sidebarHover p-2 absolute w-full ${language=='ar'?'-left-6':'-right-6'} top-12 z-10 rounded-xl`}>
                      <DropLink to={`/users`} text={'sidebar.users.all'}/>
                      <DropLink to={`/users/advertiser`} text={'sidebar.users.advertisers'}/>
                      <DropLink to={`/users/customer`} text={'sidebar.users.customers'}/>
                    </ul>
                }
                </div>
                 {/* categories dropdown */}
                <div className='relative'>
                  <div  onClick={()=>setIsCategoriesOpen(!isCategoriesOpen)}>
                <SidebarLink to={`#`} isOpen={isOpen} text={'sidebar.categories.categories'} icon={<BiSolidCategory className="text-2xl" />}/>
                  </div>
                {isCategoriesOpen &&
                    <ul className={`bg-sidebarHover p-2 absolute w-full ${language=='ar'?'-left-6':'-right-6'} top-12 z-10 rounded-xl`}>
                      <DropLink to={`/categories/main`} text={'sidebar.categories.main'}/>
                      <DropLink to={`/categories/subscriptions`} text={'sidebar.categories.subscriptions'}/>
                      <DropLink to={`/categories/map`} text={'sidebar.categories.map'}/>
                    </ul>
                }
                </div>
                 {/* subscription dropdown */}
                <div className='relative'>
                  <div  onClick={()=>setIsSubscriptionOpen(!isSubscriptionOpen)}>
                <SidebarLink to={`#`} isOpen={isOpen} text={'sidebar.requests.requests'} icon={<PiTicketFill className="text-2xl" />}/>
                  </div>
                {isSubscriptionOpen &&
                    <ul className={`bg-sidebarHover p-2 absolute w-full ${language=='ar'?'-left-6':'-right-6'} top-12 z-10 rounded-xl`}>
                      <DropLink to={`/requests/attestation`} text={'sidebar.requests.attestation'}/>
                      <DropLink to={`/requests/category`} text={'sidebar.requests.category'}/>
                    </ul>
                }
                </div>
                {/* support dropdown */}
                <div className='relative'>
                  <div  onClick={()=>setISupportOpen(!isSupportOpen)}>
                <SidebarLink to={`#`} isOpen={isOpen} text={'sidebar.support.support'} icon={<PiHeadsetFill className="text-2xl" />}/>
                  </div>
                {isSupportOpen &&
                    <ul className={`bg-sidebarHover p-2 absolute w-full ${language=='ar'?'-left-6':'-right-6'} top-12 z-10 rounded-xl`}>
                      <DropLink to={`/support`} text={'sidebar.support.inquiries'}/>
                      <DropLink to={`/support/advertiser`} text={'sidebar.support.issues'}/>
                      <DropLink to={`/support/customer`} text={'sidebar.support.suggestions'}/>
                    </ul>
                }
                </div>
                {/* reports dropdown */}
                <div className='relative'>
                  <div  onClick={()=>setIsReportsOpen(!isReportsOpen)}>
                <SidebarLink to={`#`} isOpen={isOpen} text={'sidebar.reports.reports'} icon={<PiEnvelopeFill className="text-2xl" />}/>
                  </div>
                {isReportsOpen &&
                    <ul className={`bg-sidebarHover p-2 absolute w-full ${language=='ar'?'-left-6':'-right-6'} top-12 z-10 rounded-xl`}>
                      <DropLink to={`/reports/chat`} text={'sidebar.reports.chat'}/>
                      <DropLink to={`/reports/product`} text={'sidebar.reports.product'}/>
                    </ul>
                }
                </div>
                {/* ban list dropdown */}
                <div className='relative'>
                  <div  onClick={()=>setIsBanListOpen(!isBanListOpen)}>
                <SidebarLink to={`#`} isOpen={isOpen} text={'sidebar.ban-list.ban-list'} icon={<MdOutlineBlock className="text-2xl" />}/>
                  </div>
                {isBanListOpen &&
                    <ul className={`bg-sidebarHover p-2 absolute w-full ${language=='ar'?'-left-6':'-right-6'} top-12 z-10 rounded-xl`}>
                      <DropLink to={`/ban-list/users`} text={'sidebar.ban-list.users'}/>
                      <DropLink to={`/ban-list/products`} text={'sidebar.ban-list.products'}/>
                    </ul>
                }
                </div>
                <SidebarLink to={`/settings`} isOpen={isOpen} text={'sidebar.admins'} icon={<PiUsersThreeFill className="text-2xl" />}/>
                <SidebarLink to={`/settings`} isOpen={isOpen} text={'sidebar.settings'} icon={<PiGearFineFill className="text-2xl" />}/>
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

import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";
interface SidebarLinkProps {
    to: string;
    isOpen: boolean;
    text: string;
    icon: any
}
export default function SidebarLink({ to, isOpen, text, icon }: SidebarLinkProps) {
    const { t } = useTranslation();
    const { pathname } = useLocation();
    return (
        <li>
            <NavLink
                to={to}
                className={`group relative flex items-center gap-2.5  py-2 px-4 text-[20px] font-[400] text-white duration-300 ease-in-out hover:bg-[#2E2D3D] rounded-[15px] ${(pathname === to) &&
                    'bg-graydark dark:bg-meta-4'
                    }`}
            >
                {icon}
                {isOpen && t(text)}
            </NavLink>
        </li>
    )
}

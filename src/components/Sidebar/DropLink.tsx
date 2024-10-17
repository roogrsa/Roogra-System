import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

interface DropLinkProps {
    to: string;
    text: string;
}

export default function DropLink({ to, text }: DropLinkProps) {
    const { t } = useTranslation();
    return (
        <li className='text-center'>
            <NavLink
                to={to}
                className={`text-white duration-300 ease-in-out`}
            >
                {t(text)}
            </NavLink>
        </li>
    )
}
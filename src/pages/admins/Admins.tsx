import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { useTranslation } from "react-i18next";
import { CgAddR } from "react-icons/cg";
import { Link } from "react-router-dom";

export default function Admins() {
    const { t } = useTranslation();
    const breadcrumbLinks = [{ label: t('admins.label'), path: '/admins' }]
    return (
        <>
        <div className="flex justify-between">
        <Breadcrumb pageName={t('admins.title')} breadcrumbLinks={breadcrumbLinks}/>
        <Link to={`/admins/add-admin`}>
            <CgAddR className="text-3xl text-Input-TextGreen" role="button"/>
        </Link>
        </div>
        </>
    )
}

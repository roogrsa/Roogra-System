import { useTranslation } from "react-i18next";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { CgAddR } from "react-icons/cg";
import { useState } from "react";
import AccordionHeader2 from "../../components/Accordion/AccordionHeader2";
import ContactUsTable from "./ContactUsTable";
import RepliedTable from "./RepliedTable";

export default function Suggestions() {
    const { t } = useTranslation();
    const [status, setStatus] = useState('processing');
    const breadcrumbLinks = [{ label: t('contact-us.contact-us'), path: '' }]
    return (
        <div>
            <div className="flex justify-between">
                <Breadcrumb pageName={t('contact-us.suggestions')} breadcrumbLinks={breadcrumbLinks} />
                <CgAddR className="text-3xl text-Input-TextGreen" role="button" />
            </div>
            <AccordionHeader2
                titles={[
                    t('contact-us.suggestions'),
                    t('contact-us.replied'),
                ]}
                onTitleClick={(index) => {
                    const statusMap = ['processing', 'approved'];
                    setStatus(statusMap[index]);
                }}
                children={[
                    <div>
                        <ContactUsTable type="الاقتراحات"/>
                    </div>,
                    <div>
                        <RepliedTable type="الاقتراحات"/>
                    </div>
                ]}
            />
        </div>
    )
}

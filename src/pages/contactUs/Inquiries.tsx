import { useTranslation } from "react-i18next";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { CgAddR } from "react-icons/cg";
import AccordionHeader2 from "../../components/Accordion/AccordionHeader2";
import { useEffect, useState } from "react";
import ContactUsTable from "./ContactUsTable";
import RepliedTable from "./RepliedTable";
import { useParams } from "react-router-dom";

export default function Inquiries() {
    const { t } = useTranslation();
    const {rq1_search} = useParams();
    // const [query, setQuery] = useState<string|undefined>('');
    // useEffect(()=>{
    //     if (rq1_search) {
    //         setQuery(rq1_search)
    //     }
    // },[])
    const breadcrumbLinks = [{ label: t('contact-us.contact-us'), path: '' }]
    return (
        <div>
            <div className="flex justify-between">
                <Breadcrumb pageName={t('contact-us.inquiries')} to="/contact-us/inquiries" breadcrumbLinks={breadcrumbLinks} />
                <CgAddR className="text-3xl text-Input-TextGreen" role="button" />
            </div>
            <AccordionHeader2
                titles={[
                    t('contact-us.inquiries'),
                    t('contact-us.replied'),
                ]}
                // onTitleClick={(index) => {
                //     const statusMap = ['processing', 'approved'];
                //     setStatus(statusMap[index]);
                // }}
                children={[
                    <div>
                        <ContactUsTable type="الاستفسار" idPre={`RQ1-`} query={rq1_search}/>
                    </div>,
                    <div>
                        <RepliedTable type="الاستفسار" idPre={`RQ1-`} query={rq1_search}/>
                    </div>
                ]}
            />

        </div>
    )
}

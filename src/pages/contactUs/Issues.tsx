import { useTranslation } from "react-i18next";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { CgAddR } from "react-icons/cg";
import { useEffect, useState } from "react";
import AccordionHeader2 from "../../components/Accordion/AccordionHeader2";
import ContactUsTable from "./ContactUsTable";
import RepliedTable from "./RepliedTable";
import { useParams } from "react-router-dom";

export default function Issues() {
    const { t } = useTranslation();
    // const [status, setStatus] = useState('processing');
    const {rq2_search} = useParams();
    // const [query, setQuery] = useState('');
    // useEffect(()=>{
    //     if (rq2_search) {
    //         setQuery(rq2_search)
    //     }
    // },[])
    const breadcrumbLinks = [{ label: t('contact-us.contact-us'), path: '' }]
    return (
        <div>
            <div className="flex justify-between">
                <Breadcrumb pageName={t('contact-us.issues')} breadcrumbLinks={breadcrumbLinks} />
                <CgAddR className="text-3xl text-Input-TextGreen" role="button" />
            </div>
            <AccordionHeader2
                titles={[
                    t('contact-us.issues'),
                    t('contact-us.replied'),
                ]}
                // onTitleClick={(index) => {
                //     const statusMap = ['issues', 'replied'];
                //     // setStatus(statusMap[index]);
                // }}
                children={[
                    <div>
                        <ContactUsTable type="البلاغات" idPre={`RQ2-`} query={rq2_search}/>
                    </div>,
                    <div>
                        <RepliedTable type="البلاغات" idPre={`RQ2-`} query={rq2_search}/>
                    </div>
                ]}
            />
        </div>
    )
}

import React, { useEffect, useState } from 'react';
import TabButton from '../../components/setting/TabButton';
import { useTranslation } from 'react-i18next';
import TermsSetting from './TermsSetting';
import ComissionSetting from './ComissionSetting';
import BanksSetting from './BanksSetting';
import SmsSetting from './SmsSetting';
import VerificationSetting from './VerificationSetting';
import BannersSetting from './BannersSetting';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { selectLanguage } from '../../store/slices/language';
import { useSelector } from 'react-redux';

const MainSettings: React.FC = () => {
    const { t } = useTranslation();
    const myTab=sessionStorage.getItem('activeTab');
    const language = useSelector(selectLanguage);
    const [activeTab, setActiveTab] = useState(t('settings.terms'));
    const breadcrumbLinks = [{ label: t('settings.settings'), path: '/settings' }];
    useEffect(() => {
        setActiveTab(t('settings.terms'))
    }, [t]);
    return (
        <>
            <Breadcrumb
                pageName={activeTab}
                breadcrumbLinks={breadcrumbLinks}
            />
            <div className="md:flex bg-secondaryBG-light dark:bg-secondaryBG-dark p-8 rounded">
                <ul className={`flex-column space-y space-y-4 ${language=='ar'? 'w-52':'w-64'} text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0`}>
                    <TabButton btnTab={t('settings.terms')} activeTab={activeTab} setActiveTab={setActiveTab} />
                    <TabButton btnTab={t('settings.comission')} activeTab={activeTab} setActiveTab={setActiveTab} />
                    <TabButton btnTab={t('settings.banks')} activeTab={activeTab} setActiveTab={setActiveTab} />
                    <TabButton btnTab={t('settings.sms')} activeTab={activeTab} setActiveTab={setActiveTab} />
                    <TabButton btnTab={t('settings.verification')} activeTab={activeTab} setActiveTab={setActiveTab} />
                    <TabButton btnTab={t('settings.banners')} activeTab={activeTab} setActiveTab={setActiveTab} />
                </ul>
                <div className="p-6 text-medium text-gray-500 dark:text-gray-400 dark:bg-secondaryBG-dark rounded-lg w-full">
                    {myTab === t('settings.terms') && (
                        <TermsSetting />
                    )}
                    {myTab === t('settings.comission') && (
                        <ComissionSetting />
                    )}
                    {myTab === t('settings.banks') && (
                        <BanksSetting />
                    )}
                    {myTab === t('settings.sms') && (
                        <SmsSetting />
                    )}
                    {myTab === t('settings.verification') && (
                        <VerificationSetting />
                    )}
                    {myTab === t('settings.banners') && (
                        <BannersSetting />
                    )}
                </div>
            </div>
        </>
    );
};

export default MainSettings;

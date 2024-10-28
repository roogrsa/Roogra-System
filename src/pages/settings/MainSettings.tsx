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
    const { t } = useTranslation()
    const language = useSelector(selectLanguage);
    const [activeTab, setActiveTab] = useState("");
    const breadcrumbLinks = [{ label: t('settings.settings'), path: '/settings' }];
    useEffect(() => {
        setActiveTab(t('settings.terms'))
    }, [activeTab]);
    return (
        <>
            <Breadcrumb
                pageName={activeTab}
                breadcrumbLinks={breadcrumbLinks}
            />
            <div className="md:flex bg-secondaryBG-light dark:bg-secondaryBG-dark p-10 rounded">
                <ul className={`flex-column space-y space-y-4 ${language=='ar'? 'w-52':'w-70'} text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0`}>
                    <TabButton btnTab={t('settings.terms')} activeTab={activeTab} setActiveTab={setActiveTab} />
                    <TabButton btnTab={t('settings.comission')} activeTab={activeTab} setActiveTab={setActiveTab} />
                    <TabButton btnTab={t('settings.banks')} activeTab={activeTab} setActiveTab={setActiveTab} />
                    <TabButton btnTab={t('settings.sms')} activeTab={activeTab} setActiveTab={setActiveTab} />
                    <TabButton btnTab={t('settings.verification')} activeTab={activeTab} setActiveTab={setActiveTab} />
                    <TabButton btnTab={t('settings.banners')} activeTab={activeTab} setActiveTab={setActiveTab} />
                </ul>
                <div className="p-6 text-medium text-gray-500 dark:text-gray-400 dark:bg-secondaryBG-dark rounded-lg w-full">
                    {activeTab === t('settings.terms') && (
                        <TermsSetting />
                    )}
                    {activeTab === t('settings.comission') && (
                        <ComissionSetting />
                    )}
                    {activeTab === t('settings.banks') && (
                        <BanksSetting />
                    )}
                    {activeTab === t('settings.sms') && (
                        <SmsSetting />
                    )}
                    {activeTab === t('settings.verification') && (
                        <VerificationSetting />
                    )}
                    {activeTab === t('settings.banners') && (
                        <BannersSetting />
                    )}
                </div>
            </div>
        </>
    );
};

export default MainSettings;

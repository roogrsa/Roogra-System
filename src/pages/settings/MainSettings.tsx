import React, { useState } from 'react';
import TabButton from '../../components/setting/TabButton';
import { useTranslation } from 'react-i18next';

const MainSettings: React.FC = () => {
    const {t}=useTranslation()
    const [activeTab, setActiveTab] = useState(t('settings.terms'));

    return (
        <div className="md:flex">
            <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                <TabButton btnTab={t('settings.terms')} activeTab={activeTab} setActiveTab={setActiveTab}/>
                <TabButton btnTab={t('settings.comission')} activeTab={activeTab} setActiveTab={setActiveTab}/>
                <TabButton btnTab={t('settings.banks')} activeTab={activeTab} setActiveTab={setActiveTab}/>
                <TabButton btnTab={t('settings.sms')} activeTab={activeTab} setActiveTab={setActiveTab}/>
                <TabButton btnTab={t('settings.verification')} activeTab={activeTab} setActiveTab={setActiveTab}/>
                <TabButton btnTab={t('settings.banners')} activeTab={activeTab} setActiveTab={setActiveTab}/>
            </ul>
            <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
                {activeTab ===t('settings.terms') && (
                    <div>
                        <h3 className="text-lg font-bold text-gray-bg-sidebarHover mb-2">Profile Tab</h3>
                        <p className="mb-2">This is the content for the Profile tab.</p>
                    </div>
                )}
                {activeTab === 'Dashboard' && (
                    <div>
                        <h3 className="text-lg font-bold text-gray-bg-sidebarHover mb-2">Dashboard Tab</h3>
                        <p className="mb-2">This is the content for the Dashboard tab.</p>
                    </div>
                )}
                {activeTab === 'Settings' && (
                    <div>
                        <h3 className="text-lg font-bold text-gray-bg-sidebarHover mb-2">Settings Tab</h3>
                        <p className="mb-2">This is the content for the Settings tab.</p>
                    </div>
                )}
                {activeTab === 'Contact' && (
                    <div>
                        <h3 className="text-lg font-bold text-gray-bg-sidebarHover mb-2">Contact Tab</h3>
                        <p className="mb-2">This is the content for the Contact tab.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MainSettings;

import React, { useState } from 'react';
import TabButton from '../../components/setting/TabButton';

const MainSettings: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Profile');

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <div className="md:flex">
            <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                <TabButton btnTab={`Profile`}/>
                <TabButton btnTab={`Profile`}/>
                <TabButton btnTab={`Profile`}/>
                <TabButton btnTab={`Profile`}/>
                <TabButton btnTab={`Profile`}/>
                <TabButton btnTab={`Profile`}/>
                <li>
                    <button
                        onClick={() => handleTabChange('Dashboard')}
                        className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${activeTab === 'Dashboard'
                                ? 'bg-sidebarHover dark:bg-blue-600'
                                : 'bg-gray-50 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                            }`}
                    >
                        Dashboard
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => handleTabChange('Settings')}
                        className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${activeTab === 'Settings'
                                ? 'bg-sidebarHover dark:bg-blue-600'
                                : 'bg-gray-50 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                            }`}
                    >
                        Settings
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => handleTabChange('Contact')}
                        className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${activeTab === 'Contact'
                                ? 'bg-sidebarHover dark:bg-blue-600'
                                : 'bg-gray-50 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                            }`}
                    >
                        Contact
                    </button>
                </li>
            </ul>
            <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
                {activeTab === 'Profile' && (
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

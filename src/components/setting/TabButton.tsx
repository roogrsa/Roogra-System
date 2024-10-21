import { useState } from 'react'
interface TabButtonProps {
    btnTab: string;
}
export default function TabButton({ btnTab }: TabButtonProps) {
    const [activeTab, setActiveTab] = useState('Profile');

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };
    return (
        <li>
            <button
                onClick={() => handleTabChange(btnTab)}
                className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${activeTab === 'Profile'
                    ? 'bg-sidebarHover dark:bg-blue-600'
                    : 'bg-gray-50 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                    }`}
            >
                Profile
            </button>
        </li>
    )
}

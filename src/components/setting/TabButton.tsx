
interface TabButtonProps {
    btnTab: string;
    activeTab: string;
    setActiveTab: (tab: string) => void;
}
export default function TabButton({ btnTab, activeTab, setActiveTab }: TabButtonProps) {
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };
    return (
        <li>
            <button
                onClick={() => handleTabChange(btnTab)}
                className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${activeTab === btnTab
                    ? 'bg-sidebarHover dark:bg-blue-600'
                    : 'bg-gray-50 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                    }`}
            >
                {btnTab}
            </button>
        </li>
    )
}

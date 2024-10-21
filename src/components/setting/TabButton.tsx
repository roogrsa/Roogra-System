
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
                className={` px-4 py-3 rounded-lg w-full font-semibold text-lg ${activeTab === btnTab
                    ? 'bg-graydark text-white dark:bg-blue-600'
                    : 'bg-gray-50 text-secondaryBG-dark dark:bg-gray-800 dark:text-gray-400'
                    }`}
            >
                {btnTab}
            </button>
        </li>
    )
}

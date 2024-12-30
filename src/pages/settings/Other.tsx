import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'
import axiosInstance from '../../axiosConfig/instanc';
import { toast } from 'react-toastify';
interface AppStatus {
    id: number;
    maintenance: number;
}
export default function Other() {
    const { t } = useTranslation()
    // const [appStatus, setAppStatus] = useState<AppStatus[]>([]);
    const [settingImgs, setSettingImgs] = useState([]);
    const [isChecked, setIsChecked] = useState(true);
    const displayAppStatus = async () => {
        try {
            const res = await axiosInstance.get(`/api/maintenance`);
            setIsChecked(res.data.data[0]?.maintenance == 0 ? true : false);
            // setAppStatus(res.data.data);
        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.message);
        }
    };

    const handleAppSubmit = async () => {
        try {
            const res = await axiosInstance.put(`api/maintenance/${isChecked ? 1 : 0}`, { maintenance: isChecked ? 1 : 0 });
            console.log(res);
            displayAppStatus()
            toast.success(`${t('popup.add_toast')}`);
        } catch (error: any) {
            console.error(error);
            displayAppStatus()
            toast.error(error?.response?.data?.message || 'An error occurred');
        }
    };
    const handleimg = async () => {
        try {
            const res = await axiosInstance.post(`api/settings/images`, { key: 'التنبيهات',value:"https://roogr.sa/api/image//catalog/1734182945979f3edb8d7fea01.png"});
            console.log(res);
            toast.success(`${t('popup.add_toast')}`);
        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.message || 'An error occurred');
        }
    };

    console.log(isChecked);
    const displaySettingImgs = async () => {
        try {
            const res = await axiosInstance.get(`/api/settings/images`);
            console.log(res.data.data);
            setSettingImgs(res.data.data);
        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.message);
        }
    };

    useEffect(() => {
        displayAppStatus()
        displaySettingImgs()
    }, []);
    const handleToggle = () => {
        setIsChecked(prev => !prev);
        handleAppSubmit()
    };
    return (
        <div>
            <div className='w-40 flex justify-between'>
                <div>{t('settings.appStatus')}</div>
                <div>
                    <label className="inline-flex items-center mb-5 cursor-pointer">
                        <input
                            type="checkbox"
                            value=""
                            className="sr-only peer"
                            checked={isChecked}
                            onChange={handleToggle}
                        />
                        <div className={`${isChecked ? 'bg-edit' : 'bg-gray-200'} relative w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 
                        dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full 
                        rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute 
                        after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full 
                        after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600`}></div>
                    </label>
                </div>
            </div>
            <div className='w-40 flex justify-between'>
                <div onClick={handleimg}>{t('settings.inquiries')}</div>
                <div>
                    <img src="./../../../public/person.jpeg" width={30} alt="" className='rounded-full' />
                </div>
            </div>
        </div>
    )
}

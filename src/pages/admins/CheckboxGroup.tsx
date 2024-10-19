import React from 'react';
import Checkbox from '../../components/form/Checkbox';
import { CheckboxItem } from './AddAdmin';
import { useSelector } from 'react-redux';
import { selectLanguage } from '../../store/slices/language';

interface CheckboxItemProps {
    checks: CheckboxItem[];
    setChecks: (checks: CheckboxItem[]) => void; 
    label: string;
}
const CheckboxGroup = ({checks,setChecks, label}:CheckboxItemProps) => {
    const handleMainCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setChecks(checks.map(item => ({ ...item, isChecked: checked })));
    };
    const handleCheckboxChange = (index: number) => {
        const newChecks = [...checks];
        newChecks[index].isChecked = !newChecks[index].isChecked;
        setChecks(newChecks);
    };
    const allChecked = checks.every(item => item.isChecked);
    const language = useSelector(selectLanguage);
    return (
        <div>
            <div className="mb-1 font-bold text-lg" >
                <Checkbox value={``} name={``} label={label} checked={allChecked}
                    change={handleMainCheckboxChange} />
            </div>
            <div>
                {checks.map((item, index) => (
                    <label className={`custom-checkbox `}>
                    <input type="checkbox" name={item.name} value={item.value} onChange={() => handleCheckboxChange(index)}
                    checked={item.isChecked}/>
                    <span className="checkmark"></span>
                    <span className={`${language=='ar'?'ms-2':'me-2'} ${language=='ar'?'me-5':'ms-5'}`}>{item.label}</span>
                </label>
                ))}
            </div>
        </div>
    );
};

export default CheckboxGroup;

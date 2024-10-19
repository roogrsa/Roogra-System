import React from 'react';
import Checkbox from '../../components/form/Checkbox';
import { CheckboxItem } from './AddAdmin';

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

    return (
        <div>
            <div className="mb-1 font-bold text-lg" >
                <Checkbox value={``} name={``} label={label} checked={allChecked}
                    change={handleMainCheckboxChange} />
            </div>
            <div>
                {checks.map((item, index) => (
                    <Checkbox value={item.value} name={item.name} label={item.label} checked={item.isChecked}
                        change={() => handleCheckboxChange(index)} />
                ))}
            </div>
        </div>
    );
};

export default CheckboxGroup;

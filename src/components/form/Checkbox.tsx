import { useSelector } from "react-redux";
import { selectLanguage } from "../../store/slices/language";

interface CheckboxProps {
    value: string;
    name: string;
    label: string;
}
export default function Checkbox({ value, name, label }: CheckboxProps) {
    const language = useSelector(selectLanguage);
    return (
        <label className={`custom-checkbox `}>
            <input type="checkbox" name={name} value={value} />
            <span className="checkmark"></span>
            <span className={`${language=='ar'?'ms-2':'me-2'} ${language=='ar'?'me-5':'ms-5'}`}>{label}</span>
        </label>
    )
}

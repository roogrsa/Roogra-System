import { useDispatch, useSelector } from 'react-redux';
import { selectLanguage, setLanguage } from '../../store/slices/language';
import i18n from '../../i18next';
import useColorMode from '../../hooks/useColorMode';
import { useEffect } from 'react';
const en = './../../../public/logo/Group 250.svg'
const enDark = './../../../public/logo/Group 250dark.svg'

export default function LanguageSwitcher() {
    const [colorMode, setColorMode] = useColorMode();
    const dispatch = useDispatch()
    const language = useSelector(selectLanguage)
    console.log(colorMode);
    useEffect(() => {

    }, [colorMode]);

    const handleChangeLanguage = () => {
        let newLanguage: string = (language == 'en') ? 'ar' : 'en'
        i18n.changeLanguage(newLanguage);
        if (newLanguage === "en") {
            dispatch(setLanguage(newLanguage))
        } else {
            dispatch(setLanguage(newLanguage))
        }
    };
    return (
        <>
            <button onClick={() => handleChangeLanguage()}>
                {(language === "en") ? "AR" :
                    <img src={colorMode === 'light' ? en : enDark} width={50} />}
            </button>
        </>
    )
}

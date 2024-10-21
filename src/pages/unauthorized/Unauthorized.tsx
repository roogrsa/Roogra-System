import { useTranslation } from "react-i18next"

export default function Unauthorized() {
    const {t} = useTranslation()
    return (
        <>
            <h1 className={`text-center md:my-10 my-2 text-lg md:text-3xl font-bold`}>{t('unauthorized.title')}</h1>
            <p className={`text-center text-2xl`}>{t('unauthorized.discribution')}</p>
        </>
    )
}

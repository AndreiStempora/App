import languageTranslations from './languageTranslations';
import { atom, useAtom } from 'jotai';
import { useState } from 'react';

const languageAtom = atom('fr', (get, set, lang) => {
    set(languageAtom, lang)
});

const getLanguageAtom = atom(null, (get, set, lang) => {
    return get(languageAtom)
});


const useLanguage = () => {
    const [language, setLanguage] = useAtom(languageAtom);
    const [, getLanguage] = useAtom(getLanguageAtom);
    const [traslation, setTranslation] = useState({});

    const changeLanguage = (lang) => {
        setLanguage(lang)
    }


    const translate = (key) => {
        if (!languageTranslations[key]) {
            return key;
        }
        if (!languageTranslations[key][language]) {
            return key;
        }
        return languageTranslations[key][language];
    }

    return [translate, changeLanguage];
}

export default useLanguage
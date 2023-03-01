import languageTranslations from './languageTranslations';
import { atom, useAtom } from 'jotai';
import { useState } from 'react';

const languageAtom = atom('fr', (get, set, lang) => {
    if (!lang) {
        return get(languageAtom)
    }
    if (lang) {
        return set(languageAtom, lang)
    }
});

const getLanguageAtom = atom(null, (get, set, lang) => {
    return get(languageAtom)
});


const useLanguage = () => {
    const [currentlanguage, language] = useAtom(languageAtom);

    const changeLanguage = (lang) => {
        language(lang)
        console.log('lang', lang)
    }

    const translate = (key) => {
        if (!languageTranslations[key]) {
            return key;
        }
        if (!languageTranslations[key][currentlanguage]) {
            return key;
        }
        return languageTranslations[key][currentlanguage];
    }

    return [translate, changeLanguage];
}

export default useLanguage
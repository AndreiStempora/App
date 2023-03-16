import languageTranslations from './languageTranslations';
import { atom, useAtom } from 'jotai';

const languageAtom = atom('fr', (get, set, lang) => {
    if (!lang) {
        return get(languageAtom)
    }
    if (lang) {
        return set(languageAtom, lang)
    }
});

const useLanguage = () => {
    const [currentLanguage, language] = useAtom(languageAtom);

    const changeLanguage = (lang) => {
        language(lang)
        console.log('lang', lang)
    }

    const translate = (key) => {
        if (!languageTranslations[key]) {
            return key;
        }
        if (!languageTranslations[key][currentLanguage]) {
            return key;
        }
        return languageTranslations[key][currentLanguage];
    }

    return [translate, changeLanguage];
}

export default useLanguage
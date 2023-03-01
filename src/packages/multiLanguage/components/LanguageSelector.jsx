import useLanguage from "../features/languageHook";
import { IonFab, IonFabButton, IonIcon, useIonActionSheet } from "@ionic/react";

const LanguageSelector = () => {
    const [translate, changeLanguage] = useLanguage();
    const [present, dismiss] = useIonActionSheet();

    const openActionSheet = async () => {
        await present({
            header: translate('Select Language'),
            buttons: [
                {
                    text: 'English', handler: () => {
                        changeLanguage('en');
                        dismiss();
                    },
                    icon: '/assets/svgs/us-flag.svg'
                },
                {
                    text: 'Français', handler: () => {
                        changeLanguage('fr');
                        dismiss();
                    },
                    icon: '/assets/svgs/fr-flag.svg'
                },
                { text: translate('Cancel'), role: 'cancel' }
            ]
        })
    }

    return (
        <IonFab slot="fixed" vertical="bottom" horizontal="center">
            <IonFabButton onClick={openActionSheet}>
                <IonIcon icon="/assets/svgs/email-svg.svg" />
            </IonFabButton>
        </IonFab>
    )
}

export default LanguageSelector
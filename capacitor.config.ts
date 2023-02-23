import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.ionic.NovoCapture',
    appName: 'NovoCapture',
    webDir: 'build',
    bundledWebRuntime: false,
    "plugins": {
        "SplashScreen": {
            "launchShowDuration": 3000,
            "launchAutoHide": false,
            "backgroundColor": "#00000000",
            "androidSplashResourceName": "splash",
            "androidScaleType": "CENTER_CROP",
            "showSpinner": false,
            "androidSpinnerStyle": "horizontal",
            "iosSpinnerStyle": "large",
            "spinnerColor": "#007BFF",
            "splashFullScreen": true,
            "splashImmersive": false,
            "layoutName": "launch_screen",
            "useDialog": false,
        }
    }
};

export default config;

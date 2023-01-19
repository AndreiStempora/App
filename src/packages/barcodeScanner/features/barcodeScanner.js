import { BarcodeScanner, SupportedFormat } from '@capacitor-community/barcode-scanner';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation';

const useBarcodeScanner = () => {
    const startScan = async () => {
        await BarcodeScanner.checkPermission({ force: true });
        // BarcodeScanner.hideBackground();
        ScreenOrientation.unlock();
        const result = await BarcodeScanner.startScan({ targetedFormats: [SupportedFormat.CODE_39] }); // start scanning and wait for a result
        if (result.hasContent) {
            console.log(result.content); // log the raw scanned content
            // BarcodeScanner.showBackground();
            return result.content;
        }
    }

    const stopScan = async () => {
        // BarcodeScanner.showBackground();
        ScreenOrientation.lock(ScreenOrientation.ORIENTATIONS.PORTRAIT);
        await BarcodeScanner.stopScan();
    };

    const prepareScan = () => {
        BarcodeScanner.prepare();
    };

    const checkPermission = async () => {
        // check or request permission
        const status = await BarcodeScanner.checkPermission({ force: true });

        if (status.granted) {
            // the user granted permission
            return true;
        }

        return false;
    }

    return { startScan, stopScan, prepareScan, checkPermission };
};

export default useBarcodeScanner;
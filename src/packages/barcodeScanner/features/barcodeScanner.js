import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

const useBarcodeScanner = () => {
    const startScan = async () => {
        await BarcodeScanner.checkPermission({ force: true });
        // BarcodeScanner.hideBackground();
        const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
        if (result.hasContent) {
            console.log(result.content); // log the raw scanned content
            // BarcodeScanner.showBackground();
            return result.content;
        }
    }

    const stopScan = async () => {
        // BarcodeScanner.showBackground();
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
import { BarcodeScanner, SupportedFormat } from '@capacitor-community/barcode-scanner';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation';
import { quaga } from '../../quagga2BarcodeScanner';

const useBarcodeScanner = () => {
    const startScan = async () => {
        await BarcodeScanner.checkPermission({ force: true });
        ScreenOrientation.unlock();
        ScreenOrientation.onChange().subscribe(() => {

            if ((ScreenOrientation.type).includes('landscape')) {
                document.querySelector('.addVehicle')?.classList.add('portrait-view');
            } else {
                document.querySelector('.addVehicle')?.classList.remove('portrait-view');
            }
        })
        // quaga.init();
        // quaga.detect();
        const scannedCode = (await BarcodeScanner.startScan({ targetedFormats: [SupportedFormat.CODE_39] })).content;
        ScreenOrientation.lock(ScreenOrientation.ORIENTATIONS.PORTRAIT);
        return scannedCode;
    }

    const stopScan = async () => {
        ScreenOrientation.lock(ScreenOrientation.ORIENTATIONS.PORTRAIT);
        await BarcodeScanner.stopScan();
    };

    const prepareScan = () => {
        BarcodeScanner.prepare();
    };

    const checkPermission = async () => {
        const status = await BarcodeScanner.checkPermission({ force: true });
        if (status.granted) {
            return true;
        }
        return false;
    }

    return { startScan, stopScan, prepareScan, checkPermission };
};

export default useBarcodeScanner;
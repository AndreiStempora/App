import Quagga from '@ericblade/quagga2';

const quaga = {
    init: () => {
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: document.querySelector('ion-content')    // Or '#yourElement' (optional)
            },
            decoder: {
                readers: ["code_39_vin_reader"]
            }
        }, function (err) {
            if (err) {
                console.log(err);
                return
            }
            console.log("Initialization finished. Ready to start");
            Quagga.start();
        });
        console.log("Quagga initialized")
    },
    detect: () => {
        Quagga.onDetected(function (result) {
            console.log("Barcode detected and processed : [" + result.codeResult.code + "]", result)
        })
    }
}


export default quaga;


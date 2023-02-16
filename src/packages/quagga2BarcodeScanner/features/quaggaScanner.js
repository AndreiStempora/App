import Quagga from '@ericblade/quagga2';

const quaga = {
    init: () => {
        Quagga.init({
            inputStream: {
                type: 'LiveStream',
               
                // target: scannerRef.current,
            },
            // locator,
            // numOfWorkers,
            decoder: { readers: ["code_39_reader","code_39_vin_reader"] },
            // locate,
        }, (err) => {
            Quagga.onProcessed((e)=>{console.log(e,'ff')});

            if (err) {
                return console.log('Error starting Quagga:', err);
            }
            
                Quagga.start();
            
                    
            
            
        });
        Quagga.onDetected((e)=>{console.log(e)});
        
    },
    detect: () => {
        Quagga.onDetected(function (result) {
            console.log("Barcode detected and processed : [" + result.codeResult.code + "]", result)
        })
    },
    processed:()=>{
        Quagga.onProcessed(function (result){
            console.log(result, 'quaga result')
        })
    }
}


export default quaga;


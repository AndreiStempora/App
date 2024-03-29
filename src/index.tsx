import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation';
import { SplashScreen } from '@capacitor/splash-screen';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { setupIonicReact } from '@ionic/react';



setupIonicReact({swipeBackEnabled:false});


window.addEventListener("DOMContentLoaded", async () => {
	ScreenOrientation.lock(ScreenOrientation.ORIENTATIONS.PORTRAIT)
	setTimeout(()=>{
		SplashScreen.hide();
	},3000)
})

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

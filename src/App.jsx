import { IonApp, IonRouterOutlet, setupIonicReact, IonRoute, IonRedirect } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/typography.css';
import { Provider } from "jotai";
import { Suspense } from "react";
import { Redirect, Route } from 'react-router-dom';
// import RestrictedRouting from './components/page/restrictedPages/RestrictedRouting';
import DealershipsPage from './pages/dealerships/DealershipsPage';
import LoginPage from './pages/login/LoginPage';
/* Theme variables */
import './theme/variables.css';
import ProtectedRoute from "./components/page/restrictedPages/ProtectedRoute"
import TwoFAPage from './pages/twoFA/TwoFAPage';
import TwoFACodePage from './pages/twoFA/TwoFACodePage';
import CameraPage from './pages/camera/CameraPage';
import VehiclePage from './pages/vehicles/searchVehicle/VehiclePage';
import AddVehicle from './pages/vehicles/addVehicle/AddVehicle';
import VehicleDetails from './pages/vehicles/vehicleDetails/VehicleDetails';
import VehiclePhotos from './pages/vehicles/vehiclePhotos/VehiclePhotos';
setupIonicReact();

const App = () => {
	return (
		<IonApp>
			<Provider>
				<Suspense fallback="Loading">
					<IonReactRouter>
						<IonRouterOutlet animated={false}>
							<Route 						 path="/login" component={LoginPage} />
							<Route 			exact={true} path="/2fa"  component={TwoFAPage} />
							<Route 			exact={true} path="/2fa/code"  component={TwoFACodePage} />
							<ProtectedRoute exact={true} path="/dealerships" component={DealershipsPage} />
							<ProtectedRoute exact={true} path="/camera" component={CameraPage} />
							<ProtectedRoute exact={true} path="/vehicle-search" component={VehiclePage} />
							<ProtectedRoute exact={true} path="/add-vehicle" component={AddVehicle} />
							<ProtectedRoute exact={true} path="/vehicle-details" component={VehicleDetails} />
							<ProtectedRoute exact={true} path="/vehicle-photos" component={VehiclePhotos} />
							<Route render={() => <Redirect to="/dealerships" />} />
						</IonRouterOutlet>
					</IonReactRouter>
				</Suspense>
			</Provider>
		</IonApp>
	)
}

export default App;

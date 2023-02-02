import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
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
/* Theme variables */
import './theme/variables.css';
import './theme/alerts.scss';
import './theme/buttons.scss';
// import RestrictedRouting from './components/page/restrictedPages/RestrictedRouting';
import DealershipsPage from './pages/dealerships/page/DealershipsPage';
import LoginPage from './pages/login/page/LoginPage';
import ProtectedRoute from "./components/page/restrictedPages/ProtectedRoute"
import TwoFAPage from './pages/twoFA/page/TwoFAPage';
import TwoFACodePage from './pages/twoFA/page/TwoFACodePage';
import VehiclePage from './pages/vehicles/main/page/VehiclePage';
import AddVehiclePage from './pages/vehicles/addVehicle/page/AddVehiclePage';
import VehicleDetailsPage from './pages/vehicles/vehicleDetails/page/VehicleDetailsPage';
import VehiclePhotos from './pages/vehicles/hotspotType/page/hotspotTypePage';
import HotspotPhotoPage from './pages/vehicles/hotspotPhoto/HotspotPhotoPage';
import ProfilePage from './pages/profile/page/ProfilePage';

setupIonicReact();

const App = () => {
	return (
		<IonApp>
			<Provider>
				<Suspense fallback="Loading">
					<IonReactRouter>
						<IonRouterOutlet animated={false}>
							<Route path="/login" component={LoginPage} />
							<Route exact={true} path="/2fa" component={TwoFAPage} />
							<Route exact={true} path="/2fa/code" component={TwoFACodePage} />
							<ProtectedRoute exact={true} path="/dealerships" component={DealershipsPage} />
							<ProtectedRoute exact={true} path="/vehicle-search" component={VehiclePage} />
							<ProtectedRoute exact={true} path="/add-vehicle" component={AddVehiclePage} />
							<ProtectedRoute exact={true} path="/vehicle-details" component={VehicleDetailsPage} />
							<ProtectedRoute exact={true} path="/vehicle-photos" component={VehiclePhotos} />
							<ProtectedRoute exact={true} path="/hotspot-photo" component={HotspotPhotoPage} />
							<ProtectedRoute exact={true} path="/profile" component={ProfilePage} />
							<Route render={() => <Redirect to="/dealerships" />} />
						</IonRouterOutlet>
					</IonReactRouter>
				</Suspense>
			</Provider>
		</IonApp>
	)
}

export default App;

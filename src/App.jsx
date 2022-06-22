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
// import RestrictedRouting from './components/page/restrictedPages/RestrictedRouting';
import DashboardPage from './pages/dashboard/DashboardPage';
import LoginPage from './pages/login/LoginPage';
/* Theme variables */
import './theme/variables.css';
import ProtectedRoute from "./components/page/restrictedPages/ProtectedRoute"
setupIonicReact();

const App = () => {
	
	return (
		<IonApp>
			<Provider>
				<Suspense fallback="Loading">
					<IonReactRouter>
						<IonRouterOutlet animated={false}>
							
								<Route path="*">
									<Redirect from="*" to="/login"></Redirect>
								</Route>

								<Route exact path="/login">
									<LoginPage />
								</Route>
						
								<ProtectedRoute exact path="/dashboard">
									<DashboardPage />
								</ProtectedRoute>

								
							
						</IonRouterOutlet>
					</IonReactRouter>
				</Suspense>
			</Provider>
		</IonApp>
	)
}

export default App;

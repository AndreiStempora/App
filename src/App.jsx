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
import DashboardPage from './pages/dashboard/DashboardPage';
import LoginPage from './pages/login/LoginPage';
/* Theme variables */
import './theme/variables.css';
import ProtectedRoute from "./components/page/restrictedPages/ProtectedRoute"
import TwoFAPage from './pages/twoFA/TwoFAPage';
import TwoFACodePage from './pages/twoFA/TwoFACodePage';

setupIonicReact();

const App = () => {
	
	return (
		<IonApp>
			<Provider>
				<Suspense fallback="Loading">
					<IonReactRouter>
						<IonRouterOutlet animated={false}>
							
						<Route path="/login" component={LoginPage} />
						<Route path="/2fa" exact={true} component={TwoFAPage} />
						<Route path="/2fa/code" exact={true} component={TwoFACodePage} />
						<ProtectedRoute exact={true} path="/dashboard" component={DashboardPage} />
						<Route render={() => <Redirect to="/login" />} />

{/* 
								<Route  path="/" element={<LoginPage />} />
									
								</Route>
								<IonRoute path="*">
									<IonRedirect from="*" to="/login"></IonRedirect>
								</IonRoute> 

								<Route exact path="/2fa">
									<TwoFAPage />
								</Route>

								<Route exact path="/2fa/code">
									<TwoFACodePage />
								</Route>

								<ProtectedRoute exact path="/dashboard">
									<DashboardPage />
								</ProtectedRoute> */}

							
						</IonRouterOutlet>
					</IonReactRouter>
				</Suspense>
			</Provider>
		</IonApp>
	)
}

export default App;

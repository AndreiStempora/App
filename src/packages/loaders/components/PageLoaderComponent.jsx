import React from 'react';
import { IonLoading } from '@ionic/react';

const PageLoaderComponent = () => {
	
	return (
		<IonLoading
                isOpen={true}
                message="Please wait..."
				spinner="lines-sharp-small"
				show-backdrop="false"
            ></IonLoading>
	)
}

export default PageLoaderComponent
import React from 'react';
import { IonToast } from "@ionic/react";
import { useAtom } from "jotai";
import { error } from '../features/errors';

const ErrorComponent = () => {
	const [toast] = useAtom(error.showToastAtom);
    const [errorMessage] = useAtom(error.errorAtom);
	return (
		<IonToast isOpen={toast} message={errorMessage} position="bottom"></IonToast>
	)
}

export default ErrorComponent
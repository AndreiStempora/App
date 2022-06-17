import { IonToast } from "@ionic/react";
import { useAtom } from "jotai";
import { error } from "../features/errors";
import "./error.scss";

const ErrorComponent = () => {
	const [toast] = useAtom(error.showToastAtom);
	const [err] = useAtom(error.errorAtom);

	return (
		<IonToast cssClass="error" isOpen={toast} message={err} position="bottom"></IonToast>
	)
}

export default ErrorComponent

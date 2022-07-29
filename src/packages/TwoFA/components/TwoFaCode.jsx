import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { TwoFA } from '../features/TwoFA';
import useDigitInput from 'react-digit-input';
import usePageRequest from '../../../services/customHooks/pageRequestHook';
import usePageSetters from '../../../services/customHooks/pageRequestSettersHook';
import parser from 'html-react-parser';
import { IonButtons, IonIcon, IonButton } from '@ionic/react';
import './twoFaCode.scss';

const TwoFaCode = () => {
	const pageRequest = usePageRequest();
	const requestSetters = usePageSetters();
	const [value, onChange] = useState('');
	const [fields, setFields] = useState();
	const [pageInfo, setPageInfo] = useState();
	const [selectedOption] = useAtom(TwoFA.selectedOption);
	const [buttonResend, setButtonResend] = useState(false);

	const getIcon = () => {
		const str = selectedOption?.icon;
		//remove from string spaces and svgicon
		const str2 = str.replace(/ /g, '');
		const str3 = str2.replace('svgicon', '');
		return str3;
	}

	const requestFormFields = async ()=>{
		if(requestSetters.data?.services !== undefined){
			requestSetters.setUrl(requestSetters.data?.services[0]?.call);
		} else {
			requestSetters.setUrl(selectedOption.call);
		}

		requestSetters.setRequestBody();
        const response = await requestSetters.fetch();
        setFields(response?.service?.length)
        setPageInfo(response?.service?.title)
        requestSetters.setUrl(response?.service?.call);
	}
	
	useEffect(() => {
		pageRequest.requestFunction(requestFormFields)
	},[])

	const digitForm = (fields) => {
		let inputs = [];
        for (let i = 0; i < fields; i++) {
			inputs.push(
				<input className='digit' inputMode="decimal" key={i} autoFocus={i === 0? true : false} {...digits[i]} />
			)
		}
		return inputs;
	}

	const digits = useDigitInput({
		acceptedCharacters: /^[0-9]$/,
		length: fields,
		value,
		onChange,
	});

	const sendDigitsForValidation = async ()=>{
		requestSetters.setUrl(requestSetters.url)
		requestSetters.setFormData({code:parseInt(value)});
		requestSetters.setRequestBody();
		const response = await requestSetters.fetch();

		if(response.status === "error"){
			requestSetters.setError(response?.code)
		} 

		if(response.status === "ok"){
			requestSetters.isLoggedIn(true);
			requestSetters.push('/dealerships');
		}
	}

	const clickHandler = () => {
		pageRequest.requestFunction(requestFormFields);
		setButtonResend(false);
		setTimeout(()=>{
			setButtonResend(true);
		},10000)
	}

	useEffect(()=>{
		let sendCode = false;
		let chars = value.split('');
		sendCode = chars.every(char => char !== " " || null);
		
		if(sendCode && value.length !== 0){
			(async()=>{
				pageRequest.requestFunction(sendDigitsForValidation);
			})()
		}
		setTimeout(()=>{
			setButtonResend(true);
		},10000)
	},[value])
	
	return (
		<div class='code-block'>
			<IonIcon className="big-icon" icon={`/assets/svgs/${getIcon()}.svg`}></IonIcon>
			{ pageInfo && parser(pageInfo)}
			<div className="input-group">
				{digitForm(fields)}
			</div>
			{buttonResend && <IonButton fill='clear' className="resend-button" onClick={clickHandler}>Didn't get a code?</IonButton>}
		</div>
	)
}

export default TwoFaCode;
import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { TwoFA } from '../features/TwoFA';
import usePageRequest from '../../../services/customHooks/pageRequestHook';
import usePageSetters from '../../../services/customHooks/pageRequestSettersHook';
import parser from 'html-react-parser';
import { IonIcon, IonButton } from '@ionic/react';
import CodeDigits from './CodeDigits';
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

	const clickHandler = () => {
		pageRequest.requestFunction(requestFormFields);
		setButtonResend(false);
		setTimeout(()=>{
			setButtonResend(true);
		},10000)
	}

	useEffect(()=>{
		setTimeout(()=>{
			setButtonResend(true);
		},10000)
	},[value])
	
	return (
		<div className='code-block'>
			<IonIcon className="big-icon" icon={`/assets/svgs/${getIcon()}.svg`}></IonIcon>
			{ pageInfo && parser(pageInfo)}
			<div className="input-group">
				{/* {digitForm(fields)} */}
				<CodeDigits fields={fields} />
			</div>
			{buttonResend && <IonButton fill='clear' className="resend-button" onClick={clickHandler}>Didn't get a code?</IonButton>}
		</div>
	)
}

export default TwoFaCode;
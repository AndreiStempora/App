import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { TwoFA } from '../features/TwoFA';
import useDigitInput from 'react-digit-input';
import usePageRequest from '../../../services/customHooks/pageRequestHook';
import usePageSetters from '../../../services/customHooks/pageRequestSettersHook';
import parser from 'html-react-parser';

const TwoFaCode = () => {
	const pageRequest = usePageRequest();
	const requestSetters = usePageSetters();
	const [value, onChange] = useState('');
	const [fields, setFields] = useState();
	const [pageInfo, setPageInfo] = useState();
	const [selectedOption] = useAtom(TwoFA.selectedOption);

	const requestFormFields = async ()=>{
		if(requestSetters.data?.services !== undefined){
			requestSetters.setUrl(requestSetters.data?.services[0]?.call);
		} else {
			requestSetters.setUrl(selectedOption[0].call);
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
		console.log(requestSetters.url);
		requestSetters.setUrl(requestSetters.url)
		requestSetters.setFormData({code:parseInt(value)});
		requestSetters.setRequestBody();
		const response = await requestSetters.fetch();

		if(response.status === "error"){
			requestSetters.setError(response?.code)
		} 

		if(response.status === "ok"){
			requestSetters.setLoggedIn(true);
			requestSetters.push('/dashboard');
		}
	}

	useEffect(()=>{
		let sendCode = false;
		let chars = value.split('');
		sendCode = chars.every(char => char !== " " || null);
		console.log(value.length,sendCode,"wtf dude?")
		if(sendCode && value.length !== 0){
			(async()=>{
				pageRequest.requestFunction(sendDigitsForValidation);
			})()
		}
	},[value])
	
	return (
		<div>
			{ pageInfo && parser(pageInfo)}
			<div className="input-group">
				{digitForm(fields)}
			</div>
		</div>
	)
}

export default TwoFaCode;